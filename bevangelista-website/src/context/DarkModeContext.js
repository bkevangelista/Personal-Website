"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import moment from "moment";
import SunCalc from "suncalc";

const DarkModeContext = createContext();

export const DarkModeProvider = ({ children }) => {
	const [darkMode, setDarkMode] = useState(false);

	const getUserCoordinates = () => {
		return new Promise((resolve, reject) => {
			if (!navigator.geolocation) {
				reject(new Error("Geolocation is not available"));
				return;
			}

			navigator.geolocation.getCurrentPosition(
				(position) => {
					resolve({
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
					});
				},
				(error) => {
					reject(new Error("Geolocation error: " + error.message));
				}
			);
		});
	};

	const checkIfDarkMode = useCallback(async () => {
		try {
			const { latitude, longitude } = await getUserCoordinates();
			const now = moment().toDate();
			const sunTimes = SunCalc.getTimes(now, latitude, longitude);

			return !(now >= sunTimes.sunrise && now < sunTimes.sunset);
		} catch (error) {
			console.error(error.message);
			return false;
		}
	}, []);

	useEffect(() => {
		async function initDarkMode() {
			if (
				localStorage.theme === "dark" ||
				(!("theme" in localStorage) &&
					window.matchMedia("(prefers-color-scheme: dark)").matches)
			) {
				setDarkMode(true);
			}

			const isDayTime = await checkIfDarkMode();
			setDarkMode(isDayTime);
		}

		initDarkMode();
	}, [checkIfDarkMode]);

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.add("dark");
			localStorage.theme = "dark";
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.theme = "";
		}
	}, [darkMode]);

	return (
		<DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
			{children}
		</DarkModeContext.Provider>
	);
};

export const useDarkMode = () => useContext(DarkModeContext);
