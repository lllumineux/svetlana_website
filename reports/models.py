from django.db import models

from courses.models import Day
from users.models import BasicUser


class ReportQuestion(models.Model):
    number = models.IntegerField()
    text = models.CharField(max_length=256, default='')
    day = models.ForeignKey(Day, on_delete=models.CASCADE)


class Report(models.Model):
    upload_time = models.DateTimeField()
    user = models.ForeignKey(BasicUser, on_delete=models.CASCADE)


class ReportItem(models.Model):
    question = models.ForeignKey(ReportQuestion, on_delete=models.CASCADE)
    number = question.number
    answer = models.TextField(default='')
    report = models.ForeignKey(Report, on_delete=models.CASCADE)
