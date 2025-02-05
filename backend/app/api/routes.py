from fastapi import APIRouter
from app.utils.gcs_client import list_files

router = APIRouter()

@router.get("/list")
def get_files():
    return list_files()