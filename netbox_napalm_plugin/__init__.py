"""Top-level package for NetBox Napalm Plugin."""

__author__ = """Arthur Hanson"""
__email__ = "ahanson@netboxlabs.com"
__version__ = "0.2.0"


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
    min_version = '4.0-beta1'
    max_version = '4.0.99'


config = NapalmPlatformConfig
