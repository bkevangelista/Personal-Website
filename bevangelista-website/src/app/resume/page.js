import React from 'react'
import FileHandler from '../components/FileHandler';

export default function Resume() {
    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <FileHandler
                fileName="Branden_Evangelista_Resume.pdf"
                prefix="resume"
                width="500px"
                height="600px"
            />
        </div>
    )
}