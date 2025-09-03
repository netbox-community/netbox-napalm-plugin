"""Top-level package for NetBox Napalm Plugin."""

__author__ = """Arthur Hanson"""
__email__ = "ahanson@netboxlabs.com"
__version__ = "0.3.3"


from netbox.plugins import PluginConfig


class NapalmPlatformConfig(PluginConfig):
    name = "netbox_napalm_plugin"
    verbose_name = "NetBox Napalm Plugin"
    description = "NetBox plugin for Napalm."
    version = __version__
    author = __author__
    author_email = __email__
    base_url = "netbox_napalm_plugin"
    required_settings = ['NAPALM_USERNAME', 'NAPALM_PASSWORD', ]
    default_settings = {
        'NAPALM_TIMEOUT': 30,
        'NAPALM_ARGS': {},
    }
    min_version = '4.2.0'
    max_version = '4.4.99'


config = NapalmPlatformConfig
