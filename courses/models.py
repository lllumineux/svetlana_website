from django.db import models
from tinymce import models as tinymce_models


class Course(models.Model):
    name = models.CharField(max_length=256, default='')
    short_description = models.TextField(default='')
    full_description = tinymce_models.HTMLField()
    price1 = models.IntegerField(default=0)
    price2 = models.IntegerField(default=0)
    background_img = models.ImageField(upload_to='general_files')


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
