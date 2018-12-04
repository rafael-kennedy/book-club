const mongo = require("mongodb");
// TODO: Create indexes, including unique indexes on users and nominations
module.exports = class DataStore {
  static async create(prefix = "ec") {
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
