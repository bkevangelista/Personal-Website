import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

jest.mock("@/app/components/NavBar", () => {
	return function MockNavBar() {
		return <div data-testid="navbar">NavBar</div>;
	};
});

jest.mock("@/app/components/Header", () => {
	return function MockHeader() {
		return <div data-testid="header">Header</div>;
	};
});

describe("Home Page", () => {
	test("renders without crashing", () => {
		render(<Home />);

		expect(screen.getByTestId("navbar")).toBeInTheDocument();
		expect(screen.getByTestId("header")).toBeInTheDocument();
	});

	test("renders NavBar component", () => {
		render(<Home />);

		expect(screen.getByTestId("navbar")).toBeInTheDocument();
	});

	test("renders Header component", () => {
		render(<Home />);

		expect(screen.getByTestId("header")).toBeInTheDocument();
	});
});
