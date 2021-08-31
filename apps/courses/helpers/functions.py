import os
from uuid import uuid4
from django.utils.deconstruct import deconstructible

from apps.courses import models


@deconstructible
class UploadToPathAndRename(object):

    def __init__(self, path):
        self.sub_path = path

    def __call__(self, instance, filename):
        ext = filename.split('.')[-1]
        filename = '{}.{}'.format(uuid4().hex, ext)
        return os.path.join(self.sub_path, filename)


def get_next_day(day):
    week = day.week
    course = week.course

    if week.number == 4 and day.number == 7:
        return None

    if day.number < 7:
        return models.Day.objects.get(number=day.number+1, week=week)

    else:
        next_week = models.Week.objects.get(number=week.number+1, course=course)
        return models.Day.objects.get(number=1, week=next_week)


def get_first_course_day(course):
    first_week = models.Week.objects.get(course=course, number=1)
    return models.Day.objects.get(week=first_week, number=1)
