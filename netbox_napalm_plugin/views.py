from django.db.models import Count

from netbox.views import generic
from . import filtersets, forms, models, tables


class NapalmView(generic.ObjectView):
    queryset = models.Napalm.objects.all()


class NapalmListView(generic.ObjectListView):
    queryset = models.Napalm.objects.all()
    table = tables.NapalmTable


class NapalmEditView(generic.ObjectEditView):
    queryset = models.Napalm.objects.all()
    form = forms.NapalmForm


class NapalmDeleteView(generic.ObjectDeleteView):
    queryset = models.Napalm.objects.all()


