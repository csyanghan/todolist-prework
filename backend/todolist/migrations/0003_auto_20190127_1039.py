# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todolist', '0002_todo_done'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='done',
            field=models.BooleanField(default=False),
        ),
    ]
