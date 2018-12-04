const login = require("./login");
const register = require("./register");
const nominations = require("./nominations");
module.exports = function setUpRoutes(app) {
  login(app);
  register(app);
  nominations(app);
};
