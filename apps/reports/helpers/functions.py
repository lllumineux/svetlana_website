from apps.reports import serializers, models
from apps.accounts import models as accounts_models, serializers as accounts_serializers


def get_full_report_serialized(report):
    report_serialized = serializers.ReportSerializer(report).data
    report_serialized["user"] = accounts_serializers.UserSerializer(accounts_models.User.objects.get(pk=report_serialized["user"])).data
    report_serialized["items"] = []

    for report_item in models.ReportItem.objects.filter(report=report):
        report_item_serialized = serializers.ReportItemSerializer(report_item).data
        report_item_serialized["question"] = serializers.ReportQuestionSerializer(report_item.question).data
        report_serialized["items"].append(report_item_serialized)

    return report_serialized



