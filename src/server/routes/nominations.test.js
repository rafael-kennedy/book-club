const persistence = require("../persistence");
const supertest = require("supertest");
const app = require("../app");

jest.setTimeout(60 * 1000);
process.env.SECRET = "secret";

let subjectApp;
let request;

describe("nominations route", () => {
  beforeAll(async () => {
    subjectApp = await app({ dbName: "test-nominations", listen: false });
    request = supertest(subjectApp);
  });
  test("can create new nomination", async () => {
    const result = await request
      .post("/nominations")
      .set("Authorization", "Bearer " + token)
      .send({ email: "test@test.com", password: "abcXYZ123!?" })
      .expect(200);

    const newUser = result.body;

    expect(newUser.message).toBeTruthy();
  });
});
