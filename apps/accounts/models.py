from django.contrib.auth import models as auth_models
from django.db import models

from apps.courses.models import Day, Week, Course


class User(auth_models.AbstractUser):
    pass


class UserCourse(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class UserWeek(models.Model):
    week = models.ForeignKey(Week, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class UserDay(models.Model):
    day = models.ForeignKey(Day, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
