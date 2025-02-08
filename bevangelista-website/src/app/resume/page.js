import React from 'react'
import FileHandler from '../components/FileHandler';

export default function Resume() {
    return <h1>
        Branden Evangelista - Resume
        <FileHandler
            fileName="Branden_Evangelista_Resume.pdf"
            prefix="resume"
        />
    </h1>;
}