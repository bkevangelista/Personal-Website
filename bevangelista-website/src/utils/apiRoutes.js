const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const routes = {
	listFiles: (bucketName) => `${API_URL}/external/gcp/cloudStorage/bucket/${bucketName}`,
	getFile: (bucketName, fileName, prefix) =>
		`${API_URL}/external/gcp/cloudStorage/file?bucket_name=${bucketName}&file_name=${fileName}&prefix=${prefix}`,
	getPresignedUrl: (bucketName, fileName, prefix) =>
		`${API_URL}/external/gcp/cloudStorage/presignedUrl?bucket_name=${bucketName}&file_name=${fileName}&prefix=${prefix}`,
};

export default routes;
