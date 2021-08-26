import json

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.courses import serializers
from apps.reports.serializers import ReportQuestionSerializer
from apps.courses import models
from apps.courses.models import Course, Week, Day
from apps.accounts.models import UserCourse
from apps.reports.models import ReportQuestion


class CourseViewSet(viewsets.ModelViewSet):
    queryset = models.Course.objects.all()
    serializer_class = serializers.CourseSerializer

    def list(self, request, *args, **kwargs):
        courses = models.Course.objects.all()
        if not request.user.is_staff:
            courses = list(filter(lambda x: not x.is_hidden, [obj.course for obj in UserCourse.objects.filter(user=request.user)]))
        return Response([serializers.CourseSerializer(course).data for course in courses])

    @action(methods=['PATCH'], detail=True, url_path='invert_visibility')
    def invert_course_visibility(self, request, pk=None):
        course = Course.objects.get(pk=pk)
        course.is_hidden = not course.is_hidden
        course.save()
        return Response()

    @action(methods=['GET'], detail=True)
    def week_list(self, request, pk=None):
        course = Course.objects.get(pk=pk)
        weeks = Week.objects.filter(course=course)
        return Response(serializers.WeekSerializer(week).data for week in weeks)


class WeekViewSet(viewsets.ModelViewSet):
    queryset = models.Week.objects.all()
    serializer_class = serializers.WeekSerializer

    @action(methods=['GET'], detail=True)
    def day_list(self, request, pk=None):
        week = Week.objects.get(pk=pk)
        days = Day.objects.filter(week=week)
        return Response(serializers.DaySerializer(day).data for day in days)


class DayViewSet(viewsets.ModelViewSet):
    queryset = models.Day.objects.all()
    serializer_class = serializers.DaySerializer

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
        report_questions = ReportQuestion.objects.filter(day=day)
        return Response(ReportQuestionSerializer(report_question).data for report_question in report_questions)
