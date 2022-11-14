import json
from django.http import HttpResponse
from route_app.domain.queries.get_requests import fetch_buildings_reviews
from route_app.domain.queries.route_maker import compute_likeability
from route_app.domain.queries.route_maker import bulk_compute_likeability_new_building

SUGGESTED_BUILDINGS = 1

def route_maker_endpoint(request):
    buildings, reviews = fetch_buildings_reviews()
    likeability = bulk_compute_likeability_new_building(buildings,reviews)
    buildings_id = []
    for i in range(SUGGESTED_BUILDINGS):
        buildings_id.append(max(likeability, key=likeability.get))
        likeability.pop(buildings_id[-1])
    return HttpResponse(json.dumps(buildings_id))

