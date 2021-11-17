from rest_framework import serializers
from apps.courses import models
from apps.courses.models import Week, Day
from apps.reports.models import ReportQuestion


class CourseSerializer(serializers.ModelSerializer):
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        for i in range(1, 5):
            week = Week.objects.create(number=i, course=response)
            for c in range(1, 8):
                day = Day.objects.create(number=c, week=week)
                for z in range(1, 6):
                    ReportQuestion.objects.create(number=z, day=day)
        return response

    class Meta:
        model = models.Course
        fields = '__all__'


class WeekSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Week
        fields = '__all__'


class DaySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Day
        fields = '__all__'
