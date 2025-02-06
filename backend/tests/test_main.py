from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_app_base_api():
    response = client.get("/")
    assert response.status_code == 200

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200