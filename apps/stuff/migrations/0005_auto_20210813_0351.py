# Generated by Django 3.2.6 on 2021-08-12 23:51

import apps.courses.helpers.functions
from django.db import migrations, models
import pathlib


class Migration(migrations.Migration):

    dependencies = [
        ('stuff', '0004_rename_main_page_numbers_form_label_generalinfo_main_page_numbers_form_text'),
    ]

    operations = [
        migrations.AlterField(
            model_name='generalinfo',
            name='about_me_list',
            field=models.TextField(blank=True, default=''),
        ),
        migrations.AlterField(
            model_name='generalinfo',
            name='greeting_video',
            field=models.FileField(null=True, upload_to=apps.courses.helpers.functions.UploadToPathAndRename(pathlib.PureWindowsPath('C:/Users/lllum.DESKTOP-LFBCELC/Desktop/svetlana_website/apps/frontend/src/uploads'))),
        ),
        migrations.AlterField(
            model_name='generalinfo',
            name='instagram_alias',
            field=models.CharField(blank=True, default='', max_length=32),
        ),
        migrations.AlterField(
            model_name='generalinfo',
            name='main_page_numbers_form_text',
            field=models.TextField(blank=True, default=''),
        ),
        migrations.AlterField(
            model_name='generalinfo',
            name='psychological_consultation_description',
            field=models.TextField(blank=True, default=''),
        ),
        migrations.AlterField(
            model_name='generalinfo',
            name='whatsapp_number',
            field=models.CharField(blank=True, default='', max_length=32),
        ),
        migrations.AlterField(
            model_name='number',
            name='text',
            field=models.CharField(max_length=32),
        ),
        migrations.AlterField(
            model_name='screenshot',
            name='content',
            field=models.ImageField(upload_to=apps.courses.helpers.functions.UploadToPathAndRename(pathlib.PureWindowsPath('C:/Users/lllum.DESKTOP-LFBCELC/Desktop/svetlana_website/apps/frontend/src/uploads'))),
        ),
    ]
