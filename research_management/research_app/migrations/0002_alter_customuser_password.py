# Generated by Django 4.2.3 on 2023-09-19 17:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('research_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='password',
            field=models.CharField(max_length=128),
        ),
    ]