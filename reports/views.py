from rest_framework import viewsets
from reports import models, serializers


class ReportQuestionViewSet(viewsets.ModelViewSet):
    queryset = models.ReportQuestion.objects.all()
    serializer_class = serializers.ReportQuestionSerializer


class ReportViewSet(viewsets.ModelViewSet):
    queryset = models.Report.objects.all()
    serializer_class = serializers.ReportSerializer


class ReportItemViewSet(viewsets.ModelViewSet):
    queryset = models.ReportItem.objects.all()
    serializer_class = serializers.ReportItemSerializer
