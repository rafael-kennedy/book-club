const bcrypt = require("bcrypt");
const SALT_ROUNDS = process.env.SALT_ROUNDS || 13;

function assertValidPassword(app, password) {
  if (password.length < 8) {
    app.throwCustom(400, "Your password must be at least 8 characters");
  }
  if (password.length < 15 && !/(\?|\!|%|\*)/.test(password)) {
    app.throwCustom(
      400,
      "If your password is less than 15 characters, you must include at least one special character"
    );
  }
  if (!/([A-Z])/.test(password) || !/([a-z])/.test(password)) {
    app.throwCustom(
      400,
      "Your password must contain at least one upper case and one lower case character"
    );
  }
}

module.exports = function(app) {
  const db = app.get("db");
  const users = db.collections.users;

  app.post(
    "/register",
    app.errorCatcher(async (req, res, next) => {
      const { email, password } = req.body;
      if (!email || !password) {
        return res
          .status(400)
          .send({
            message: "Bad Request: You must supply an email and password"
          });
      }

      assertValidPassword(app, password);
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      const user = await users.insertOne({ email, hashedPassword });
      res.status(200).send({ message: "user created successfully" });
    })
  );
};
