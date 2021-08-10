from django.urls import path
from . import views


urlpatterns = [
    path('courses/', views.index),
    path('courses/add/', views.index),
    path('courses/edit/<pk>/', views.index),
    path('courses/<pk>/', views.index),
    path('courses/<pk>/weeks/<num>/', views.index),
    path('courses/<pk>/weeks/edit/<num>/', views.index),
    path('courses/<pk>/weeks/<num1>/days/<num2>/', views.index),
    path('courses/<pk>/weeks/<num1>/days/edit/<num2>/', views.index)
]
