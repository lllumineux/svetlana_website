# Generated by Django 3.2.6 on 2021-08-26 12:15

import apps.courses.helpers.functions
from django.db import migrations, models
import pathlib


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0008_auto_20210813_0351'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='background_img',
            field=models.ImageField(upload_to=apps.courses.helpers.functions.UploadToPathAndRename(pathlib.PureWindowsPath('C:/Users/lllum/Projects/svetlana_website/apps/frontend/src/uploads'))),
        ),
    ]
