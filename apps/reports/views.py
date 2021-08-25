from rest_framework import viewsets
from rest_framework.response import Response

from apps.reports import serializers, models


class ReportQuestionViewSet(viewsets.ModelViewSet):
    queryset = models.ReportQuestion.objects.all()
    serializer_class = serializers.ReportQuestionSerializer


class ReportViewSet(viewsets.ModelViewSet):
    queryset = models.Report.objects.all()
    serializer_class = serializers.ReportSerializer

    def create(self, request, *args, **kwargs):
        new_report = models.Report(user=request.user)
        new_report.save()
        return Response(serializers.ReportSerializer(new_report).data)


class ReportItemViewSet(viewsets.ModelViewSet):
    queryset = models.ReportItem.objects.all()
    serializer_class = serializers.ReportItemSerializer

    def create(self, request, *args, **kwargs):
        question = models.ReportQuestion(pk=request.data["question_id"])
        report = models.Report(pk=request.data["report_id"])
        new_report_item = models.ReportItem(question=question, answer=request.data["answer_text"], report=report)
        new_report_item.save()
        return Response()
