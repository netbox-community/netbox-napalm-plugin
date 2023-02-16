from django.urls import path
from netbox.views.generic import ObjectChangeLogView

from . import models, views

urlpatterns = (
    path("napalm/", views.NapalmPlatformListView.as_view(), name="napalmplatform_list"),
    path(
        "napalm/add/", views.NapalmPlatformEditView.as_view(), name="napalmplatform_add"
    ),
    path("napalm/<int:pk>/", views.NapalmPlatformView.as_view(), name="napalmplatform"),
    path(
        "napalm/<int:pk>/edit/",
        views.NapalmPlatformEditView.as_view(),
        name="napalmplatform_edit",
    ),
    path(
        "napalm/<int:pk>/delete/",
        views.NapalmPlatformDeleteView.as_view(),
        name="napalmplatform_delete",
    ),
    path(
        "napalm/<int:pk>/changelog/",
        ObjectChangeLogView.as_view(),
        name="napalmplatform_changelog",
        kwargs={"model": models.NapalmPlatform},
    ),
)
