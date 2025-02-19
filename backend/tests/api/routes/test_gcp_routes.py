from fastapi.testclient import TestClient
from app.main import app
from unittest.mock import patch, MagicMock
from app.core.config import Config

from fastapi import Response

client = TestClient(app)
BASE_URL = "https://storage.googleapis.com"
params = { "key": Config.GCP_API_KEY }

@patch("requests.get")
def test_list_files(mock_list_files):
    mock_list_files.json.return_value = [{"name": "file1.txt"}, {"name": "file2.pdf"}, {"name": "file3.txt"}]

    response = client.get("/external/gcp/cloudStorage/list", params=params)

    assert response.status_code == 200
    mock_list_files.assert_called_once_with(f"{BASE_URL}/storage/v1/b/{Config.GCP_BUCKET_NAME}/o", params=params)

@patch("requests.get")
def test_get_file(mock_get_file):
    # Create a mock response object
    mock_response = MagicMock()
    mock_response.content = b"Mock file content"  # Ensure content is bytes
    mock_response.status_code = 200
    mock_response.headers = {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Branden_Evangelista_Resume.pdf"',
    }
    mock_response.raise_for_status = MagicMock()  # Prevents exceptions

    # Set the mock return value
    mock_get_file.return_value = mock_response

    mock_params = params | {"file_name": "Branden_Evangelista_Resume.pdf", "prefix": "resume"}

    response = client.get("/external/gcp/cloudStorage/get",
                          params=mock_params)

    assert response.status_code == 200
    assert response.headers["Content-Type"] == "application/pdf"