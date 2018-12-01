const supertest = require("supertest");
const app = require("../app");
let subject;
let request;

describe("login route", () => {
  beforeAll(async () => {
    subject = await app({ dbName: "test-login", listen: false });
    request = supertest(subject);
    await request
      .post("/register")
      .send({ email: "carlos@test.com", password: "Password1!" });
  });

  test("should log in with correct credentials", async () => {
    const result = await request
      .post("/login")
      .send({ email: "carlos@test.com", password: "Password1!" })
      .expect(200);

    expect(result.body.token).toBeTruthy();
  });

  test("should throw bad request on incomplete credentials", async () => {
    await request
      .post("/login")
      .send({ email: "carlos@test.com" })
      .expect(400);

    await request
      .post("/login")
      .send({ password: "Password1" })
      .expect(400);
  });

  test("should error with incorrect credentials", async () => {
    await request
      .post("/login")
      .send({ email: "carlos@test.com", password: "Password1" })
      .expect(403);

    await request
      .post("/login")
      .send({ email: "carlos@test.co", password: "Password1!" })
      .expect(403);

    await request
      .post("/login")
      .send({ email: { $regex: "/rlos@test.co/" }, password: "Password1!" })
      .expect(400);

    await request
      .post("/login")
      .send({
        email: { $regex: "rlos@test.co" },
        password: { $ne: "Password" }
      })
      .expect(400);
  });
});
