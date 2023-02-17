"""Top-level package for NetBox Napalm Plugin."""

__author__ = """Arthur Hanson"""
__email__ = "ahanson@netboxlabs.com"
__version__ = "0.1.0"


from extras.plugins import PluginConfig


class NapalmPlatformConfig(PluginConfig):
    name = "netbox_napalm_plugin"
    verbose_name = "NetBox Napalm Plugin"
    description = "NetBox plugin for Napalm."
    version = "version"
    base_url = "netbox_napalm_plugin"


config = NapalmPlatformConfig
