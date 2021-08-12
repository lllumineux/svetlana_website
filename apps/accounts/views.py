from rest_framework import viewsets
from apps.accounts import models, serializers


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.UserSerializer
    queryset = models.User.objects.all()


class UserCourseViewSet(viewsets.ModelViewSet):
    queryset = models.UserCourse.objects.all()
    serializer_class = serializers.UserCourseSerializer


class UserWeekViewSet(viewsets.ModelViewSet):
    queryset = models.UserWeek.objects.all()
    serializer_class = serializers.UserWeekSerializer


class UserDayViewSet(viewsets.ModelViewSet):
    queryset = models.UserDay.objects.all()
    serializer_class = serializers.UserDaySerializer
