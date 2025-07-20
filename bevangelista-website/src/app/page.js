"use client"

import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import Header from "./components/Header";

export default function Home() {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (
            localStorage.theme === "darkMode" ||
            (
                !("theme" in localStorage) &&
                window.matchMedia("(prefers-color-scheme: dark)").matches
            )
        ) {
            setDarkMode(true);
        } else {
            setDarkMode(false);
        }
    }, [])

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
            localStorage.theme = 'dark';
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.theme = '';
        }
    }, [darkMode])

    return (
        <>
            <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
            <Header />
        </>
    );
}
