import uuid
from django.core.validators import RegexValidator
from django.db import models


class HexIdField(models.CharField):
    default_validators = [RegexValidator(r"^[0-9A-Fa-f]+$")]

    def __init__(self, *args, **kwargs):
        kwargs["max_length"] = 128
        super().__init__(*args, **kwargs)
        
def generate_uuid():
    """
    This function can be used as a model field's default value, such as:
        id = HexIdField(primary_key=True, default=generate_uuid)
    Django allows only top-level module functions to be used in field defaults so other solutions
    such as a lambda function would not work.
    """
    return uuid.uuid4().hex
