# Generated by Django 3.2.6 on 2021-08-29 22:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_alter_user_options'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userweek',
            name='user',
        ),
        migrations.RemoveField(
            model_name='userweek',
            name='week',
        ),
        migrations.DeleteModel(
            name='UserDay',
        ),
        migrations.DeleteModel(
            name='UserWeek',
        ),
    ]
