# Generated by Django 3.1.2 on 2021-12-01 11:56

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('cliquizAPI', '0003_auto_20211201_1712'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='course_code',
            field=models.UUIDField(default=uuid.UUID('42d75ff1-3d01-4725-8472-dad3a1841a4e'), editable=False),
        ),
    ]
