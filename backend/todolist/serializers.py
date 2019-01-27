# -*- coding:utf-8 -*-
from rest_framework import serializers
from . import models

class TodoSerializer(serializers.ModelSerializer):
    # ModelSerializer 只是创建序列化器类的快捷方式，默认简单实现的create()和update()方法。
    class Meta:
        model = models.Todo
        fields = ('id', 'title', 'date', 'priority', 'done')
