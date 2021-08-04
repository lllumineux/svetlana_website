from django.contrib import admin
from accounts import models

admin.site.register(models.User)
admin.site.register(models.UserCourse)
admin.site.register(models.UserWeek)
admin.site.register(models.UserDay)
