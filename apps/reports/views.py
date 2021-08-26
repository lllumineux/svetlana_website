from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.courses import models as courses_models
from apps.accounts import serializers as accounts_serializers
from apps.reports import serializers, models


class ReportQuestionViewSet(viewsets.ModelViewSet):
    queryset = models.ReportQuestion.objects.all()
    serializer_class = serializers.ReportQuestionSerializer


class ReportViewSet(viewsets.ModelViewSet):
    queryset = models.Report.objects.all()
    serializer_class = serializers.ReportSerializer

    def create(self, request, *args, **kwargs):
        new_report = models.Report(user=request.user, day=courses_models.Day.objects.get(pk=request.data["day_id"]))
        new_report.save()
        return Response(serializers.ReportSerializer(new_report).data)

    def list(self, request, *args, **kwargs):
        reports = models.Report.objects.all()
        reports_serialized = []
        for report in reports:
            report_serialized = serializers.ReportSerializer(report).data
            report_items_serialized = []
            for report_item in models.ReportItem.objects.filter(report=report):
                report_item_serialized = serializers.ReportItemSerializer(report_item).data
                report_item_serialized["question"] = serializers.ReportQuestionSerializer(report_item.question).data
                report_items_serialized.append(report_item_serialized)
            report_serialized["items"] = report_items_serialized
            report_serialized["user"] = accounts_serializers.UserSerializer(report.user).data
            reports_serialized.append(report_serialized)
        return Response(reports_serialized)

    @action(methods=['GET'], detail=False)
    def report_by_day_id(self, request):
        report_day = courses_models.Day.objects.get(pk=request.query_params["day_id"])
        reports = models.Report.objects.filter(user=request.user, day=report_day)
        if not reports:
            return Response({})
        report = reports[0]
        report_serialized = serializers.ReportSerializer(report).data
        report_items_serialized = []
        for report_item in models.ReportItem.objects.filter(report=report):
            report_item_serialized = serializers.ReportItemSerializer(report_item).data
            report_item_serialized["question"] = serializers.ReportQuestionSerializer(report_item.question).data
            report_items_serialized.append(report_item_serialized)
        report_serialized["items"] = report_items_serialized
        return Response(report_serialized)


class ReportItemViewSet(viewsets.ModelViewSet):
    queryset = models.ReportItem.objects.all()
    serializer_class = serializers.ReportItemSerializer

    def create(self, request, *args, **kwargs):
        question = models.ReportQuestion(pk=request.data["question_id"])
        report = models.Report(pk=request.data["report_id"])
        new_report_item = models.ReportItem(question=question, answer=request.data["answer_text"], report=report)
        new_report_item.save()
        return Response()
