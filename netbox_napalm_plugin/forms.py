from django import forms
from ipam.models import Prefix
from netbox.forms import NetBoxModelFilterSetForm, NetBoxModelForm
from utilities.forms.fields import CommentField, DynamicModelChoiceField

from .models import NapalmPlatform


class NapalmPlatformForm(NetBoxModelForm):
    class Meta:
        model = NapalmPlatform
        fields = (
            "platform",
            "napalm_driver",
            "napalm_args",
            "tags",
        )
