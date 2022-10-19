from django.db import models


from route_app.data.django_aux.model_fields import generate_uuid
from route_app.data.django_aux.model_fields import HexIdField


class Route(models.Model):
    id = HexIdField(primary_key=True, default=generate_uuid)
    # Holds the route in a json string
    # The string will have a list of ids of the buildings that need to be
    # visited ordered to facilitate travel (not one point in Marasti
    # and one in Manastur)
    route_path = models.CharField(max_length=200, blank=True)
    user_id = models.CharField(max_length=200, blank=True)
    def __str__(self):
        return self.route_path
