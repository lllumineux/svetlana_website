# Generated by Django 3.2.6 on 2021-08-04 11:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('courses', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Report',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('upload_time', models.DateTimeField()),
            ],
            options={
                'ordering': ('-upload_time',),
            },
        ),
        migrations.CreateModel(
            name='ReportQuestion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.IntegerField()),
                ('text', models.CharField(default='', max_length=256)),
                ('day', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='courses.day')),
            ],
            options={
                'ordering': ('number',),
            },
        ),
        migrations.CreateModel(
            name='ReportItem',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('answer', models.TextField(default='')),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='reports.reportquestion')),
                ('report', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='reports.report')),
            ],
            options={
                'ordering': ('question',),
            },
        ),
    ]