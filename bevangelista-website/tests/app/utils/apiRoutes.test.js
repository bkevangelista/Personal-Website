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

		expect(routes.listFiles("bucket")).toBe("http://localhost:8080/external/gcp/cloudStorage/bucket/bucket");
	});

	test("creates correct getFile route", async () => {
		const routes = (await import("@/utils/apiRoutes")).default;

		expect(routes.getFile("bucket", "resume.pdf", "resume")).toBe(
			"http://localhost:8080/external/gcp/cloudStorage/file?bucket_name=bucket&file_name=resume.pdf&prefix=resume"
		);
	});

	test("creates correct getPresignedUrl route", async () => {
		const routes = (await import("@/utils/apiRoutes")).default;

		expect(routes.getFile("bucket", "resume.pdf", "resume")).toBe(
			"http://localhost:8080/external/gcp/cloudStorage/presignedUrl?bucket_name=bucket&file_name=resume.pdf&prefix=resume"
		);
	});
});
