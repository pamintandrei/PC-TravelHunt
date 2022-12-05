
from django.contrib import admin
from django.urls import path, re_path
from rest_framework import routers, serializers, viewsets
from route_app.domain.endpoints.test_endpoint import test_endpoint_reviews
from route_app.domain.endpoints.test_endpoint import test_endpoint_buildings
from route_app.domain.endpoints.route_maker_endpoint import route_maker_endpoint

urlpatterns = [
    re_path(r"^review", test_endpoint_reviews),
    re_path(r"^buildings", test_endpoint_buildings),
    re_path(r"^route", route_maker_endpoint),
]

router = routers.DefaultRouter()
