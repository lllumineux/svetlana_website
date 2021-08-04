from django.db import models
from apps.others.helpers import models as help_models


class Number(models.Model):
    text = models.CharField(max_length=32, default='')


class Screenshot(models.Model):
    content = models.FileField(upload_to='general_files')


class GeneralInfo(help_models.SingletonModel):
    about_me_list = models.TextField(default='')  # string format: text1;text2;text3;...
    greeting_video = models.FileField(upload_to='general_files')
    psychological_consultation_description = models.TextField(default='')
    whatsapp_number = models.CharField(max_length=32, default='')
    instagram_alias = models.CharField(max_length=32, default='')
    main_page_numbers_form_label = models.TextField(default='')
