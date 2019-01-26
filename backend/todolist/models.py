# -*- coding:utf-8 -*-

from django.db import models

# Create your models here.

class Todo(models.Model):
    title = models.CharField(max_length=500)
    date = models.CharField(max_length=100)
    priority = models.CharField(max_length=1)

    def __str__(self):
        return self.title
