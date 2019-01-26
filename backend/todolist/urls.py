from django.conf.urls import url;

from . import views

urlpatterns = [
    url('', views.TodoList.as_view()),
    url('<int:pk>/', views.TodoTitle.as_view()),
]