const { MongoMemoryServer } = require("mongodb-memory-server");

module.exports = async function globalSetup() {
  require("dotenv").load();
  global.mongod = new MongoMemoryServer();
  process.env.MONGO_CONNECTION_STRING = await mongod.getConnectionString();
};
