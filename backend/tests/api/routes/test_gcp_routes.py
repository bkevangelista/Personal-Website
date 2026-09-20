from fastapi.testclient import TestClient
from app.main import app
from unittest.mock import patch, MagicMock

from fastapi import Response

client = TestClient(app)

@patch("app.api.routes.routes.list_bucket_files")
def test_list_files(mock_list_bucket_files):
    fake_metadata = [
        {"kind": "storage#object", "name": "icons/home.png", "size": "1024"},
        {"kind": "storage#object", "name": "icons/user.png", "size": "2048"},
    ]
    mock_list_bucket_files.return_value = fake_metadata

    response = client.get("/external/gcp/cloudStorage/bucket/be-website-private")

    assert response.status_code == 200

@patch("app.api.routes.routes.get_file_from_bucket")
def test_get_file(mock_get_file):
    mock_response = MagicMock()
    mock_response.content = b"Mock file content"  # Ensure content is bytes
    mock_response.status_code = 200
    mock_response.headers = {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Branden_Evangelista_Resume.pdf"',
    }
    mock_response.raise_for_status = MagicMock()  # Prevents exceptions

    mock_get_file.return_value = mock_response

    response = client.get("/external/gcp/cloudStorage/file?bucket_name=be-website-private&prefix=resume&file_name=resume.pdf")

    assert response.status_code == 200
    assert response.headers["Content-Type"] == "application/json"