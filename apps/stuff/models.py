import os

from django.db import models

from apps.stuff.helpers import models as help_models
from apps.stuff.helpers.functions import process_number


class Number(models.Model):
    text = models.CharField(max_length=32)


class Screenshot(models.Model):
    content = models.ImageField()


class GeneralInfo(help_models.SingletonModel):
    about_me_list = models.TextField(default='', blank=True)  # string format: text1;text2;text3;...
    greeting_video = models.FileField(blank=True, null=True)
    psychological_consultation_description = models.TextField(default='', blank=True)
    whatsapp_number = models.CharField(max_length=32, default='', blank=True)
    instagram_alias = models.CharField(max_length=32, default='', blank=True)
    main_page_numbers_form_text = models.TextField(default='', blank=True)
    two_course_sale_value = models.IntegerField(default=100)

    @property
    def whatsapp_link(self):
        return f"https://wa.me/{process_number(self.whatsapp_number)}/"

    @property
    def instagram_link(self):
        return f"https://www.instagram.com/{self.instagram_alias}/"
