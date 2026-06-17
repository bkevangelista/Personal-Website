describe("apiRoutes", () => {
	beforeEach(() => {
		jest.resetModules();
		process.env.NEXT_PUBLIC_BACKEND_API_URL = "http://localhost:8080";
	});

	afterEach(() => {
		delete process.env.NEXT_PUBLIC_BACKEND_API_URL;
	});

	test("creates correct listFiles route", async () => {
		const routes = (await import("@/utils/apiRoutes")).default;

		expect(routes.listFiles).toBe("http://localhost:8080/external/gcp/cloudStorage/list");
	});

	test("creates correct getFile route", async () => {
		const routes = (await import("@/utils/apiRoutes")).default;

		expect(routes.getFile("resume.pdf", "resume")).toBe(
			"http://localhost:8080/external/gcp/cloudStorage/get?file_name=resume.pdf&prefix=resume"
		);
	});
});
