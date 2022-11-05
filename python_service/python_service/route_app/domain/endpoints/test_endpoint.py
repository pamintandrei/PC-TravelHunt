import json
from django.http import HttpResponse

def test_endpoint(request):
    return HttpResponse(json.dumps({"test":"yes"}))