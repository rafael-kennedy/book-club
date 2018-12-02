const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = process.env.SALT_ROUNDS || 13;

module.exports = function(app) {
  const db = app.get("db");
  const users = db.collections.users;

  app.post("/login", async (req, res, next) => {
    if (process.env.NODE_ENV !== "production") {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).send("Bad Request");
      }

      if ([email, password].some(v => typeof v !== "string")) {
        return res.status(400).send("Bad Request");
      }

      const matchingUser = await users.findOne({ email });
      if (!matchingUser) {
        return res.status(403).send("Your username or password is incorrect");
      }

      const matchingPasswords = await bcrypt.compare(
        password,
        matchingUser.hashedPassword
      );

      if (!matchingPasswords) {
        return res.status(403).send("Your username or password is incorrect");
      }

      const token = jwt.sign(matchingUser, process.env.SECRET, {
        expiresIn: "7d"
      });
      return res.status(200).send({ token });
    }
  });
};
