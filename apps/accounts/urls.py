from rest_framework import routers
from apps.accounts import views, api
from django.urls import path, include
from knox import views as knox_views

router = routers.DefaultRouter()
router.register('users', views.UserViewSet)
router.register('users_courses', views.UserCourseViewSet)


urlpatterns = [
    path('api/auth/register/', api.RegisterAPI.as_view()),
    path('api/auth/login/', api.LoginAPI.as_view()),
    path('api/auth/user/', api.UserAPI.as_view()),
    path('api/auth/logout/', knox_views.LogoutView.as_view(), name='knox_logout'),
    path('api/auth/', include('knox.urls')),
]
