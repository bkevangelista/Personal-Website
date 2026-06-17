import { render, screen } from "@testing-library/react";
import Header from "@/app/components/Header";

jest.mock("next/image", () => {
	return function MockImage(props) {
		return <img {...props} />;
	};
});

test("renders header component", () => {
	render(<Header />);
});

test("renders headshot image", () => {
	render(<Header />);

	const image = screen.getByAltText("Headshot");
	expect(image).toBeInTheDocument();
});

test("renders greeting text", () => {
	render(<Header />);

	expect(screen.getByText(/Hi! I'm Branden Evangelista/i)).toBeInTheDocument();
});

test("renders main title", () => {
	render(<Header />);

	expect(screen.getByText(/Fullstack developer based in Phoenix/i)).toBeInTheDocument();
});

test("renders description paragraph", () => {
	render(<Header />);

	expect(screen.getByText(/Currently work at American Express/i)).toBeInTheDocument();
});

test("renders email", () => {
	render(<Header />);

	expect(screen.getByText(/evangelistabranden@gmail.com/i)).toBeInTheDocument();
});

test("renders phone number", () => {
	render(<Header />);

	expect(screen.getByText(/\(813\) 394-2478/)).toBeInTheDocument();
});
