from django.utils import timezone
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from apps.accounts import models, serializers
from apps.courses import models as courses_models
from apps.courses.helpers.functions import get_first_course_day
from apps.courses.serializers import CourseSerializer


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.UserSerializer
    queryset = models.User.objects.all()

    def get_permissions(self):
        permission_classes = (permissions.IsAdminUser,)
        return [permission() for permission in permission_classes]

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

    def get_permissions(self):
        permission_classes = (permissions.IsAdminUser,)
        return [permission() for permission in permission_classes]

    @action(methods=['POST'], detail=False, url_path='invert_access')
    def invert_course_access(self, request):
        course = courses_models.Course.objects.get(pk=request.data["course_id"])
        user = models.User.objects.get(pk=request.data["user_id"])
        user_courses = models.UserCourse.objects.filter(course=course, user=user)
        if user_courses:
            user_courses[0].delete()
        else:
            new_user_course = models.UserCourse(course=course, user=user)
            new_user_course.save()
            new_user_day = models.UserDay(day=get_first_course_day(course), user=user, activation_time=timezone.now())
            new_user_day.save()
        user_serialized = serializers.UserSerializer(user).data
        user_serialized["courses"] = [CourseSerializer(obj.course).data for obj in models.UserCourse.objects.filter(user=user)]
        return Response(user_serialized)


class UserDayViewSet(viewsets.ModelViewSet):
    queryset = models.UserDay.objects.all()
    serializer_class = serializers.UserDaySerializer
    permission_classes = (permissions.IsAdminUser,)

