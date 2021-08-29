from django.contrib.auth import models as auth_models
from django.db import models

from apps.courses.models import Course


class User(auth_models.AbstractUser):
    pass


class UserCourse(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
