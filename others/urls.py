from rest_framework import routers
from others import views

router = routers.DefaultRouter()
router.register('numbers', views.NumberViewSet)
router.register('screenshots', views.ScreenshotViewSet)
router.register('general_info', views.GeneralInfoViewSet)
