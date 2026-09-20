import requests
import datetime
from typing import Optional
from fastapi import FastAPI, Response
from google.cloud import storage

app = FastAPI()

def _get_storage_client():
    return storage.Client()

def list_bucket_files(bucket_name: str = "be-website-public") -> list[str]:
    storage_client = _get_storage_client()
    bucket = storage_client.bucket(bucket_name)
    blobs = bucket.list_blobs()

    return [blob._properties for blob in blobs]

def get_file_from_bucket(bucket_name: str, file_name: str, prefix: Optional[str] = None):
    url = get_presigned_url_from_bucket(bucket_name, file_name, prefix)

    response = requests.get(url, stream=True)
    response.raise_for_status()

    content_type = response.headers.get("Content-Type", "application/octet-stream")
    headers = {"Content-Disposition": f"attachment; filename=\"{file_name}\""}

    return Response(
        content=response.content,
        media_type=content_type,
        headers=headers
    )

def get_presigned_url_from_bucket(bucket_name: str, file_name: str, prefix: Optional[str] = None):
    storage_client = _get_storage_client()
    bucket = storage_client.bucket(bucket_name)
    blob = bucket.blob(f"{prefix}/{file_name}")

    return blob.generate_signed_url(
        version="v4",
        expiration=datetime.timedelta(minutes=15),
        method="GET",
    )