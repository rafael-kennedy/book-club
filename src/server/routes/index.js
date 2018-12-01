const login = require("./login");
const register = require("./register");

module.exports = function setUpRoutes(app) {
  login(app);
  register(app);
};
