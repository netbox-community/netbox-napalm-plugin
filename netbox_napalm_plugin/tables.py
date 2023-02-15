import django_tables2 as tables

from netbox.tables import NetBoxTable, ChoiceFieldColumn
from .models import NapalmPlatform


class NapalmPlatformTable(NetBoxTable):

    class Meta(NetBoxTable.Meta):
        model = NapalmPlatform
        fields = ('pk', 'platform__name', 'napalm_driver', 'napalm_args', 'actions')
        default_columns = ('platform__name', 'napalm_driver')
