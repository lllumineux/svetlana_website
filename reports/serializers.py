from rest_framework import serializers
from reports import models


class ReportQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ReportQuestion
        fields = '__all__'


class ReportSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Report
        fields = '__all__'


class ReportItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ReportItem
        fields = '__all__'
