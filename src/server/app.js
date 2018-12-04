const Persistence = require("./persistence");
const routes = require("./routes");
const express = require("express");
const helmet = require("helmet");
const errorCatcher = require("./modules/error-catcher");

module.exports = async function startAppServer({
  dbName = "book-club",
  port = 3000,
  listen = true
}) {
  const db = await Persistence.create(dbName);

  const app = express();

  errorCatcher(app);
  app.set("db", db);

  app.use(express.json({ limit: "1mb", extended: true }));
  app.use(express.urlencoded({ extended: true }));
  app.use(helmet());

  if (
    process.env.NODE_ENV === "development" ||
    process.env.NODE_ENV === "test"
  ) {
    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      next();
    });
  }

  // default to content-type JSON
  app.use((req, res, next) => {
    res.header("Content-Type", "application/json");
    next();
  });

  routes(app);

  if (!listen) {
    console.log("app is not listening");
    return app;
  }

  await new Promise((res, rej) => {
    app.listen(port, () => {
      console.log("app is listening on port: ", port);
      res();
    });
  });

  return app;
};
