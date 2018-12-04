const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(403).send({
      message:
        "You must include your bearer token in the Authorization header of the request"
    });
  }
  let tokenPayload;
  try {
    tokenPayload = jwt.verify(token, process.env.SECRET);
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(403).send({
        message: "Your token has expired. Please log in again"
      });
    }
    return res.status(403).send({
      message: "Your token is invalid. Please log in again"
    });
  }
  const { iat, exp, ...user } = tokenPayload;
  req.user = user;
  next();
};
