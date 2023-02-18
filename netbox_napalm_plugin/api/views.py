from dcim.models import Device
from django.shortcuts import get_object_or_404, redirect, render
from extras.plugins import get_plugin_config
from netbox.api.exceptions import ServiceUnavailable
from netbox.api.pagination import StripCountAnnotationsPaginator
from netbox.api.viewsets import NetBoxModelViewSet

from rest_framework.decorators import action
from rest_framework.response import Response

from netbox_napalm_plugin import filtersets
from netbox_napalm_plugin.models import NapalmPlatformConfig

from . import serializers


class NapalmPlatformConfigViewSet(NetBoxModelViewSet):
    queryset = NapalmPlatformConfig.objects.prefetch_related(
        "platform",
        "tags",
    )
    serializer_class = serializers.NapalmPlatformConfigSerializer
    filterset_class = filtersets.NapalmPlatformConfigFilterSet
    pagination_class = StripCountAnnotationsPaginator

    @action(detail=True, url_path="napalm")
    def napalm(self, request, pk):
        """
        Execute a NAPALM method on a Device
        """
        device = get_object_or_404(Device.objects.all(), pk=pk)
        if not device.primary_ip:
            raise ServiceUnavailable(
                "This device does not have a primary IP address configured."
            )
        if device.platform is None:
            raise ServiceUnavailable("No platform is configured for this device.")
        if (
            not hasattr(device.platform, "napalm")
            or not device.platform.napalm.napalm_driver
        ):
            raise ServiceUnavailable(
                f"No NAPALM driver is configured for this device's platform: {device.platform}."
            )

        # Check for primary IP address from NetBox object
        if device.primary_ip:
            host = str(device.primary_ip.address.ip)
        else:
            # Raise exception for no IP address and no Name if device.name does not exist
            if not device.name:
                raise ServiceUnavailable(
                    "This device does not have a primary IP address or device name to lookup configured."
                )
            try:
                # Attempt to complete a DNS name resolution if no primary_ip is set
                host = socket.gethostbyname(device.name)
            except socket.gaierror:
                # Name lookup failure
                raise ServiceUnavailable(
                    f"Name lookup failure, unable to resolve IP address for {device.name}. Please set Primary IP or "
                    f"setup name resolution."
                )

        # Check that NAPALM is installed
        try:
            import napalm
            from napalm.base.exceptions import ModuleImportError
        except ModuleNotFoundError as e:
            if getattr(e, "name") == "napalm":
                raise ServiceUnavailable(
                    "NAPALM is not installed. Please see the documentation for instructions."
                )
            raise e

        # Validate the configured driver
        try:
            driver = napalm.get_network_driver(device.platform.napalm_driver)
        except ModuleImportError:
            raise ServiceUnavailable(
                "NAPALM driver for platform {} not found: {}.".format(
                    device.platform, device.platform.napalm_driver
                )
            )

        # Verify user permission
        if not request.user.has_perm("dcim.napalm_read_device"):
            return HttpResponseForbidden()

        napalm_methods = request.GET.getlist("method")
        response = {m: None for m in napalm_methods}

        username = get_plugin_config('netbox_napalm_plugin', 'NAPALM_USERNAME')
        password = get_plugin_config('netbox_napalm_plugin', 'NAPALM_PASSWORD')
        timeout = get_plugin_config('netbox_napalm_plugin', 'NAPALM_TIMEOUT')
        optional_args = get_plugin_config('netbox_napalm_plugin', 'NAPALM_ARGS').copy()
        if device.platform.napalm_args is not None:
            optional_args.update(device.platform.napalm_args)

        # Update NAPALM parameters according to the request headers
        for header in request.headers:
            if header[:9].lower() != "x-napalm-":
                continue

            key = header[9:]
            if key.lower() == "username":
                username = request.headers[header]
            elif key.lower() == "password":
                password = request.headers[header]
            elif key:
                optional_args[key.lower()] = request.headers[header]

        # Connect to the device
        d = driver(
            hostname=host,
            username=username,
            password=password,
            timeout=timeout,
            optional_args=optional_args,
        )
        try:
            d.open()
        except Exception as e:
            raise ServiceUnavailable(
                "Error connecting to the device at {}: {}".format(host, e)
            )

        # Validate and execute each specified NAPALM method
        for method in napalm_methods:
            if not hasattr(driver, method):
                response[method] = {"error": "Unknown NAPALM method"}
                continue
            if not method.startswith("get_"):
                response[method] = {"error": "Only get_* NAPALM methods are supported"}
                continue
            try:
                response[method] = getattr(d, method)()
            except NotImplementedError:
                response[method] = {
                    "error": "Method {} not implemented for NAPALM driver {}".format(
                        method, driver
                    )
                }
            except Exception as e:
                response[method] = {"error": "Method {} failed: {}".format(method, e)}
        d.close()

        return Response(response)
