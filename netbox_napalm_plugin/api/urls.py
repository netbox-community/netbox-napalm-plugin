# api/urls.py
from netbox.api.routers import NetBoxRouter

from .views import NapalmPlatformViewSet

router = NetBoxRouter()
router.register("napalmplatform", NapalmPlatformViewSet)
urlpatterns = router.urls
