from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.stuff import serializers, models
from apps.stuff.models import GeneralInfo


class NumberViewSet(viewsets.ModelViewSet):
    queryset = models.Number.objects.all()
    serializer_class = serializers.NumberSerializer

    def get_permissions(self):
        if self.action in ['create']:
            permission_classes = (permissions.AllowAny,)
        else:
            permission_classes = (permissions.IsAdminUser,)
        return [permission() for permission in permission_classes]


class ScreenshotViewSet(viewsets.ModelViewSet):
    queryset = models.Screenshot.objects.all()
    serializer_class = serializers.ScreenshotSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            permission_classes = (permissions.AllowAny,)
        else:
            permission_classes = (permissions.IsAdminUser,)
        return [permission() for permission in permission_classes]


class GeneralInfoViewSet(viewsets.ModelViewSet):
    queryset = models.GeneralInfo.objects.all()
    serializer_class = serializers.GeneralInfoSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = (permissions.IsAdminUser,)
        else:
            permission_classes = (permissions.AllowAny,)
        return [permission() for permission in permission_classes]

    @action(methods=['GET'], detail=False)
    def contact_info(self, request):
        obj = GeneralInfo.objects.all()[0]
        return Response(
            {
                'whatsapp_number': obj.whatsapp_number,
                'whatsapp_link': obj.whatsapp_link,
                'instagram_alias': obj.instagram_alias,
                'instagram_link': obj.instagram_link,
            }
        )
