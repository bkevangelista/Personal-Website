import { render, screen, fireEvent } from "@testing-library/react";
import Timeline from "@/app/components/Timeline";
import { useDarkMode } from "@/context/DarkModeContext";

jest.mock("next/image", () => {
	return function MockImage(props) {
		return <img {...props} />;
	};
});

jest.mock("@/context/DarkModeContext", () => ({
	useDarkMode: jest.fn(),
}));

jest.mock("react-vertical-timeline-component", () => ({
	VerticalTimeline: ({ children }) => <div data-testid="timeline">{children}</div>,
	VerticalTimelineElement: ({ children }) => <div data-testid="timeline-element">{children}</div>,
}));

jest.mock("@/app/components/FileHandler", () => {
	return function MockFileHandler(props) {
		return (
			<div data-testid="file-handler">
				{props.fileName} | {props.prefix}
			</div>
		);
	};
});

function renderTimeline(darkMode = false) {
	useDarkMode.mockReturnValue({
		darkMode,
		setDarkMode: jest.fn(),
	});

	return render(<Timeline />);
}

test("renders timeline", () => {
	renderTimeline();

	expect(screen.getByTestId("timeline")).toBeInTheDocument();
});

test("renders timeline entries", () => {
	renderTimeline();

	expect(screen.getByText("CpE Student")).toBeInTheDocument();
	expect(screen.getByText("Operation Mel")).toBeInTheDocument();
	expect(screen.getByText("Resume")).toBeInTheDocument();
});

test("renders tech tags", () => {
	renderTimeline();

	expect(screen.getAllByText("React")).toHaveLength(3);
	expect(screen.getByText("Docker")).toBeInTheDocument();
});

test("renders source code links", () => {
	renderTimeline();

	expect(screen.getAllByText("View Source Code").length).toBeGreaterThan(0);
});

test("renders website links when available", () => {
	renderTimeline();

	expect(screen.getByText("Visit Website")).toBeInTheDocument();
});

test("passes correct resume file in light mode", () => {
	renderTimeline(false);

	expect(screen.getByTestId("file-handler")).toHaveTextContent("Branden_Evangelista_Resume.pdf");
});


test("passes dark resume file in dark mode", () => {
	renderTimeline(true);

	expect(screen.getByTestId("file-handler")).toHaveTextContent(
		"Branden_Evangelista_Resume_Dark.pdf"
	);
});

test("resume button opens new tab", () => {
	renderTimeline();

	const openSpy = jest.spyOn(window, "open").mockImplementation(() => null);

	const buttons = screen.getAllByRole("button");
	fireEvent.click(buttons[0]);

	expect(openSpy).toHaveBeenCalled();

	openSpy.mockRestore();
});
