module.exports = async function teardown() {
  await global.mongod.stop();
};
