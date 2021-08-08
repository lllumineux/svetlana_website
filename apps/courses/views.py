from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from django.core import serializers as django_serializer

from apps.courses import serializers
from apps.courses import models
from apps.courses.models import Course, Week


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


class DayViewSet(viewsets.ModelViewSet):
    queryset = models.Day.objects.all()
    serializer_class = serializers.DaySerializer
