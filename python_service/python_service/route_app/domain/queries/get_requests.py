import json    
from requests import get
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

    data = get(*args, **kwargs)
    # Support APIs that return nothing on success
    return data.json() if data.content != b"" else None
