import json
from django.http import HttpResponse

def test_endpoint_reviews(request):
    return HttpResponse(json.dumps([
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

def test_endpoint_buildings(request):
    return HttpResponse(json.dumps([
        {
            "id": "1",
            "information": "This building is a building the best one, a;is!this",
            "location": "120, 250",
        },
        {
            "id": "2",
            "information": "This building",
            "location": "120, 300",
        },
        {
            "id": "3",
            "information": "building",
            "location": "320, 150",
        }]))