module.exports = {
  setupFilesAfterEnv: [
    "@testing-library/react",
    "@testing-library/jest-dom/extend-expect",
  ],
  moduleFileExtensions: ["js", "jsx"],
  transform: {
    "^.+\\.(js|jsx)?$": "babel-jest",
  },
  testMatch: ["<rootDir>/src/**/*.test.js", "<rootDir>/src/**/*.test.jsx"],
  testEnvironment: "jsdom",
};
