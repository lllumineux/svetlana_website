from django.contrib import admin
from apps.reports import models

admin.site.register(models.ReportQuestion)
admin.site.register(models.Report)
admin.site.register(models.ReportItem)
