# NetBox Napalm Plugin

NetBox plugin for Napalm.


* Free software: Apache-2.0
* Documentation: https://netbox-community.github.io/netbox-napalm/.


## Features

The features the plugin provides should be listed here.

## Compatibility

> :warning: **NetBox 3.5**: This plugin is for NetBox 3.5

| NetBox Version | Plugin Version |
|----------------|----------------|
|     3.5        |      0.1.0     |

## Installation

For adding to a NetBox Docker setup see
[the general instructions for using netbox-docker with plugins](https://github.com/netbox-community/netbox-docker/wiki/Using-Netbox-Plugins).

```no-highlight
$ source /opt/netbox/venv/bin/activate
(venv) pip install netbox-napalm-plugin
```

or by adding to your `local_requirements.txt` or `plugin_requirements.txt` (netbox-docker):

```no-highlight
(venv) netbox-napalm-plugin
```

### Enable the Plugin

Enable the plugin in `/opt/netbox/netbox/netbox/configuration.py`,
 or if you use netbox-docker, your `/configuration/plugins.py` file :

```no-highlight
PLUGINS = [
    'netbox_napalm_plugin'
]
```

### Configure Plugin

Configure the plugin in `configuration.py` under the `PLUGINS_CONFIG` parameter.

```no-highlight
PLUGINS_CONFIG = {
    'netbox_napalm_plugin': {
        'NAPALM_USERNAME': 'xxx',
        'NAPALM_PASSWORD': 'yyy',
    },
}
```

### Run Database Migrations

Run the provided schema migrations:

```no-highlight
(venv) $ cd /opt/netbox/netbox/
(venv) $ python3 manage.py migrate
```

### Collect Static Files

Ensure the static files are copied to the static root directory with the `collectstatic` management command:

```no-highlight
(venv) $ cd /opt/netbox/netbox/
(venv) $ python3 manage.py collectstatic
```

### Restart WSGI Service

Restart the WSGI service to load the new plugin:

```no-highlight
# sudo systemctl restart netbox
```

## Credits

Based on the NetBox plugin tutorial:

- [demo repository](https://github.com/netbox-community/netbox-plugin-demo)
- [tutorial](https://github.com/netbox-community/netbox-plugin-tutorial)

This package was created with [Cookiecutter](https://github.com/audreyr/cookiecutter) and the [`netbox-community/cookiecutter-netbox-plugin`](https://github.com/netbox-community/cookiecutter-netbox-plugin) project template.
