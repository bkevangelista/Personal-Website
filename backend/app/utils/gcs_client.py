import requests
from app.core.config import Config

BASE_URL = "https://storage.googleapis.com/storage/v1"

def list_files() -> list[str]:
    """
    Fetches a list of files in a folder (prefix) in a GCS bucket.
    If no prefix is provided, lists all files in the bucket.
    """
    url = f"{BASE_URL}/b/{Config.GCP_BUCKET_NAME}/o"
    print(url)
    params = { "key": Config.GCP_API_KEY }

    response = requests.get(url, params=params)
    response.raise_for_status()

    return response.json().get("items", [])