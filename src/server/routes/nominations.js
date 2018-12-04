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

      const inserted = await nominations.insertOne({
        ...book,
        nominatedBy: ObjectId(user._id)
      });

      res.status(200).send({ message: "nomination created successfully" });
    })
  );

  app.get(
    "/nominations",
    setUser,
    app.errorCatcher(async (req, res) => {
      const { user, query = {} } = req;
      let nominationRecords;
      if (!user.isAdmin || (query.creator && query.creator === "me")) {
        nominationRecords = await nominations
          .find({ nominatedBy: ObjectId(user._id) })
          .toArray();
      } else {
        nominationRecords = await nominations.find({}).toArray();
      }

      res.status(200).send(nominationRecords);
    })
  );
};
