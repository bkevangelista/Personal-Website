"use client";

import React, { useState, useEffect } from 'react';
import apiRoutes from "@/utils/apiRoutes";

const FileHandler = (props)  => {
    const [fileURL, setFileURL] = useState(null);
    const [fileType, setFileType] = useState(null);
    const [error, setError] = useState(null);

    const downloadFile = async (fileName, prefix) => {
        try {
            const response = await fetch(apiRoutes.getFile(fileName, prefix));
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setFileURL(url);
            setFileType(blob.type);
        } catch(error) {
            console.error("Could not download file: ", error);
            setError(error.message);
            throw error;
        }
    }

    useEffect(() => {
        downloadFile(props.fileName, props.prefix);
    }, [props]);

    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
    if (!fileURL) return <p>Loading file...</p>;

    return (
        <div>
            {fileType?.includes("pdf") && (
                <iframe src={fileURL} width="100%" height="600px" title="PDF Viewer"></iframe>
            )}
            {fileType?.includes("image") && <img src={fileURL} alt="File Preview" width="300px" />}
            {fileType?.includes("text") && (
                <iframe src={fileURL} width="100%" height="300px" title="Text Viewer"></iframe>
            )}
            {fileType && !fileType.includes("pdf") && !fileType.includes("image") && !fileType.includes("text") && (
                <a href={fileURL} download>Download File</a>
            )}
        </div>
    );
}

export default FileHandler;