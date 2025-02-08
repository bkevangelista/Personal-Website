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
    }, [props.fileName, props.prefix]);

    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
    if (!fileURL) return <p>Loading file...</p>;

    const srcURL = `${fileURL}#toolbar=0`

    return (
        <div>
            {(fileType?.includes("pdf") ||
                fileType?.includes("image") ||
                fileType?.includes("text")) && (
                <iframe
                    src={srcURL}
                    width={props.width}
                    height={props.height}
                >
                </iframe>
            )}
        </div>
    );
}

export default FileHandler;