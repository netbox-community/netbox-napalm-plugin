import django_tables2 as tables
from django_tables2.utils import Accessor
from netbox.tables import ChoiceFieldColumn, NetBoxTable

from .models import NapalmPlatform


class NapalmPlatformTable(NetBoxTable):
    name = tables.Column(
        accessor=Accessor('platform__name'),
        linkify={
            'viewname': 'plugins:netbox_napalm_plugin:napalmplatform',
            'args': [Accessor('pk')],
        }
    )

    class Meta(NetBoxTable.Meta):
        model = NapalmPlatform
        fields = ("pk", "name", "napalm_driver", "napalm_args", "actions")
        default_columns = ("name", "napalm_driver")
