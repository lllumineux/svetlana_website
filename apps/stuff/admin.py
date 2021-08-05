from django.contrib import admin
from apps.stuff import models

admin.site.register(models.Number)
admin.site.register(models.Screenshot)
admin.site.register(models.GeneralInfo)
