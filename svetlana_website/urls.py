"""svetlana_website URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from apps.accounts.urls import router as auth_router
from apps.articles.urls import router as articles_router
from apps.courses.urls import router as courses_router
from apps.reports.urls import router as reports_router
from apps.others.urls import router as others_router


router = routers.DefaultRouter()
router.registry.extend(auth_router.registry)
router.registry.extend(articles_router.registry)
router.registry.extend(courses_router.registry)
router.registry.extend(reports_router.registry)
router.registry.extend(others_router.registry)


urlpatterns = [
    path('admin/', admin.site.urls),
    path(r'api/auth/', include('apps.accounts.urls')),
    path(r'api/', include(router.urls))
]
