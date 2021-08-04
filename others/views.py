from rest_framework import viewsets
from others import models, serializers


class NumberViewSet(viewsets.ModelViewSet):
    queryset = models.Number.objects.all()
    serializer_class = serializers.NumberSerializer


class ScreenshotViewSet(viewsets.ModelViewSet):
    queryset = models.Screenshot.objects.all()
    serializer_class = serializers.ScreenshotSerializer


class GeneralInfoViewSet(viewsets.ModelViewSet):
    queryset = models.GeneralInfo.objects.all()
    serializer_class = serializers.GeneralInfoSerializer
