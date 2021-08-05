from rest_framework import routers
from apps.stuff import views

router = routers.DefaultRouter()
router.register('numbers', views.NumberViewSet)
router.register('screenshots', views.ScreenshotViewSet)
router.register('general_info', views.GeneralInfoViewSet)
