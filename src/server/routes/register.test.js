const persistence = require("../persistence");
const supertest = require("supertest");
const app = require("../app");

jest.setTimeout(60 * 1000);
process.env.SECRET = "secret";

let subjectApp;
let request;

describe("register route", () => {
  beforeAll(async () => {
    subjectApp = await app({ dbName: "test-register", listen: false });
    request = supertest(subjectApp);
  });
  test("can create new user", async () => {
    const result = await request
      .post("/register")
      .send({ email: "test@test.com", password: "abcXYZ123!?" })
      .expect(200);

    const newUser = result.body;

    expect(newUser.message).toBeTruthy();
  });

  test("does not store password in plaintext", async () => {
    const result = await request
      .post("/register")
      .send({ email: "test2@test.com", password: "abcXYZ123!?" });

    const users = subjectApp.get("db").collections.users;
    const newlyCreated = await users.find({ email: "test2@test.com" });

    expect(newlyCreated.hashedPassword).not.toBe("abcXYZ123!?");
  });

  test("does not reuse salt", async () => {
    await request
      .post("/register")
      .send({ email: "test3@test.com", password: "abcXYZ123!?" });

    await request
      .post("/register")
      .send({ email: "test4@test.com", password: "abcXYZ123!?" });

    const users = subjectApp.get("db").collections.users;
    const newlyCreated1 = await users.findOne({ email: "test3@test.com" });
    const newlyCreated2 = await users.findOne({ email: "test4@test.com" });

    expect(newlyCreated1.hashedPassword).not.toBe(newlyCreated2.hashedPassword);
  });

  test("can use XKCD style password", async () => {
    const result = await request
      .post("/register")
      .send({ email: "test@test.com", password: "SomeVeryLongButCommonString" })
      .expect(200);
  });

  test("must provide password", async () => {
    await request
      .post("/register")
      .send({ email: "test@test.com" })
      .expect(400);
  });
  test("must provide email", async () => {
    await request
      .post("/register")
      .send({ password: "SomeVeryLongButCommonString" })
      .expect(400);
  });

  test("must use long password", async () => {
    await request
      .post("/register")
      .send({ email: "test@test.com", password: "short!A" })
      .expect(400);

    await request
      .post("/register")
      .send({ email: "test@test.com", password: "short!AB" })
      .expect(200);
  });

  test("must have special character in short password", async () => {
    await request
      .post("/register")
      .send({ email: "test@test.com", password: "passwordA" })
      .expect(400);
  });

  test("must have upper and lower case character in short password", async () => {
    await request
      .post("/register")
      .send({ email: "test@test.com", password: "!passworda" })
      .expect(400);

    await request
      .post("/register")
      .send({ email: "test@test.com", password: "!PASSWORDA" })
      .expect(400);
  });

  test("can log in with new user", async () => {
    await request
      .post("/register")
      .send({ email: "test@login.com", password: "short!ValidPassword" })
      .expect(200);

    const result = await request
      .post("/login")
      .send({ email: "test@login.com", password: "short!ValidPassword" })
      .expect(200);

    expect(result.body.token).toBeTruthy();
  });
});
