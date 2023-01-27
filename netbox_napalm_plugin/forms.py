from django import forms

from ipam.models import Prefix
from netbox.forms import NetBoxModelForm, NetBoxModelFilterSetForm
from utilities.forms.fields import CommentField, DynamicModelChoiceField
from .models import Napalm


class NapalmForm(NetBoxModelForm):

    class Meta:
        model = Napalm
        fields = ('name', 'tags')
