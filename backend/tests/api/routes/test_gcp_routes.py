from fastapi.testclient import TestClient
from app.main import app
from unittest.mock import patch

from fastapi import Response

client = TestClient(app)

@patch("app.api.routes.routes.list_files")
def test_list_files(mock_list_files):
    mock_list_files.return_value = [{"name": "file1.txt"}, {"name": "file2.pdf"}, {"name": "file3.txt"}]

    response = client.get("/external/gcp/cloudStorage/list")

    assert response.status_code == 200
    assert len(list(response.json())) == len(mock_list_files.return_value)

@patch("app.api.routes.routes.get_file")
def test_get_file(mock_get_file):
    mock_get_file.return_value = Response(
        content=b"Mock file content",
        media_type="application/pdf",
        headers={"Content-Disposition": 'attachment; filename="Branden_Evangelista_Resume.pdf"'}
    )

    response = client.get("/external/gcp/cloudStorage/get",
                          params={"file_name": "Branden_Evangelista_Resume.pdf", "prefix": "resume"})

    assert response.status_code == 200
    assert response.headers["Content-Type"] == "application/pdf"