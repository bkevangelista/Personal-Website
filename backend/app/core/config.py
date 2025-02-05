import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

class Config:
    GCP_API_KEY = os.getenv("GCP_API_KEY")
    GCP_PROJECT_ID = os.getenv("GCP_PROJECT_ID", "be-personal-website")
    GCP_BUCKET_NAME = os.getenv("GCP_BUCKET_NAME", "be-website-public")