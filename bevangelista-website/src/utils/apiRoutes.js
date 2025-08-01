const API_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

const routes = {
	listFiles: `${API_URL}/external/gcp/cloudStorage/list`,
	getFile: (fileName, prefix) =>
		`${API_URL}/external/gcp/cloudStorage/get?file_name=${fileName}&prefix=${prefix}`,
};

export default routes;
