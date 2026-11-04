"""Helpers for choosing the address NetBox connects to."""

CONFIG_CONTEXT_KEY = "napalm"
USE_NAT_OUTSIDE_KEY = "use_nat_outside"


def use_nat_outside(device, default=False):
    """Return whether to connect to the NAT outside address of the device's primary IP.

    A boolean ``napalm.use_nat_outside`` in the device's rendered config context
    overrides ``default``. Config contexts can be assigned by tenant, site, role,
    platform or tag, or set on a single device as local context data.
    """
    context = device.get_config_context().get(CONFIG_CONTEXT_KEY)
    if isinstance(context, dict):
        value = context.get(USE_NAT_OUTSIDE_KEY)
        if isinstance(value, bool):
            return value
    return default is True


def get_connection_ip(device, default_use_nat_outside=False):
    """Return the IP address object NetBox should connect to for ``device``.

    When NAT outside is enabled for the device and its primary IP has a NAT
    outside address, return that address (the lowest ID if there are several).
    Otherwise return the primary IP.
    """
    primary_ip = device.primary_ip
    if use_nat_outside(device, default_use_nat_outside):
        outside_ip = primary_ip.nat_outside.order_by("pk").first()
        if outside_ip is not None:
            return outside_ip
    return primary_ip
