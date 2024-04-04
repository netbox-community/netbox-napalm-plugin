from netbox.plugins import PluginMenuButton, PluginMenuItem

plugin_buttons = [
    PluginMenuButton(
        link="plugins:netbox_napalm_plugin:napalmplatformconfig_add",
        title="Add",
        icon_class="mdi mdi-plus-thick",
    )
]

menu_items = (
    PluginMenuItem(
        link="plugins:netbox_napalm_plugin:napalmplatformconfig_list",
        link_text="Napalm",
        buttons=plugin_buttons,
    ),
)
