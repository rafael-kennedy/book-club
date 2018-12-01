const supertest = require("supertest");
const app = require("../app");
let subject;
let request;

describe("error catcher middleware", () => {
  beforeAll(async () => {
    subject = await app({ dbName: "test-error-catcher", listen: false });

    request = supertest(subject);
  });

  test("should return appropriate error code with throw custom util", async () => {
    subject.use(
      "/error1",
      subject.errorCatcher((req, res, next) => {
        subject.throwCustom(400, "Error");
      })
    );

    const result = await request.get("/error1").expect(400);

    expect(result.body.status).toBe(400);
    expect(result.body.message).toBe("Error");
    expect(result.body.stack).toBeTruthy();
  });

  test("should return 500 with generic error", async () => {
    subject.use(
      "/error2",
      subject.errorCatcher((req, res, next) => {
        throw new Error("Real Error");
      })
    );

    const result = await request.get("/error2").expect(500);

    expect(result.body.status).toBe(500);
    expect(result.body.message).toBe("Real Error");
    expect(result.body.stack).toBeTruthy();
  });
});
