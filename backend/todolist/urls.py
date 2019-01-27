from django.conf.urls import url;

from . import views

urlpatterns = [
    url('^todolist/$', views.todo_list),
    url('^todo/(?P<pk>[0-9]+)/$', views.todo_detail),
    url('^todo/$', views.todo),
]
