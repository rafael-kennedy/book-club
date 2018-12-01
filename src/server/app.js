const Persistence = require("./persistence");
const routes = require("./routes");
const express = require("express");
const helmet = require("helmet");
const errorCatcher = require("./modules/error-catcher");

module.exports = async function startAppServer({
  dbName = "",
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
