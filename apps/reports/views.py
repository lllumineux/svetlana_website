import json

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.courses import models as courses_models
from apps.accounts import serializers as accounts_serializers
from apps.reports import serializers, models
from apps.reports.helpers.functions import get_full_report_serialized


class ReportQuestionViewSet(viewsets.ModelViewSet):
    queryset = models.ReportQuestion.objects.all()
    serializer_class = serializers.ReportQuestionSerializer


class ReportViewSet(viewsets.ModelViewSet):
    queryset = models.Report.objects.all()
    serializer_class = serializers.ReportSerializer

    def create(self, request, *args, **kwargs):
        new_report = models.Report(user=request.user, day=courses_models.Day.objects.get(pk=request.data["day_id"]))
        new_report.save()

        for key, val in request.data.items():
            if "report_item" in key:
                report_item = json.loads(val)
                report_question = models.ReportQuestion(pk=report_item["question_id"])
                new_report_item = models.ReportItem(question=report_question, answer=report_item["answer_text"],
                                                    report=new_report)
                new_report_item.save()

        return Response(get_full_report_serialized(new_report))

    def list(self, request, *args, **kwargs):
        reports_serialized = [get_full_report_serialized(report) for report in models.Report.objects.all()]
        return Response(reports_serialized)

    @action(methods=['GET'], detail=False)
    def report_by_day_id(self, request):
        report_day = courses_models.Day.objects.get(pk=request.query_params["day_id"])
        reports = models.Report.objects.filter(user=request.user, day=report_day)

        if not reports:
            return Response({})

        return Response(get_full_report_serialized(reports[0]))


class ReportItemViewSet(viewsets.ModelViewSet):
    queryset = models.ReportItem.objects.all()
    serializer_class = serializers.ReportItemSerializer

    def create(self, request, *args, **kwargs):
        report_question = models.ReportQuestion(pk=request.data["question_id"])
        report = models.Report(pk=request.data["report_id"])
        new_report_item = models.ReportItem(question=report_question, answer=request.data["answer_text"], report=report)
        new_report_item.save()
        return Response()
