module.exports = {
  preset: "ts-jest",
  verbose: true,
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.+(ts|tsx|js)", "**/?(*.)+(spec|test).+(ts|tsx|js)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  globals: {
    "ts-jest": {
      // ...
      diagnostics: {
        ignoreCodes: [151001]
      }
    }
  }
};
