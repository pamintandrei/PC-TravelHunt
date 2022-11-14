
from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from rest_framework import routers, serializers, viewsets
from route_app.domain.endpoints.test_endpoint import test_endpoint_reviews
from route_app.domain.endpoints.test_endpoint import test_endpoint_buildings
from route_app.domain.endpoints.route_maker_endpoint import route_maker_endpoint

urlpatterns = [
    url(r"^review", test_endpoint_reviews),
    url(r"^buildings", test_endpoint_buildings),
    url(r"^route", route_maker_endpoint),
]

router = routers.DefaultRouter()
