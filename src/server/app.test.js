const subject = require("./app");
const supertest = require("supertest");
let app;

describe("main app function", () => {
  test("respects port parameter", async () => {
    app = await subject({ port: 3001 });
    const request = supertest("http://localhost:3001");
    await request.get("/nonexistent").expect(404);
  });

  test("defaults to port 3000", async () => {
    app = await subject({});
    const request = supertest("http://localhost:3000");
    await request.get("/nonexistent").expect(404);
  });

  test("respects listen parameter", async () => {
    app = await subject({ listen: false, port: 3002 });
    const request = supertest("http://localhost:3002");
    const result = await request.get("/nonexistent").catch(error => error);
    expect(result.code).toBe("ECONNREFUSED");
  });
});
