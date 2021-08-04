from rest_framework import routers
from articles import views

router = routers.DefaultRouter()
router.register('articles', views.ArticleViewSet)
