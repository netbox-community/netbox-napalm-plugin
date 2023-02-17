from dcim.constants import NONCONNECTABLE_IFACE_TYPES
from dcim.models import Device
from django.db.models import Count
from django.utils.translation import gettext as _
from netbox.views import generic
from utilities.views import ViewTab, register_model_view

from . import filtersets, forms, models, tables


class NapalmPlatformConfigView(generic.ObjectView):
    queryset = models.NapalmPlatformConfig.objects.all()


class NapalmPlatformConfigListView(generic.ObjectListView):
    queryset = models.NapalmPlatformConfig.objects.all()
    table = tables.NapalmPlatformConfigTable


class NapalmPlatformConfigEditView(generic.ObjectEditView):
    queryset = models.NapalmPlatformConfig.objects.all()
    form = forms.NapalmPlatformConfigForm


class NapalmPlatformConfigDeleteView(generic.ObjectDeleteView):
    queryset = models.NapalmPlatformConfig.objects.all()


class NAPALMViewTab(ViewTab):
    def render(self, instance):
        # Display NAPALM tabs only for devices which meet certain requirements
        if not (
            hasattr(instance.platform, "napalm")
            and instance.status == "active"
            and instance.primary_ip
            and instance.platform
            and instance.platform.napalm.napalm_driver
        ):
            return None
        return super().render(instance)


@register_model_view(Device, "status")
class DeviceStatusView(generic.ObjectView):
    additional_permissions = ["dcim.napalm_read_device"]
    queryset = Device.objects.all()
    template_name = "netbox_napalm_plugin/status.html"
    tab = NAPALMViewTab(
        label=_("Status"), permission="dcim.napalm_read_device", weight=3000
    )


@register_model_view(Device, "lldp_neighbors", path="lldp-neighbors")
class DeviceLLDPNeighborsView(generic.ObjectView):
    additional_permissions = ["dcim.napalm_read_device"]
    queryset = Device.objects.all()
    template_name = "netbox_napalm_plugin/lldp_neighbors.html"
    tab = NAPALMViewTab(
        label=_("LLDP Neighbors"), permission="dcim.napalm_read_device", weight=3100
    )

    def get_extra_context(self, request, instance):
        interfaces = (
            instance.vc_interfaces()
            .restrict(request.user, "view")
            .prefetch_related("_path")
            .exclude(type__in=NONCONNECTABLE_IFACE_TYPES)
        )

        return {
            "interfaces": interfaces,
        }


@register_model_view(Device, "config")
class DeviceConfigView(generic.ObjectView):
    additional_permissions = ["dcim.napalm_read_device"]
    queryset = Device.objects.all()
    template_name = "netbox_napalm_plugin/config.html"
    tab = NAPALMViewTab(
        label=_("Config"), permission="dcim.napalm_read_device", weight=3200
    )
