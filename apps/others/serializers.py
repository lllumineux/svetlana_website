from rest_framework import serializers
from apps.others import models


class NumberSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Number
        fields = '__all__'


class ScreenshotSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Screenshot
        fields = '__all__'


class GeneralInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.GeneralInfo
        fields = '__all__'
