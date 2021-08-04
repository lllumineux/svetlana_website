from django.contrib import admin
from courses import models

admin.site.register(models.Course)
admin.site.register(models.Week)
admin.site.register(models.Day)
