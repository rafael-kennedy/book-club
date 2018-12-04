const setUser = require("../modules/set-user");
const { ObjectId } = require("mongodb");
//TODO: Set schema validation. Not using Mongoose here, so probably with schm

module.exports = function(app) {
  const db = app.get("db");
  const nominations = db.collections.nominations;

  app.post(
    "/nominations",
    setUser,
    app.errorCatcher(async (req, res) => {
      const book = req.body;
      const user = req.user;

      const inserted = await nominations
        .insertOne({
          ...book,
          nominatedBy: ObjectId(user._id)
        })
        .catch(err => {
          return res.status(500).send({ message: err.message });
        });
      debugger;
      res.status(200).send({ message: "nomination created successfully" });
    })
  );
};
