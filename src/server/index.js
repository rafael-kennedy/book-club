const app = require("./app");
require("dotenv").load();

global.runningApp = app({ port: 3000 });
