from django.contrib.auth.models import AbstractUser
from django.db import models

from courses.models import Day, Week, Course


class BasicUser(AbstractUser):
    pass


class UserCourse(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    user = models.ForeignKey(BasicUser, on_delete=models.CASCADE)


class UserWeek(models.Model):
    week = models.ForeignKey(Week, on_delete=models.CASCADE)
    user = models.ForeignKey(BasicUser, on_delete=models.CASCADE)


class UserDay(models.Model):
    day = models.ForeignKey(Day, on_delete=models.CASCADE)
    user = models.ForeignKey(BasicUser, on_delete=models.CASCADE)
