# Generated by Django 3.1.2 on 2022-02-01 14:31

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cliquizAPI', '0015_auto_20220201_1957'),
    ]

    operations = [
        migrations.RenameField(
            model_name='test',
            old_name='test_id',
            new_name='testid',
        ),
    ]
