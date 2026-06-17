import { render, screen, waitFor } from "@testing-library/react";
import FileHandler from "@/app/components/FileHandler";

beforeEach(() => {
	jest.clearAllMocks();
});

jest.mock("@/utils/apiRoutes", () => ({
	__esModule: true,
	default: {
		getFile: jest.fn(() => "mock-url"),
	},
}));

global.URL.createObjectURL = jest.fn(() => "blob:mock-url");

test("shows loading state initially", () => {
	global.fetch = jest.fn(
		() => new Promise(() => {}) // never resolves
	);

	render(<FileHandler fileName="resume.pdf" prefix="resume" />);

	expect(screen.getByText("Loading file...")).toBeInTheDocument();
});

test("renders iframe when pdf loads successfully", async () => {
	const mockBlob = new Blob(["test"], {
		type: "application/pdf",
	});

	global.fetch = jest.fn(() =>
		Promise.resolve({
			blob: () => Promise.resolve(mockBlob),
		})
	);

	render(<FileHandler fileName="resume.pdf" prefix="resume" />);

	const iframe = await screen.findByTitle("file-preview");

	expect(iframe).toBeInTheDocument();
	expect(iframe).toHaveAttribute("src", expect.stringContaining("blob:mock-url"));
});

test("renders error when download fails", async () => {
	global.fetch = jest.fn(() => Promise.reject(new Error("Network failure")));

	const consoleSpy = jest.spyOn(console, "error").mockImplementation(() => {});

	render(<FileHandler fileName="resume.pdf" prefix="resume" />);

	await waitFor(() => {
		expect(screen.getByText(/Error:/)).toBeInTheDocument();
	});

	expect(screen.getByText(/Network failure/)).toBeInTheDocument();

	consoleSpy.mockRestore();
});

test("does not render iframe for unsupported file type", async () => {
	const mockBlob = new Blob(["zip"], {
		type: "application/zip",
	});

	global.fetch = jest.fn(() =>
		Promise.resolve({
			blob: () => Promise.resolve(mockBlob),
		})
	);

	render(<FileHandler fileName="archive.zip" prefix="files" />);

	await waitFor(() => {
		expect(screen.queryByText("Loading file...")).not.toBeInTheDocument();
	});

	expect(screen.queryByTitle("file-preview")).not.toBeInTheDocument();
});

test("refetches when props change", async () => {
	const mockBlob = new Blob(["test"], { type: "application/pdf" });

	global.fetch = jest.fn(() =>
		Promise.resolve({
			blob: () => Promise.resolve(mockBlob),
		})
	);

	const { rerender } = render(<FileHandler fileName="a.pdf" prefix="resume" />);

	rerender(<FileHandler fileName="b.pdf" prefix="resume" />);

	await waitFor(() => {
		expect(fetch).toHaveBeenCalledTimes(2);
	});
});
