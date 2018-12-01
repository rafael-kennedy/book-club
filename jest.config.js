const path = require("path");

module.exports = {
  roots: [`<rootDir>/src`],
  testRegex: `.+\\.(spec|test)\\.js`,
  moduleFileExtensions: [`js`, `jsx`, `json`, `node`],
  globalSetup: path.join(__dirname, "./src/test/setup.js"),
  globalTeardown: path.join(__dirname, "./src/test/teardown.js")
};
