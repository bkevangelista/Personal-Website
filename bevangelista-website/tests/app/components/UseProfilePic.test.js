import { renderHook, waitFor } from "@testing-library/react";
import { useProfilePic } from "@/app/components/UseProfilePic"
import apiRoutes from "@/utils/apiRoutes";

jest.mock("@/utils/apiRoutes", () => ({
	default: {
		getPresignedUrl: jest.fn(),
	},
}));

describe("useProfilePic Hook", () => {
	const bucketName = "be-website-private";
	const fileName = "chicago_pic.JPG";
	const prefix = "photos";
	const mockApiUrl = "https://example.com";

	beforeEach(() => {
		jest.resetAllMocks();
		// Mock the route utility to return a deterministic endpoint string
		apiRoutes.getPresignedUrl.mockReturnValue(mockApiUrl);
	});

	afterEach(() => {
		jest.restoreAllMocks();
	});

	it("should initialize with an empty profilePicUrl string", async () => {
		jest.spyOn(global, "fetch").mockImplementation(
			() => new Promise((resolve) => setTimeout(() => resolve(new Response("")), 50))
		);

		const { result } = renderHook(() => useProfilePic(bucketName, fileName, prefix));

		// Checks that initial state returns synchronously before the fetch resolves
		expect(result.current.profilePicUrl).toBe("");
	});

	it("should clean and set the profilePicUrl successfully on a valid fetch", async () => {
		const rawUrlResponse = '"https://amazonaws.com"\$';
		const expectedCleanUrl = "https://amazonaws.com";

		jest.spyOn(global, "fetch").mockResolvedValue({
			text: jest.fn().mockResolvedValue(rawUrlResponse),
		});

		const { result } = renderHook(() => useProfilePic(bucketName, fileName, prefix));

		expect(apiRoutes.getPresignedUrl).toHaveBeenCalledWith(bucketName, fileName, prefix);
		expect(global.fetch).toHaveBeenCalledWith(mockApiUrl);

		await waitFor(() => {
			expect(result.current.profilePicUrl).toBe(expectedCleanUrl);
		});
	});

	it("should log an error to console and keep profilePicUrl empty when fetch fails", async () => {
		const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
		const mockNetworkError = new Error("Network simulation failure");

		jest.spyOn(global, "fetch").mockRejectedValue(mockNetworkError);

		const { result } = renderHook(() => useProfilePic(bucketName, fileName, prefix));

		await waitFor(() => {
			expect(consoleErrorSpy).toHaveBeenCalledWith(
				`Error loading profile picture (${fileName}):`,
				mockNetworkError
			);
		});

		expect(result.current.profilePicUrl).toBe("");
	});
});
