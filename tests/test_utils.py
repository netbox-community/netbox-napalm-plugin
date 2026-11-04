"""Tests for choosing the address NetBox connects to."""

import sys
import types
import unittest

# The package __init__ imports NetBox. Stub it so these helpers can be tested
# without a NetBox install.
if "netbox.plugins" not in sys.modules:
    netbox = types.ModuleType("netbox")
    plugins = types.ModuleType("netbox.plugins")
    plugins.PluginConfig = object
    netbox.plugins = plugins
    sys.modules.setdefault("netbox", netbox)
    sys.modules["netbox.plugins"] = plugins

from netbox_napalm_plugin.utils import get_connection_ip, use_nat_outside  # noqa: E402


class FakeQuerySet:
    def __init__(self, items):
        self.items = items

    def order_by(self, field):
        return FakeQuerySet(sorted(self.items, key=lambda item: getattr(item, field)))

    def first(self):
        return self.items[0] if self.items else None


class FakeIP:
    def __init__(self, pk, nat_outside=()):
        self.pk = pk
        self.nat_outside = FakeQuerySet(list(nat_outside))


class FakeDevice:
    def __init__(self, primary_ip, config_context=None):
        self.primary_ip = primary_ip
        self.config_context = config_context or {}

    def get_config_context(self):
        return self.config_context


class UseNatOutsideTests(unittest.TestCase):
    def test_default_off(self):
        self.assertFalse(use_nat_outside(FakeDevice(FakeIP(1))))

    def test_plugin_default_on(self):
        self.assertTrue(use_nat_outside(FakeDevice(FakeIP(1)), default=True))

    def test_config_context_enables(self):
        device = FakeDevice(FakeIP(1), {"napalm": {"use_nat_outside": True}})
        self.assertTrue(use_nat_outside(device))

    def test_config_context_disables_over_default(self):
        device = FakeDevice(FakeIP(1), {"napalm": {"use_nat_outside": False}})
        self.assertFalse(use_nat_outside(device, default=True))

    def test_non_boolean_values_ignored(self):
        for context in ({"napalm": {"use_nat_outside": "false"}}, {"napalm": "yes"}, {"napalm": None}):
            with self.subTest(context=context):
                self.assertFalse(use_nat_outside(FakeDevice(FakeIP(1), context)))


class GetConnectionIPTests(unittest.TestCase):
    def test_primary_ip_when_disabled(self):
        primary = FakeIP(1, nat_outside=[FakeIP(2)])
        self.assertIs(get_connection_ip(FakeDevice(primary)), primary)

    def test_nat_outside_when_enabled(self):
        outside = FakeIP(2)
        primary = FakeIP(1, nat_outside=[outside])
        device = FakeDevice(primary, {"napalm": {"use_nat_outside": True}})
        self.assertIs(get_connection_ip(device), outside)

    def test_lowest_id_when_several(self):
        first, second = FakeIP(2), FakeIP(3)
        primary = FakeIP(1, nat_outside=[second, first])
        self.assertIs(get_connection_ip(FakeDevice(primary), default_use_nat_outside=True), first)

    def test_primary_ip_when_no_nat_outside(self):
        primary = FakeIP(1)
        self.assertIs(get_connection_ip(FakeDevice(primary), default_use_nat_outside=True), primary)


if __name__ == "__main__":
    unittest.main()
