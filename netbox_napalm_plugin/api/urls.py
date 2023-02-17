# api/urls.py
from netbox.api.routers import NetBoxRouter

from .views import NapalmPlatformConfigViewSet

router = NetBoxRouter()
router.register("napalmplatformconfig", NapalmPlatformConfigViewSet)
urlpatterns = router.urls
