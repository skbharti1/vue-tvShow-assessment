module.exports = {
  preset: "@vue/cli-plugin-unit-jest",
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,vue}",
    "!**/node_modules/**",
    "!**/*.config.js",
    "!**/mocked-data/**",
    "!**/main.js",
    "!**/plugins/**",
    "!**/router/**",
    "!**/http-client/**",
    "!**/coverage/**"
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10
    }
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/(?!vuetify)/.*"],
  verbose: true
};
