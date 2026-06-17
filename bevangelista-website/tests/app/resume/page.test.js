import { render, screen } from "@testing-library/react";
import Resume from "@/app/resume/page";

jest.mock("@/app/components/NavBar", () => {
	return function MockNavBar() {
		return <div data-testid="navbar">NavBar</div>;
	};
});

jest.mock("@/app/components/Timeline", () => {
	return function MockTimeline() {
		return <div data-testid="timeline">Timeline</div>;
	};
});

test("renders navbar", () => {
	render(<Resume />);
	expect(screen.getByTestId("navbar")).toBeInTheDocument();
});

test("renders timeline", () => {
	render(<Resume />);
	expect(screen.getByTestId("timeline")).toBeInTheDocument();
});
