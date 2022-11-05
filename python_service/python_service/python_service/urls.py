
from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from rest_framework import routers, serializers, viewsets
from route_app.domain.endpoints.test_endpoint import test_endpoint


urlpatterns = [
    url(r"^test", test_endpoint),
]

router = routers.DefaultRouter()
