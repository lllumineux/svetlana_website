from django.urls import path
from . import views


urlpatterns = [
    path('courses', views.index)
]
