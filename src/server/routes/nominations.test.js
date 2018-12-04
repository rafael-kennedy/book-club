const persistence = require("../persistence");
const supertest = require("supertest");
const app = require("../app");
const {
  validToken: token,
  adminToken
} = require("../../test/utils/fixture-tokens");
const { incomingPayload, seedData } = require("./nominations.fixture");

jest.setTimeout(60 * 1000);

let subjectApp;
let request;
let collection;

describe("nominations post route", () => {
  beforeAll(async () => {
    subjectApp = await app({ dbName: "test-nominations-post", listen: false });
    request = supertest(subjectApp);
    collection = subjectApp.get("db").collections.nominations;
  });
  test("can create new nomination", async () => {
    const result = await request
      .post("/nominations")
      .set("Authorization", "Bearer " + token)
      .send(incomingPayload())
      .expect(200);

    const inserted = await collection.findOne({ key: incomingPayload().key });
    expect(inserted).toBeTruthy();
    expect(inserted).toMatchSnapshot({
      _id: expect.anything()
    });
  });
});

describe("nominations get route", () => {
  beforeAll(async () => {
    subjectApp = await app({ dbName: "test-nominations-get", listen: false });
    request = supertest(subjectApp);
    collection = subjectApp.get("db").collections.nominations;
    await collection.insertMany(seedData());
  });
  test("can fetch my nominations", async () => {
    const result = await request
      .get("/nominations")
      .query({ creator: "me" })
      .send({ email: "test@test.com", password: "abcXYZ123!?" })
      .set("Authorization", "Bearer " + token)
      .expect(200);
    expect(result.body.length).toBe(2);
    expect(result.body).toMatchSnapshot();
  });

  test("can only fetch regular user's own nominations", async () => {
    const result = await request
      .get("/nominations")
      .send({ email: "test@test.com", password: "abcXYZ123!?" })
      .set("Authorization", "Bearer " + token)
      .expect(200);
    expect(result.body.length).toBe(2);
    expect(result.body).toMatchSnapshot();
  });

  test("admin can fetch all nominations", async () => {
    const result = await request
      .get("/nominations")
      .send({ email: "test@test.com", password: "abcXYZ123!?" })
      .set("Authorization", "Bearer " + adminToken)
      .expect(200);
    expect(result.body.length).toBe(3);
    expect(result.body).toMatchSnapshot();
  });
});
