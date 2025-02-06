from fastapi.testclient import TestClient
from app.main import app
from unittest.mock import patch

client = TestClient(app)

@patch("app.api.routes.routes.get_files")
def test_get_files(mock_get_files):
    mock_files_return = [{"name": "file1.txt"}, {"name": "file2.pdf"}, {"name": "file3.txt"}]

    response = client.get("/external/gcp/cloudStorage/list")

    assert response.status_code == 200
    assert len(list(response.json())) == len(mock_files_return)