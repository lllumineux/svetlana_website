import json

from django.contrib.auth.models import AnonymousUser
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.courses import serializers
from apps.reports.serializers import ReportQuestionSerializer
from apps.courses import models
from apps.courses.models import Course, Week, Day
from apps.accounts.models import UserCourse
from apps.reports.models import ReportQuestion
from apps.accounts import models as accounts_models


class CourseViewSet(viewsets.ModelViewSet):
    queryset = models.Course.objects.all()
    serializer_class = serializers.CourseSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            permission_classes = (permissions.IsAdminUser,)
        else:
            permission_classes = (permissions.AllowAny,)
        return [permission() for permission in permission_classes]

    def retrieve(self, request, *args, **kwargs):
        course = self.get_object()
        if course.is_hidden and not request.user.is_staff:
            return Response({'detail': 'You do not have permission to perform this action.'}, status=401)
        return Response(self.get_serializer(course).data)

    def list(self, request, *args, **kwargs):
        courses = models.Course.objects.all()

        if isinstance(request.user, (AnonymousUser,)):
            courses = list(filter(lambda x: not x.is_hidden, courses))
        elif not request.user.is_staff:
            courses = list(filter(lambda x: not x.is_hidden, [obj.course for obj in UserCourse.objects.filter(user=request.user)]))

        return Response([serializers.CourseSerializer(course).data for course in courses])

    @action(methods=['PATCH'], detail=True, url_path='invert_visibility', permission_classes=(permissions.IsAdminUser,))
    def invert_course_visibility(self, request, pk=None):
        course = Course.objects.get(pk=pk)
        course.is_hidden = not course.is_hidden
        course.save()
        return Response()

    @action(methods=['GET'], detail=True, permission_classes=(permissions.IsAuthenticated,))
    def week_list(self, request, pk=None):
        course = Course.objects.get(pk=pk)

        if not request.user.is_staff:
            if not accounts_models.UserCourse.objects.filter(user=request.user, course=course) or course.is_hidden:
                return Response({'detail': 'You do not have permission to perform this action.'}, status=401)

        weeks = Week.objects.filter(course=course)
        return Response(serializers.WeekSerializer(week).data for week in weeks)


class WeekViewSet(viewsets.ModelViewSet):
    queryset = models.Week.objects.all()
    serializer_class = serializers.WeekSerializer

    def get_permissions(self):
        if self.action in ['list', 'create', 'update', 'partial_update', 'destroy']:
            permission_classes = (permissions.IsAdminUser,)
        else:
            permission_classes = (permissions.IsAuthenticated,)
        return [permission() for permission in permission_classes]

    def retrieve(self, request, *args, **kwargs):
        week = self.get_object()
        if not request.user.is_staff:
            if not accounts_models.UserCourse.objects.filter(user=request.user, course=week.course) or week.course.is_hidden:
                return Response({'detail': 'You do not have permission to perform this action.'}, status=401)
        return Response(self.get_serializer(week).data)

    @action(methods=['GET'], detail=True)
    def day_list(self, request, pk=None):
        week = Week.objects.get(pk=pk)
        if not request.user.is_staff:
            if not accounts_models.UserCourse.objects.filter(user=request.user, course=week.course) or week.course.is_hidden:
                return Response({'detail': 'You do not have permission to perform this action.'}, status=401)
        days = Day.objects.filter(week=week)
        return Response(serializers.DaySerializer(day).data for day in days)


class DayViewSet(viewsets.ModelViewSet):
    queryset = models.Day.objects.all()
    serializer_class = serializers.DaySerializer

    def get_permissions(self):
        if self.action in ['list', 'create', 'update', 'partial_update', 'destroy']:
            permission_classes = (permissions.IsAdminUser,)
        else:
            permission_classes = (permissions.IsAuthenticated,)
        return [permission() for permission in permission_classes]

    def retrieve(self, request, *args, **kwargs):
        day = self.get_object()
        if not request.user.is_staff:
            if not accounts_models.UserCourse.objects.filter(user=request.user, course=day.week.course) or day.week.course.is_hidden:
                return Response({'detail': 'You do not have permission to perform this action.'}, status=401)
        return Response(self.get_serializer(day).data)

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        for key, val in request.data.items():
            if "report_question" in key:
                report_question = json.loads(val)
                report_question_to_update = ReportQuestion.objects.get(pk=report_question["id"])
                report_question_to_update.text = report_question["text"]
                report_question_to_update.save()
        return response

    @action(methods=['GET'], detail=True)
    def report_questions_list(self, request, pk=None):
        day = Day.objects.get(pk=pk)
        if not request.user.is_staff:
            if not accounts_models.UserCourse.objects.filter(user=request.user, course=day.week.course) or day.week.course.is_hidden:
                return Response({'detail': 'You do not have permission to perform this action.'}, status=401)
        report_questions = ReportQuestion.objects.filter(day=day)
        return Response(ReportQuestionSerializer(report_question).data for report_question in report_questions)
