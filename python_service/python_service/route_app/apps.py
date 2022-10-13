from django.apps import AppConfig
from importlib import import_module


class RouteAppConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'route_app'
    def import_models(self):
        self.models_module = import_module(f"{self.name}.data.models")
        self.models = self.apps.all_models[self.label]
