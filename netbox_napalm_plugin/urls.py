from django.urls import path
from netbox.views.generic import ObjectChangeLogView

from . import models, views

urlpatterns = (
    path("napalm/", views.NapalmPlatformConfigListView.as_view(), name="napalmplatformconfig_list"),
    path(
        "napalm/add/", views.NapalmPlatformConfigEditView.as_view(), name="napalmplatformconfig_add"
    ),
    path("napalm/<int:pk>/", views.NapalmPlatformConfigView.as_view(), name="napalmplatformconfig"),
    path(
        "napalm/<int:pk>/edit/",
        views.NapalmPlatformConfigEditView.as_view(),
        name="napalmplatformconfig_edit",
    ),
    path(
        "napalm/<int:pk>/delete/",
        views.NapalmPlatformConfigDeleteView.as_view(),
        name="napalmplatformconfig_delete",
    ),
    path(
        "napalm/<int:pk>/changelog/",
        ObjectChangeLogView.as_view(),
        name="napalmplatformconfig_changelog",
        kwargs={"model": models.NapalmPlatformConfig},
    ),
)
