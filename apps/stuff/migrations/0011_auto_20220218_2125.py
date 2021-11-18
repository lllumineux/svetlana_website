# Generated by Django 3.2.6 on 2022-02-18 18:25

import apps.courses.helpers.functions
from django.db import migrations, models
import pathlib


class Migration(migrations.Migration):

    dependencies = [
        ('stuff', '0010_generalinfo_two_course_sale_value'),
    ]

    operations = [
        migrations.AlterField(
            model_name='generalinfo',
            name='greeting_video',
            field=models.FileField(null=True, upload_to=apps.courses.helpers.functions.UploadToPathAndRename(pathlib.PurePosixPath('/Users/suleimanov/Projects/svetlana_website/apps/frontend/src/uploads'))),
        ),
        migrations.AlterField(
            model_name='screenshot',
            name='content',
            field=models.ImageField(upload_to=apps.courses.helpers.functions.UploadToPathAndRename(pathlib.PurePosixPath('/Users/suleimanov/Projects/svetlana_website/apps/frontend/src/uploads'))),
        ),
    ]
