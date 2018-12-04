const mongo = require("mongodb");
// TODO: Create indexes, including unique indexes on users and nominations
module.exports = class DataStore {
  static async create(prefix = "ec") {
    if (
      process.env.NODE_ENV === "development" ||
      process.env.NODE_ENV === "test"
    ) {
      console.log("mongo: ", process.env.MONGO_CONNECTION_STRING);
    }
    const connection = await mongo.connect(
      process.env.MONGO_CONNECTION_STRING,
      { useNewUrlParser: true }
    );
    const db = connection.db(prefix);
    return new DataStore({ db });
  }

  constructor({ db }) {
    this.db = db;
    this.mode = process.env.NODE_ENV === "test" ? "test" : "live";
    this.collections = new Proxy(
      {},
      {
        get(obj, key) {
          return db.collection(key);
        }
      }
    );
  }
};
