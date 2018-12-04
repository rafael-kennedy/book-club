const jwt = require("jsonwebtoken");

const validToken = jwt.sign(
  { _id: "1", email: "test@test.com" },
  process.env.SECRET,
  {
    expiresIn: "7d"
  }
);

const oldToken = jwt.sign(
  {
    _id: "1",
    email: "test@test.com",
    iat: Math.floor(Date.now() / 1000) - 25 * 60 * 60 * 1000
  },
  process.env.SECRET,
  {
    expiresIn: "1d"
  }
);

const invalidToken = jwt.sign(
  {
    _id: "1",
    email: "test@test.com"
  },
  "NOT THE REAL SECRET",
  {
    expiresIn: "7d"
  }
);

module.exports = {
  validToken,
  oldToken,
  invalidToken
};
