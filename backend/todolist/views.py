# -*- coding:utf-8 -*-
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from todolist.serializers import TodoSerializer
from .models import Todo
    
@api_view(['GET'])
def todo_list(request):
    '''
    此时request 才是 rest-framework中的request对象
    没有包装的是django的HttpRequest
    '''
    if request.method == 'GET':
        types = request.query_params.get('type', False)
        if (types =='True' or types=='true'):
            types = '1'
        else:
            types = '0'
        todos = Todo.objects.filter(done=types)
        pg = PageNumberPagination()
        page_todos = pg.paginate_queryset(queryset=todos,request=request)
        serializer = TodoSerializer(page_todos, many=True)
        return pg.get_paginated_response(serializer.data)
    else:
        # 405 方法不允许
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
    
@api_view(['PUT', 'DELETE'])
def todo_detail(request, pk):
    try:
        todo = Todo.objects.get(pk=pk)
    except Todo.DoesNotExist:
        return Response(status=404)

    if request.method == 'PUT':
        data = request.data
        serializer = TodoSerializer(todo, data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)

    elif request.method == 'DELETE':
        todo.delete()
        return Response(status=204)

@api_view(['PUT', 'POST'])
def todo(request):
    if request.method == 'PUT':
        id = request.data.get('id')
        try:
            todo = Todo.objects.get(pk=id)
        except Todo.DoesNotExist:
            return Response(status=404)
        data = {
            "done": True
        }
        serializer = TodoSerializer(todo, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)
    elif request.method == 'POST':
        serializer = TodoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    else:
        # 405 方法不允许
        return Response(status=405)