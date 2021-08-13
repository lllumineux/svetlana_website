from django.db import models

from apps.courses.models import Day
from apps.accounts.models import User


class ReportQuestion(models.Model):
    number = models.IntegerField()
    text = models.CharField(max_length=256, default='', blank=True)
    day = models.ForeignKey(Day, on_delete=models.CASCADE)

    class Meta:
        ordering = ('number', )


class Report(models.Model):
    upload_time = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        ordering = ('-upload_time', )


class ReportItem(models.Model):
    question = models.ForeignKey(ReportQuestion, on_delete=models.CASCADE)
    answer = models.TextField(default='', blank=True)
    report = models.ForeignKey(Report, on_delete=models.CASCADE)

    class Meta:
        ordering = ('question', )
