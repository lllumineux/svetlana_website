from django.contrib.auth.models import AnonymousUser
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.articles import models, serializers


class ArticleViewSet(viewsets.ModelViewSet):
    queryset = models.Article.objects.all()
    serializer_class = serializers.ArticleSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = (permissions.AllowAny,)
        else:
            permission_classes = (permissions.IsAdminUser,)
        return [permission() for permission in permission_classes]

    def list(self, request, *args, **kwargs):
        articles = models.Article.objects.all()
        if isinstance(request.user, (AnonymousUser,)) or not request.user.is_staff:
            articles = list(filter(lambda x: not x.is_hidden, articles))
        return Response([serializers.ArticleSerializer(article).data for article in articles])

    @action(methods=['PATCH'], detail=True, url_path='invert_visibility')
    def invert_article_visibility(self, request, pk=None):
        article = models.Article.objects.get(pk=pk)
        article.is_hidden = not article.is_hidden
        article.save()
        return Response()
