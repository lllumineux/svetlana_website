# Generated by Django 3.2.6 on 2021-08-27 06:17

import apps.courses.helpers.functions
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('stuff', '0006_auto_20210826_1515'),
    ]

    operations = [
        migrations.AlterField(
            model_name='generalinfo',
            name='greeting_video',
            field=models.FileField(null=True, upload_to=apps.courses.helpers.functions.UploadToPathAndRename('/static/')),
        ),
        migrations.AlterField(
            model_name='screenshot',
            name='content',
            field=models.ImageField(upload_to=apps.courses.helpers.functions.UploadToPathAndRename('/static/')),
        ),
    ]
