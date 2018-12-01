const mongo = require("mongodb");

const path = require("path");
const crypto = require("crypto");

module.exports = class DataStore {
  static async create(prefix = "ec") {
    const connection = await mongo.connect(process.env.MONGO_CONNECTION_STRING);
    const db = connection.db(prefix);
    return new DataStore({ db, prefix });
  }

  constructor({ db, prefix }) {
    this.db = db;
    this.prefix = prefix;
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
