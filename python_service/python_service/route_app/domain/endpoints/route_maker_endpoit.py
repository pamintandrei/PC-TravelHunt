import json
from django.http import HttpResponse

def route_maker_endpoint(request):
    return HttpResponse(json.dumps([
            {
                "username": "Hiparh",
                "review" : "3",
                "building_id" : "1",
            },
            {
                "username": "Hiparh but funny",
                "review" : "7",
                "building_id" : "1",
            },
            {
                "username": "Hiparh but passed ED",
                "review" : "5",
                "building_id" : "1",
            },
            {
                "username": "Hiparh but passed ED",
                "review" : "3",
                "building_id" : "1",
            },
            {
                "username": "Hiparh but passed ED",
                "review" : "10",
                "building_id" : "2",
            }]))
