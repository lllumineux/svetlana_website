from django.db import models
from tinymce import models as tinymce_models

from apps.courses.helpers.functions import UploadToPathAndRename


class Course(models.Model):
    name = models.CharField(max_length=256)
    short_description = models.CharField(max_length=340)
    full_description = tinymce_models.HTMLField()
    price1 = models.IntegerField()
    price2 = models.IntegerField()
    background_img = models.ImageField()
    is_hidden = models.BooleanField(default=True)


class Week(models.Model):
    number = models.IntegerField()
    short_description = models.TextField(default='Краткое описание недели')
    course = models.ForeignKey(Course, on_delete=models.CASCADE)

    class Meta:
        ordering = ('number', )


class Day(models.Model):
    number = models.IntegerField()
    name = models.CharField(max_length=256, default='Название занятия')
    short_description = models.TextField(default='Краткое описание занятия')
    content = tinymce_models.HTMLField(blank=True, null=True)
    week = models.ForeignKey(Week, on_delete=models.CASCADE)

    class Meta:
        ordering = ('number', )
