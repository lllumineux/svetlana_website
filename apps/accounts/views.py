from rest_framework import viewsets
from rest_framework.response import Response
from apps.accounts import models, serializers
from apps.courses.serializers import CourseSerializer


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.UserSerializer
    queryset = models.User.objects.all()

    def list(self, request, *args, **kwargs):
        users = models.User.objects.all()
        users_serialized = []
        for user in users:
            user_serialized = serializers.UserSerializer(user).data
            user_serialized["courses"] = [CourseSerializer(obj.course).data for obj in models.UserCourse.objects.filter(user=user)]
            users_serialized.append(user_serialized)
        return Response(users_serialized)


class UserCourseViewSet(viewsets.ModelViewSet):
    queryset = models.UserCourse.objects.all()
    serializer_class = serializers.UserCourseSerializer


class UserWeekViewSet(viewsets.ModelViewSet):
    queryset = models.UserWeek.objects.all()
    serializer_class = serializers.UserWeekSerializer


class UserDayViewSet(viewsets.ModelViewSet):
    queryset = models.UserDay.objects.all()
    serializer_class = serializers.UserDaySerializer
