import json    
from requests import get
from requests import post
from tenacity import Retrying
from tenacity import retry_never

NO_RETRY_RETRYER = Retrying(retry=retry_never)


def fetch_json(*args, **kwargs):
    # Encode data as a JSON string
    if "data" in kwargs:
        if type(kwargs["data"]) != str:
            kwargs["data"] = json.dumps(kwargs["data"])

    # Set headers to indicate that data is a JSON string
    kwargs.setdefault("headers", {})["content-type"] = "application/json"
    if kwargs.pop("server") == "java_server":
        authorization = post("http://127.0.0.1:8090/login", json={"username":"mirceap","password":"password"}).content
        kwargs.setdefault("headers")["Authorization"] = authorization

    data = get(*args, **kwargs)
    # Support APIs that return nothing on success
    return data.json() if data.content != b"" else None


def fetch_buildings_reviews(username):
    buildings = fetch_json("http://127.0.0.1:3000/Building", server="ts_server")["entry"]
    buildings = [building["resource"] for building in buildings]
    reviews = fetch_json(
        f"http://127.0.0.1:8090/reviews/owner?username={username}",
        server="java_server"
    )
    return buildings, reviews