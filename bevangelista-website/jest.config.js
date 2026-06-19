const nextJest = require("next/jest");

const createJestConfig = nextJest({
	dir: "./",
});

const customJestConfig = {
	clearMocks: true,
	collectCoverage: true,
	coverageDirectory: "coverage",
	coverageProvider: "v8",
	testEnvironment: "jest-environment-jsdom",

	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],

	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
	},

	coverageThreshold: {
		global: {
			branches: 90,
			functions: 90,
			lines: 90,
			statements: 90,
		},
	},
};

module.exports = createJestConfig(customJestConfig);
