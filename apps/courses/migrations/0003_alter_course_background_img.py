# Generated by Django 3.2.6 on 2021-08-05 18:00

import apps.courses.helpers.functions
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0002_alter_course_background_img'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='background_img',
            field=models.ImageField(upload_to=apps.courses.helpers.functions.UploadToPathAndRename('apps\\frontend\\static')),
        ),
    ]
