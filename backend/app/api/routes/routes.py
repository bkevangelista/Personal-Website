from fastapi import APIRouter
from app.utils.gcs_client import (
    list_bucket_files,
    get_file_from_bucket,
)
from typing import Optional

router = APIRouter()

'''
Base APIs
'''
@router.get("/")
def landing_api():
    return {"message": "Welcome to Branden Evangelista's API suite for his personal website!"}

@router.get("/health")
def health_check():
    return {"message": "Health check returned successful response!"}

'''
APIs for GCP Cloud Storage
'''
gcpBaseEndpoint = "/external/gcp/cloudStorage"

@router.get(f"{gcpBaseEndpoint}/bucket/{{bucket_name}}")
def list_files(bucket_name: str = "be-website-public"):
    return list_bucket_files(bucket_name)

@router.get(f"{gcpBaseEndpoint}/file")
def get_file(bucket_name: str, file_name: str, prefix: Optional[str] = None):
    return get_file_from_bucket(bucket_name, file_name, prefix)
