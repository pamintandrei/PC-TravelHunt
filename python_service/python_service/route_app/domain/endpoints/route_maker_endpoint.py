import json
from django.http import HttpResponse
from route_app.domain.queries.get_requests import fetch_buildings_reviews
from route_app.domain.queries.route_maker import compute_likeability
from route_app.domain.queries.route_maker import bulk_compute_likeability_new_building

SUGGESTED_BUILDINGS = 4

def route_maker_endpoint(request):
    buildings, reviews = fetch_buildings_reviews(request.GET["username"])
    likeability = bulk_compute_likeability_new_building(buildings,reviews)
    buildings_id = []
    for i in range(SUGGESTED_BUILDINGS):
        buildings_id.append(max(likeability, key=likeability.get))
        likeability.pop(buildings_id[-1])
    response = HttpResponse(json.dumps(buildings_id))
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
    response.headers["Access-Control-Allow-Methods"] = "GET,PUT,POST,DELETE,OPTIONS"
    print(response)
    return response

