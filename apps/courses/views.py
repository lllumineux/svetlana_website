from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.courses import serializers
from apps.courses import models
from apps.courses.models import Course


class CourseViewSet(viewsets.ModelViewSet):
    queryset = models.Course.objects.all()
    serializer_class = serializers.CourseSerializer

    @action(methods=['PATCH'], detail=True, url_path='invert_visibility')
    def invert_course_visibility(self, request, pk=None):
        obj = Course.objects.get(pk=pk)
        obj.is_hidden = not obj.is_hidden
        obj.save()
        return Response({'status': 'course visibility changed'})


class WeekViewSet(viewsets.ModelViewSet):
    queryset = models.Week.objects.all()
    serializer_class = serializers.WeekSerializer


class DayViewSet(viewsets.ModelViewSet):
    queryset = models.Day.objects.all()
    serializer_class = serializers.DaySerializer
