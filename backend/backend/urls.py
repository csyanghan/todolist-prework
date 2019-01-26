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
from django.contrib import admin
from rest_framework import routers
from todolist import views

router = routers.DefaultRouter()
router.register(r'users', views.UserViewSet)
router.register(r'groups', views.GroupViewSet)

# 使用自动URL路由连接我们的API。
# 另外，我们还包括支持浏览器浏览API的登录URL。
urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include('todolist.urls')),
]
