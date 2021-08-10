from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.courses import serializers
from apps.courses import models
from apps.courses.models import Course, Week, Day
from apps.reports.models import ReportQuestion


class CourseViewSet(viewsets.ModelViewSet):
    queryset = models.Course.objects.all()
    serializer_class = serializers.CourseSerializer

    @action(methods=['PATCH'], detail=True, url_path='invert_visibility')
    def invert_course_visibility(self, request, pk=None):
        course = Course.objects.get(pk=pk)
        course.is_hidden = not course.is_hidden
        course.save()
        return Response({'status': 'course visibility changed'})

    @action(methods=['GET'], detail=True)
    def week_list(self, request, pk=None):
        course = Course.objects.get(pk=pk)
        weeks = Week.objects.filter(course=course)
        return Response(
            {
                'id': week.pk,
                'number': week.number,
                'short_description': week.short_description,
                'course': week.course.id,
            } for week in weeks
        )


class WeekViewSet(viewsets.ModelViewSet):
    queryset = models.Week.objects.all()
    serializer_class = serializers.WeekSerializer

    @action(methods=['GET'], detail=True)
    def day_list(self, request, pk=None):
        week = Week.objects.get(pk=pk)
        days = Day.objects.filter(week=week)
        return Response(
            {
                'id': day.pk,
                'number': day.number,
                'name': day.name,
                'short_description': day.short_description,
                'content': day.content,
                'week': day.week.id
            } for day in days
        )


class DayViewSet(viewsets.ModelViewSet):
    queryset = models.Day.objects.all()
    serializer_class = serializers.DaySerializer

    @action(methods=['GET'], detail=True)
    def report_questions_list(self, request, pk=None):
        day = Day.objects.get(pk=pk)
        report_questions = ReportQuestion.objects.filter(day=day)
        return Response(
            {
                'id': report_question.pk,
                'number': report_question.number,
                'text': report_question.text,
                'day_id': report_question.day.id
            } for report_question in report_questions
        )
