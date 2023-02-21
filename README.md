# NetBox Napalm Plugin

NetBox plugin for Napalm.


* Free software: Apache-2.0
* Documentation: https://netbox-community.github.io/netbox-napalm/.


## Features

The features the plugin provides should be listed here.

## Compatibility

> :warning: **NetBox 3.5 Beta**: This plugin is for NetBox 3.5 (Beta)

| NetBox Version | Plugin Version |
|----------------|----------------|
|     3.5        |      0.1.0     |

## Installing

For adding to a NetBox Docker setup see
[the general instructions for using netbox-docker with plugins](https://github.com/netbox-community/netbox-docker/wiki/Using-Netbox-Plugins).

While this is still in development and not yet on pypi you can install with pip:

```bash
pip install git+https://github.com/netbox-community/netbox-napalm
```

or by adding to your `local_requirements.txt` or `plugin_requirements.txt` (netbox-docker):

```bash
git+https://github.com/netbox-community/netbox-napalm
```

Enable the plugin in `/opt/netbox/netbox/netbox/configuration.py`,
 or if you use netbox-docker, your `/configuration/plugins.py` file :

```python
PLUGINS = [
    'Napalm'
]

PLUGINS_CONFIG = {
    'netbox_napalm_plugin': {
        'NAPALM_USERNAME': 'xxx',
        'NAPALM_PASSWORD': 'yyy',
    },
}
```

## Credits

Based on the NetBox plugin tutorial:

- [demo repository](https://github.com/netbox-community/netbox-plugin-demo)
- [tutorial](https://github.com/netbox-community/netbox-plugin-tutorial)

This package was created with [Cookiecutter](https://github.com/audreyr/cookiecutter) and the [`netbox-community/cookiecutter-netbox-plugin`](https://github.com/netbox-community/cookiecutter-netbox-plugin) project template.
