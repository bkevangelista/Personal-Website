import datetime
from unittest.mock import MagicMock, patch
import pytest
from app.utils.gcs_client import (
    list_bucket_files,
    get_file_from_bucket,
    get_presigned_url_from_bucket,
)

@pytest.fixture()
def mock_storage_client():
    with patch("app.utils.gcs_client.storage.Client") as mock_client_class:
        mock_instance = MagicMock()
        mock_client_class.return_value = mock_instance
        yield mock_instance

def test_list_bucket_files_success(mock_storage_client):
    mock_blob_1 = MagicMock()
    mock_blob_1._properties = {"kind": "storage#object", "name": "icons/home.png"}
    mock_blob_2 = MagicMock()
    mock_blob_2._properties = {"kind": "storage#object", "name": "icons/user.png"}

    mock_bucket = MagicMock()
    mock_bucket.list_blobs.return_value = [mock_blob_1, mock_blob_2]
    mock_storage_client.bucket.return_value = mock_bucket

    result = list_bucket_files("be-website-public")

    mock_storage_client.bucket.assert_called_once_with("be-website-public")
    mock_bucket.list_blobs.assert_called_once()
    assert len(result) == 2
    assert result == [mock_blob_1._properties, mock_blob_2._properties]

def test_get_presigned_url_from_bucket_success(mock_storage_client):
    mock_bucket = MagicMock()
    mock_blob = MagicMock()
    mock_blob.generate_signed_url.return_value = "https://googleapis.com"

    mock_storage_client.bucket.return_value = mock_bucket
    mock_bucket.blob.return_value = mock_blob

    url = get_presigned_url_from_bucket("my-bucket", "photo.jpg", prefix="uploads")

    mock_storage_client.bucket.assert_called_once_with("my-bucket")
    mock_bucket.blob.assert_called_once_with("uploads/photo.jpg")
    mock_blob.generate_signed_url.assert_called_once_with(
        version="v4",
        expiration=datetime.timedelta(minutes=15),
        method="GET",
    )
    assert url == "https://googleapis.com"

@pytest.mark.usefixtures("mock_storage_client")
@patch("app.utils.gcs_client.requests.get")
@patch("app.utils.gcs_client.get_presigned_url_from_bucket")
def test_get_file_from_bucket_success(mock_get_url, mock_requests_get):
    mock_get_url.return_value = "https://googleapis.com"

    mock_response = MagicMock()
    mock_response.content = b"fake file content"
    mock_response.headers = {"Content-Type": "image/png"}
    mock_requests_get.return_value = mock_response

    response = get_file_from_bucket("my-bucket", "image.png", prefix="icons")

    mock_get_url.assert_called_once_with("my-bucket", "image.png", "icons")
    mock_requests_get.assert_called_once_with(
        "https://googleapis.com",
        stream=True
    )
    mock_response.raise_for_status.assert_called_once()

    assert response.body == b"fake file content"
    assert response.media_type == "image/png"
    assert response.headers["content-disposition"] == 'attachment; filename="image.png"'
