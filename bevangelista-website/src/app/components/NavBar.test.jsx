import { render, screen, fireEvent } from "@testing-library/react";
import NavBar from "./NavBar";
import { useDarkMode } from "@/context/DarkModeContext";

jest.mock("next/image", () => {
	return function MockImage(props) {
		return <img {...props} />;
	};
});

jest.mock("@/context/DarkModeContext", () => ({
	useDarkMode: jest.fn(),
}));

const mockSetDarkMode = jest.fn();

function renderNavBar(darkMode = false) {
	useDarkMode.mockReturnValue({
		darkMode,
		setDarkMode: mockSetDarkMode,
	});

	return render(<NavBar />);
}

test("renders navigation links", () => {
	renderNavBar();

	expect(screen.getAllByText("Home")[0]).toBeInTheDocument();
	expect(screen.getAllByText("About")[0]).toBeInTheDocument();
	expect(screen.getAllByText("Resume")[0]).toBeInTheDocument();
});

test("clicking dark mode button toggles mode", () => {
	renderNavBar();

	const button = screen.getByRole("button", {
		name: /set dark mode/i,
	});

	fireEvent.click(button);

	expect(mockSetDarkMode).toHaveBeenCalled();
});

test("uses light logo in light mode", () => {
	renderNavBar(false);

	const logo = screen.getByAltText("NavBar logo");

	expect(logo).toBeInTheDocument();
});

test("uses dark logo in dark mode", () => {
	renderNavBar(true);

	const logo = screen.getByAltText("NavBar logo");

	expect(logo).toBeInTheDocument();
});