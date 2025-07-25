"use client"

import React from 'react'
import FileHandler from '../components/FileHandler';
import NavBar from "@/app/components/NavBar";
import Timeline from "@/app/components/Timeline";
import {useDarkMode} from "@/context/DarkModeContext";

export default function Resume() {
    return (
        <>
            <NavBar />
            <Timeline />
        </>
    )
}