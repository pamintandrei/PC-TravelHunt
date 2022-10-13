from django.db import models


from route_app.data.django_aux.model_fields import generate_uuid
from route_app.data.django_aux.model_fields import HexIdField


class Route(models.Model):
    id = HexIdField(primary_key=True, default=generate_uuid)

    def __str__(self):
        return self.name
