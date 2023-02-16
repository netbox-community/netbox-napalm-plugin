import django_filters
from dcim.models import Platform
from django.utils.translation import gettext as _
from netbox.filtersets import (NetBoxModelFilterSet,
                               OrganizationalModelFilterSet)

from .models import NapalmPlatform


class NapalmPlatformFilterSet(NetBoxModelFilterSet):
    platform_id = django_filters.ModelMultipleChoiceFilter(
        field_name="platform",
        queryset=Platform.objects.all(),
        label=_("Platform (ID)"),
    )
    platform = django_filters.ModelMultipleChoiceFilter(
        field_name="platform__slug",
        queryset=Platform.objects.all(),
        to_field_name="slug",
        label=_("Platform (slug)"),
    )

    class Meta:
        model = NapalmPlatform
        fields = ["id", "napalm_driver"]
