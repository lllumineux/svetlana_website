from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.articles import models, serializers
from apps.articles.models import Article


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = models.Article.objects.all()
    serializer_class = serializers.ArticleSerializer

    @action(methods=['PATCH'], detail=True, url_path='invert_visibility')
    def invert_course_visibility(self, request, pk=None):
        article = Article.objects.get(pk=pk)
        article.is_hidden = not article.is_hidden
        article.save()
        return Response()
