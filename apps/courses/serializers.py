from rest_framework import serializers
from apps.courses import models
from apps.courses.models import Week, Day


class CourseSerializer(serializers.ModelSerializer):
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        for i in range(1, 5):
            week = Week.objects.create(number=i, course=response)
            for c in range(1, 8):
                Day.objects.create(number=c, week=week)
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
