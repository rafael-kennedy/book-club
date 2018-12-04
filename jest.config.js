const path = require("path");

module.exports = {
  roots: [`<rootDir>/src`],
  testRegex: `.+\\.(spec|test)\\.js$`,
  moduleFileExtensions: [`js`, `jsx`, `json`, `node`, "vue"],
  moduleDirectories: [
    "node_modules",
    "src/client/node_modules",
    "bower_components",
    "shared"
  ],
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
    ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest"
  },
  snapshotSerializers: ["<rootDir>/node_modules/jest-serializer-vue"],
  globalSetup: path.join(__dirname, "./src/test/setup.js"),
  globalTeardown: path.join(__dirname, "./src/test/teardown.js")
};
