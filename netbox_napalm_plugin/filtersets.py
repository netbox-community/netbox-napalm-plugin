from netbox.filtersets import NetBoxModelFilterSet
from .models import Napalm


# class NapalmFilterSet(NetBoxModelFilterSet):
#
#     class Meta:
#         model = Napalm
#         fields = ['name', ]
#
#     def search(self, queryset, name, value):
#         return queryset.filter(description__icontains=value)
