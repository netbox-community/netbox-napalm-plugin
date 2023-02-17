from dcim.models.devices import Platform
from django.db import models
from django.urls import reverse
from django.utils.translation import gettext as _
from netbox.models import NetBoxModel


class NapalmPlatformConfig(NetBoxModel):
    platform = models.OneToOneField(
        Platform,
        on_delete=models.CASCADE,
        related_name="napalm",
    )
    napalm_driver = models.CharField(
        max_length=50,
        blank=True,
        verbose_name="NAPALM driver",
        help_text=_(
            "The name of the NAPALM driver to use when interacting with devices"
        ),
    )
    napalm_args = models.JSONField(
        blank=True,
        null=True,
        verbose_name="NAPALM arguments",
        help_text=_(
            "Additional arguments to pass when initiating the NAPALM driver (JSON format)"
        ),
    )

    class Meta:
        ordering = ("pk",)

    def __str__(self):
        return f"{self.platform.name} -> {self.napalm_driver}"

    def get_absolute_url(self):
        return reverse("plugins:netbox_napalm_plugin:napalmplatformconfig", args=[self.pk])
