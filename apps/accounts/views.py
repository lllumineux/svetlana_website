from rest_framework import viewsets
from apps.accounts import models
from apps.accounts import serializers


class UserViewSet(viewsets.ModelViewSet):
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer


class UserCourseViewSet(viewsets.ModelViewSet):
    queryset = models.UserCourse.objects.all()
    serializer_class = serializers.UserCourseSerializer


class UserWeekViewSet(viewsets.ModelViewSet):
    queryset = models.UserWeek.objects.all()
    serializer_class = serializers.UserWeekSerializer


class UserDayViewSet(viewsets.ModelViewSet):
    queryset = models.UserDay.objects.all()
    serializer_class = serializers.UserDaySerializer
