from django.urls import path

from netbox.views.generic import ObjectChangeLogView
from . import models, views


urlpatterns = (

    path('napalms/', views.NapalmListView.as_view(), name='napalm_list'),
    path('napalms/add/', views.NapalmEditView.as_view(), name='napalm_add'),
    path('napalms/<int:pk>/', views.NapalmView.as_view(), name='napalm'),
    path('napalms/<int:pk>/edit/', views.NapalmEditView.as_view(), name='napalm_edit'),
    path('napalms/<int:pk>/delete/', views.NapalmDeleteView.as_view(), name='napalm_delete'),
    path('napalms/<int:pk>/changelog/', ObjectChangeLogView.as_view(), name='napalm_changelog', kwargs={
        'model': models.Napalm
    }),

)
