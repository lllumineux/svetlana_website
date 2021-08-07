import os

from django.db import models
from tinymce import models as tinymce_models

from apps.courses.helpers.functions import UploadToPathAndRename


class Course(models.Model):
    name = models.CharField(max_length=256, default='')
    short_description = models.CharField(max_length=340, default='')
    full_description = tinymce_models.HTMLField()
    price1 = models.IntegerField(default=0)
    price2 = models.IntegerField(default=0)
    background_img = models.ImageField(upload_to=UploadToPathAndRename(str(os.path.join('apps', 'frontend', 'static'))))
    is_hidden = models.BooleanField(default=True)


class Week(models.Model):
    number = models.IntegerField()
    short_description = models.TextField(default='')
    course = models.ForeignKey(Course, on_delete=models.CASCADE)

    class Meta:
        ordering = ('number', )


class Day(models.Model):
    number = models.IntegerField()
    name = models.CharField(max_length=256, default='')
    short_description = models.TextField(default='')
    content = tinymce_models.HTMLField(default='')
    week = models.ForeignKey(Week, on_delete=models.CASCADE)

    class Meta:
        ordering = ('number', )
