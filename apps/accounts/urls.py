from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from apps.accounts import views
from django.urls import path, include


router = routers.DefaultRouter()
router.register('users', views.UserViewSet)
router.register('users_courses', views.UserCourseViewSet)
router.register('users_weeks', views.UserWeekViewSet)
router.register('users_days', views.UserDayViewSet)


urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
    path('api/token/verify/', TokenVerifyView.as_view()),
    path(r'', include('rest_framework.urls')),
]
