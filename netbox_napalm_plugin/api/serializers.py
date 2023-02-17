from dcim.api.serializers import NestedPlatformSerializer
from netbox.api.serializers import NetBoxModelSerializer
from rest_framework import serializers

from netbox_napalm_plugin.models import NapalmPlatform


class NapalmPlatformSerializer(NetBoxModelSerializer):
    url = serializers.HyperlinkedIdentityField(
        view_name="plugins-api:netbox_napalm_plugin-api:napalmplatform-detail"
    )
    platform = NestedPlatformSerializer()

    class Meta:
        model = NapalmPlatform
        fields = [
            "id",
            "url",
            "platform",
            "napalm_driver",
            "napalm_args",
            "tags",
            "created",
            "last_updated",
        ]


class DeviceNAPALMSerializer(serializers.Serializer):
    method = serializers.JSONField()
