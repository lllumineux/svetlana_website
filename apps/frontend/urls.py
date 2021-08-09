from django.urls import path
from . import views


urlpatterns = [
    path('courses/', views.index),
    path('courses/add/', views.index),
    path('courses/edit/<pk>/', views.index),
    path('courses/<pk>/', views.index),
    path('courses/<pk>/weeks/<num>/', views.index),
    path('courses/<pk>/weeks/edit/<num>/', views.index)
]
