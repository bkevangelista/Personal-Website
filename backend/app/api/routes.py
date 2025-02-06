from fastapi import APIRouter
from app.utils.gcs_client import list_files

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
@router.get(f"{gcpBaseEndpoint}/list")
def get_files():
    return list_files()