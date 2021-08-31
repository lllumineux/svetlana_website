import datetime
import json

from django.contrib.auth.models import AnonymousUser
from django.utils import timezone
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.courses import serializers
from apps.courses.helpers.functions import get_day_by_info, get_week_by_info
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

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        course = response.data
        course["is_locked"] = False
        response.data = course
        return response

    def retrieve(self, request, *args, **kwargs):
        course = self.get_object()
        if course.is_hidden and not request.user.is_staff:
            return Response({'detail': 'You do not have permission to perform this action.'}, status=401)
        return Response(self.get_serializer(course).data)

    def list(self, request, *args, **kwargs):
        courses = models.Course.objects.all()
        not_hidden_courses = list(filter(lambda x: not x.is_hidden, courses))

        if isinstance(request.user, (AnonymousUser,)):
            return Response([serializers.CourseSerializer(course).data for course in not_hidden_courses])

        elif not request.user.is_staff:
            unlocked_courses = [obj.course for obj in UserCourse.objects.filter(user=request.user)]
            courses_serialized = []
            for course in not_hidden_courses:
                course_serialized = serializers.CourseSerializer(course).data
                course_serialized["is_locked"] = course not in unlocked_courses
                courses_serialized.append(course_serialized)
            return Response(list(filter(lambda x: not x["is_locked"], courses_serialized)) + list(filter(lambda x: x["is_locked"], courses_serialized)))

        elif request.user.is_staff:
            courses_serialized = []
            for course in courses:
                course_serialized = serializers.CourseSerializer(course).data
                course_serialized["is_locked"] = False
                courses_serialized.append(course_serialized)
            return Response(courses_serialized)

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        course = response.data
        course["is_locked"] = False
        response.data = course
        return response

    def partial_update(self, request, *args, **kwargs):
        response = super().partial_update(request, *args, **kwargs)
        course = response.data
        course["is_locked"] = False
        response.data = course
        return response

    @action(methods=['PATCH'], detail=True, url_path='invert_visibility', permission_classes=(permissions.IsAdminUser,))
    def invert_course_visibility(self, request, pk=None):
        course = Course.objects.get(pk=pk)
        course.is_hidden = not course.is_hidden
        course.save()
        return Response()

    @action(methods=['GET'], detail=True, permission_classes=(permissions.IsAuthenticated,))
    def week_list(self, request, pk=None):
        course = Course.objects.get(pk=pk)
        weeks = Week.objects.filter(course=course)

        if request.user.is_staff:
            weeks_serialized = []
            for week in weeks:
                week_serialized = serializers.WeekSerializer(week).data
                week_serialized["is_locked"] = False
                weeks_serialized.append(week_serialized)
            return Response(weeks_serialized)

        if not accounts_models.UserCourse.objects.filter(user=request.user, course=course) or course.is_hidden:
            return Response({'detail': 'You do not have permission to perform this action.'}, status=401)

        weeks_serialized = []
        for week in weeks:
            week_serialized = serializers.WeekSerializer(week).data
            week_serialized["is_locked"] = not list(
                filter(
                    lambda x: x.day.week == week and x.activation_time <= timezone.now(),
                    accounts_models.UserDay.objects.filter(user=request.user)
                )
            )
            weeks_serialized.append(week_serialized)
        return Response(weeks_serialized)


class WeekViewSet(viewsets.ModelViewSet):
    queryset = models.Week.objects.all()
    serializer_class = serializers.WeekSerializer

    def get_permissions(self):
        if self.action in ['create', 'list', 'retrieve', 'update', 'partial_update', 'destroy']:
            permission_classes = (permissions.IsAdminUser,)
        else:
            permission_classes = (permissions.IsAuthenticated,)
        return [permission() for permission in permission_classes]

    @action(methods=['GET'], detail=False, permission_classes=(permissions.IsAuthenticated,))
    def week_by_info(self, request):
        week = get_week_by_info(request.query_params['course_id'], request.query_params['week_number'])
        if not request.user.is_staff:
            if not accounts_models.UserCourse.objects.filter(user=request.user, course=week.course) or week.course.is_hidden:
                return Response({'detail': 'You do not have permission to perform this action.'}, status=401)
        return Response(self.get_serializer(week).data)

    @action(methods=['GET'], detail=False, permission_classes=(permissions.IsAuthenticated,))
    def day_list(self, request):
        week = get_week_by_info(request.query_params['course_id'], request.query_params['week_number'])
        days = Day.objects.filter(week=week)

        if request.user.is_staff:
            days_serialized = []
            for day in days:
                day_serialized = serializers.DaySerializer(day).data
                day_serialized["is_locked"] = False
                days_serialized.append(day_serialized)
            return Response(days_serialized)

        if not accounts_models.UserCourse.objects.filter(user=request.user, course=week.course) or week.course.is_hidden:
            return Response({'detail': 'You do not have permission to perform this action.'}, status=401)

        days_serialized = []
        for day in days:
            day_serialized = serializers.DaySerializer(day).data
            day_serialized["is_locked"] = not list(
                filter(
                    lambda x: x.day == day and x.activation_time <= timezone.now(),
                    accounts_models.UserDay.objects.filter(user=request.user)
                )
            )
            days_serialized.append(day_serialized)
        return Response(days_serialized)


class DayViewSet(viewsets.ModelViewSet):
    queryset = models.Day.objects.all()
    serializer_class = serializers.DaySerializer

    def get_permissions(self):
        if self.action in ['get', 'list', 'create', 'update', 'partial_update', 'destroy']:
            permission_classes = (permissions.IsAdminUser,)
        else:
            permission_classes = (permissions.IsAuthenticated,)
        return [permission() for permission in permission_classes]

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        for key, val in request.data.items():
            if "report_question" in key:
                report_question = json.loads(val)
                report_question_to_update = ReportQuestion.objects.get(pk=report_question["id"])
                report_question_to_update.text = report_question["text"]
                report_question_to_update.save()
        return response

    @action(methods=['GET'], detail=False)
    def day_by_info(self, request):
        day = get_day_by_info(
            request.query_params['course_id'],
            request.query_params['week_number'],
            request.query_params['day_number']
        )

        if not request.user.is_staff:
            if not accounts_models.UserCourse.objects.filter(user=request.user, course=day.week.course) or day.week.course.is_hidden:
                return Response({'detail': 'You do not have permission to perform this action.'}, status=401)

        return Response(serializers.DaySerializer(day).data)

    @action(methods=['GET'], detail=False)
    def report_questions_list(self, request):
        day = get_day_by_info(
            request.query_params['course_id'],
            request.query_params['week_number'],
            request.query_params['day_number']
        )

        if not request.user.is_staff:
            if not accounts_models.UserCourse.objects.filter(user=request.user, course=day.week.course) or day.week.course.is_hidden:
                return Response({'detail': 'You do not have permission to perform this action.'}, status=401)
        report_questions = ReportQuestion.objects.filter(day=day)
        return Response(ReportQuestionSerializer(report_question).data for report_question in report_questions)
