from netbox.filtersets import NetBoxModelFilterSet
from .models import NapalmPlatform


# class NapalmFilterSet(NetBoxModelFilterSet):
#
#     class Meta:
#         model = Napalm
#         fields = ['name', ]
#
#     def search(self, queryset, name, value):
#         return queryset.filter(description__icontains=value)
