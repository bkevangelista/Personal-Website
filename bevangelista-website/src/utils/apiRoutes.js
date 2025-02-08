const API_URL = "http://localhost:8000";

const routes = {
    listFiles: `${API_URL}/external/gcp/cloudStorage/list`,
    getFile: (fileName, prefix) => `${API_URL}/external/gcp/cloudStorage/get?file_name=${fileName}&prefix=${prefix}`,
};

export default routes;