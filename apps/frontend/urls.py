from django.urls import path
from . import views


urlpatterns = [
    # Login/Signup
    path('login/', views.index),
    path('signup/', views.index),

    # Courses
    path('courses/', views.index),
    path('courses/add/', views.index),
    path('courses/edit/<pk>/', views.index),
    path('courses/<pk>/', views.index),
    path('courses/<pk>/weeks/<num>/', views.index),
    path('courses/<pk>/weeks/edit/<num>/', views.index),
    path('courses/<pk>/weeks/<num1>/days/<num2>/', views.index),
    path('courses/<pk>/weeks/<num1>/days/edit/<num2>/', views.index),

    # Articles
    path('articles/', views.index),
    path('articles/add/', views.index),
    path('articles/edit/<pk>/', views.index),
    path('articles/<pk>/', views.index),

    # General Info
    path('general_info/', views.index),

    # Numbers
    path('numbers/', views.index),
]
