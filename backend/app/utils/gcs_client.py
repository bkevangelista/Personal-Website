import requests
from typing import Optional
from app.core.config import Config
from fastapi import FastAPI, Response
import urllib.parse

app = FastAPI()

BASE_URL = "https://storage.googleapis.com"

def list_bucket_files() -> list[str]:
    """
    Fetches a list of files in a folder (prefix) in a GCS bucket.
    If no prefix is provided, lists all files in the bucket.
    """
    url = f"{BASE_URL}/storage/v1/b/{Config.GCP_BUCKET_NAME}/o"
    params = { "key": Config.GCP_API_KEY }

    response = requests.get(url, params=params)
    response.raise_for_status()

    return response.json().get("items", [])

def get_file_from_bucket(file_name: str, prefix: Optional[str] = None):
    path_to_file = f"{prefix}/{file_name}" if prefix is not None else file_name
    encoded_path = urllib.parse.quote(path_to_file, safe="")

    url = f"{BASE_URL}/download/storage/v1/b/{Config.GCP_BUCKET_NAME}/o/{encoded_path}?alt=media"

    params = { "key": Config.GCP_API_KEY }

    response = requests.get(url, params=params, stream=True)
    response.raise_for_status()

    print(response)

    content_type = response.headers.get("Content-Type", "application/octet-stream")
    headers = {"Content-Disposition": f"attachment; filename={file_name}"}

    return Response(
        content=response.content,
        media_type=content_type,
        headers=headers
    )
