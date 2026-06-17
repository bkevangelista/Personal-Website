import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { DarkModeProvider, useDarkMode } from "@/context/DarkModeContext";
import SunCalc from "suncalc";

jest.mock("suncalc", () => ({
	getTimes: jest.fn(),
}));

function TestComponent() {
	const { darkMode, setDarkMode } = useDarkMode();

	return (
		<div>
			<span data-testid="dark-mode">{String(darkMode)}</span>
			<button onClick={() => setDarkMode(true)}>Enable Dark</button>
			<button onClick={() => setDarkMode(false)}>Disable Dark</button>
		</div>
	);
}

beforeEach(() => {
	jest.clearAllMocks();

	Object.defineProperty(window, "matchMedia", {
		writable: true,
		value: jest.fn().mockImplementation((query) => ({
			matches: false,
			media: query,
			onchange: null,
			addListener: jest.fn(),
			removeListener: jest.fn(),
			addEventListener: jest.fn(),
			removeEventListener: jest.fn(),
			dispatchEvent: jest.fn(),
		})),
	});

	global.navigator.geolocation = {
		getCurrentPosition: jest.fn(),
	};

	localStorage.clear();
	document.documentElement.className = "";
});

test("renders children inside provider", () => {
	render(
		<DarkModeProvider>
			<div>Child Component</div>
		</DarkModeProvider>
	);

	expect(screen.getByText("Child Component")).toBeInTheDocument();
});

test("provides dark mode context", () => {
	render(
		<DarkModeProvider>
			<TestComponent />
		</DarkModeProvider>
	);

	expect(screen.getByTestId("dark-mode")).toBeInTheDocument();
});

test("adds dark class when dark mode enabled", async () => {
	render(
		<DarkModeProvider>
			<TestComponent />
		</DarkModeProvider>
	);

	fireEvent.click(screen.getByText("Enable Dark"));

	await waitFor(() => {
		expect(document.documentElement.classList.contains("dark")).toBe(true);
	});
});

test("removes dark class when dark mode disabled", async () => {
	render(
		<DarkModeProvider>
			<TestComponent />
		</DarkModeProvider>
	);

	fireEvent.click(screen.getByText("Enable Dark"));
	fireEvent.click(screen.getByText("Disable Dark"));

	await waitFor(() => {
		expect(document.documentElement.classList.contains("dark")).toBe(false);
	});
});

test("handles geolocation failure", async () => {
	const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

	navigator.geolocation.getCurrentPosition.mockImplementation((success, error) => {
		error({ message: "Permission denied" });
	});

	render(
		<DarkModeProvider>
			<TestComponent />
		</DarkModeProvider>
	);

	await waitFor(() => {
		expect(consoleSpy).toHaveBeenCalled();
	});

	consoleSpy.mockRestore();
});

test("handles missing geolocation support", async () => {
	const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

	delete navigator.geolocation;

	render(
		<DarkModeProvider>
			<TestComponent />
		</DarkModeProvider>
	);

	await waitFor(() => {
		expect(consoleSpy).toHaveBeenCalledWith("Geolocation is not available");
	});

	consoleSpy.mockRestore();
});

test("handles successful geolocation", async () => {
	navigator.geolocation.getCurrentPosition.mockImplementation((success) => {
		success({
			coords: {
				latitude: 33.4484,
				longitude: -112.074,
			},
		});
	});

	SunCalc.getTimes.mockReturnValue({
		sunrise: new Date("2099-01-01"),
		sunset: new Date("2099-01-02"),
	});

	render(
		<DarkModeProvider>
			<TestComponent />
		</DarkModeProvider>
	);

	await waitFor(() => {
		expect(SunCalc.getTimes).toHaveBeenCalled();
	});
});

test("sets dark mode false during daytime", async () => {
	navigator.geolocation.getCurrentPosition.mockImplementation((success) => {
		success({
			coords: { latitude: 1, longitude: 1 },
		});
	});

	const now = new Date();

	SunCalc.getTimes.mockReturnValue({
		sunrise: new Date(now.getTime() - 10000),
		sunset: new Date(now.getTime() + 10000),
	});

	render(
		<DarkModeProvider>
			<TestComponent />
		</DarkModeProvider>
	);

	await waitFor(() => {
		expect(screen.getByTestId("dark-mode")).toHaveTextContent("false");
	});
});


test("sets dark mode true at night", async () => {
	navigator.geolocation.getCurrentPosition.mockImplementation((success) => {
		success({
			coords: { latitude: 1, longitude: 1 },
		});
	});

	const now = new Date();

	SunCalc.getTimes.mockReturnValue({
		sunrise: new Date(now.getTime() + 10000),
		sunset: new Date(now.getTime() + 20000),
	});

	render(
		<DarkModeProvider>
			<TestComponent />
		</DarkModeProvider>
	);

	await waitFor(() => {
		expect(screen.getByTestId("dark-mode")).toHaveTextContent("true");
	});
});

test("initializes dark mode from localStorage", async () => {
	localStorage.theme = "dark";

	render(
		<DarkModeProvider>
			<TestComponent />
		</DarkModeProvider>
	);

	await waitFor(() => {
		expect(document.documentElement.classList.contains("dark")).toBe(true);
	});
});

test("initializes dark mode from system preference", async () => {
	delete localStorage.theme;

	window.matchMedia = jest.fn().mockImplementation(() => ({
		matches: true,
		addListener: jest.fn(),
		removeListener: jest.fn(),
	}));

	render(
		<DarkModeProvider>
			<TestComponent />
		</DarkModeProvider>
	);

	await waitFor(() => {
		expect(document.documentElement.classList.contains("dark")).toBe(true);
	});
});
