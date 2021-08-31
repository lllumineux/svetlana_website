import datetime
import json

import pytz
from django.utils import timezone
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response

from apps.courses import models as courses_models
from apps.courses.helpers.functions import get_next_day
from apps.reports import serializers, models
from apps.accounts import models as accounts_models
from apps.reports.helpers.functions import get_full_report_serialized


class ReportQuestionViewSet(viewsets.ModelViewSet):
    queryset = models.ReportQuestion.objects.all()
    serializer_class = serializers.ReportQuestionSerializer
    permission_classes = (permissions.IsAdminUser,)


class ReportViewSet(viewsets.ModelViewSet):
    queryset = models.Report.objects.all()
    serializer_class = serializers.ReportSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve', 'update', 'partial_update', 'destroy']:
            permission_classes = (permissions.IsAdminUser,)
        else:
            permission_classes = (permissions.IsAuthenticated,)
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        if not request.user.is_staff:
            if not accounts_models.UserCourse.objects.filter(
                user=request.user,
                course=courses_models.Course.objects.get(pk=request.data["course_id"])
            ):
                return Response({'detail': 'You do not have permission to perform this action.'}, status=401)

        day = courses_models.Day.objects.get(pk=request.data["day_id"])

        new_report = models.Report(user=request.user, day=day)
        new_report.save()

        next_day = get_next_day(day)
        if next_day:
            now = datetime.datetime.now(tz=pytz.timezone('Europe/Moscow'))
            if 0 <= now.hour <= 4:
                user_day_activation_time = now
            else:
                tomorrow = now + datetime.timedelta(days=1)
                tomorrow = tomorrow.replace(hour=0)
                tomorrow = tomorrow.replace(minute=0)
                tomorrow = tomorrow.replace(second=0)
                tomorrow = tomorrow.replace(microsecond=0)
                user_day_activation_time = tomorrow
            user_day = accounts_models.UserDay(
                user=request.user,
                day=get_next_day(day),
                activation_time=user_day_activation_time
            )
            user_day.save()

        for key, val in request.data.items():
            if "report_item" in key:
                report_item = json.loads(val)
                report_question = models.ReportQuestion(pk=report_item["question_id"])
                new_report_item = models.ReportItem(question=report_question, answer=report_item["answer_text"], report=new_report)
                new_report_item.save()

        return Response(get_full_report_serialized(new_report))

    def list(self, request, *args, **kwargs):
        reports_serialized = [get_full_report_serialized(report) for report in models.Report.objects.all()]
        return Response(reports_serialized)

    @action(methods=['GET'], detail=False)
    def report_by_day_id(self, request):
        report_day = courses_models.Day.objects.get(pk=request.query_params["day_id"])
        if not request.user.is_staff:
            if not accounts_models.UserCourse.objects.filter(user=request.user, course=report_day.week.course) or report_day.week.course.is_hidden:
                return Response({'detail': 'You do not have permission to perform this action.'}, status=401)

        reports = models.Report.objects.filter(user=request.user, day=report_day)
        if not reports:
            return Response({})

        return Response(get_full_report_serialized(reports[0]))


class ReportItemViewSet(viewsets.ModelViewSet):
    queryset = models.ReportItem.objects.all()
    serializer_class = serializers.ReportItemSerializer
    permission_classes = (permissions.IsAdminUser,)
