# Generated by Django 3.2.6 on 2021-08-26 12:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0009_alter_course_background_img'),
        ('reports', '0004_auto_20210813_0307'),
    ]

    operations = [
        migrations.AddField(
            model_name='report',
            name='day',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='courses.day'),
        ),
    ]