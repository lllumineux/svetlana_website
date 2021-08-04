from rest_framework import routers
from apps.articles import views

router = routers.DefaultRouter()
router.register('articles', views.ArticleViewSet)
