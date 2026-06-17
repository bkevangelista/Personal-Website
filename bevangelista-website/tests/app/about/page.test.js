import { render, screen } from "@testing-library/react";
import About from "@/app/about/page";
import { useDarkMode } from "@/context/DarkModeContext";

jest.mock("next/image", () => {
	return function MockImage(props) {
		return <img {...props} />;
	};
});

jest.mock("@/context/DarkModeContext", () => ({
	useDarkMode: jest.fn(),
}));

jest.mock("@/app/components/NavBar", () => {
	return function MockNavBar() {
		return <div data-testid="navbar">NavBar</div>;
	};
});

function renderAbout(darkMode = false) {
	useDarkMode.mockReturnValue({
		darkMode,
		setDarkMode: jest.fn(),
	});

	return render(<About />);
}

test("renders navbar", () => {
	renderAbout();

	expect(screen.getByTestId("navbar")).toBeInTheDocument();
});

test("renders about headings", () => {
	renderAbout();

	expect(screen.getByText("Introduction")).toBeInTheDocument();
	expect(screen.getByText("About Me")).toBeInTheDocument();
});

test("renders user photo", () => {
	renderAbout();

	expect(screen.getByAltText("User photo")).toBeInTheDocument();
});

test("renders about description text", () => {
	renderAbout();

	expect(screen.getByText(/software engineer with 3 years/i)).toBeInTheDocument();

	expect(screen.getByText(/Outside of working/i)).toBeInTheDocument();
});

test("renders about cards", () => {
	renderAbout();

	expect(screen.getByText("Education")).toBeInTheDocument();
	expect(screen.getByText("Languages")).toBeInTheDocument();
});

test("renders card descriptions", () => {
	renderAbout();

	expect(screen.getByText(/Computer Engineering/i)).toBeInTheDocument();

	expect(screen.getByText(/Java, JavaScript, Python/i)).toBeInTheDocument();
});

test("renders card icons in dark mode", () => {
	renderAbout(true);

	expect(screen.getByAltText("Education")).toBeInTheDocument();
	expect(screen.getByAltText("Languages")).toBeInTheDocument();
});
