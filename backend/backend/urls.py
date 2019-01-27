# -*- coding:utf-8 -*-

# from django.conf.urls import include, url
# from django.contrib import admin

# urlpatterns = [
#     # Examples:
#     # url(r'^$', 'backend.views.home', name='home'),
#     # url(r'^blog/', include('blog.urls')),

#     url(r'^admin/', include(admin.site.urls)),
# ]

from django.conf.urls import url, include

urlpatterns = [
    url(r'^api/', include('todolist.urls')),
]
