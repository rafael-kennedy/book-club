const express = require("express");
const supertest = require("supertest");
const setUser = require("./set-user");
const tokens = require("../../test/utils/fixture-tokens");
let app;
let request;

describe("set user method", () => {
  beforeAll(async () => {
    app = express();
    app.post("/test", setUser);
    request = supertest(app);
  });

  test("throws 403 on missing token", async () => {
    const res = await request
      .post("/test")
      .send({ payload: true })
      .expect(403);

    expect(res.body).toMatchSnapshot();
  });

  test("throws 403 on expired token", async () => {
    const res = await request
      .post("/test")
      .set("Authorization", "Bearer " + tokens.oldToken)
      .send({ payload: true })
      .expect(403);

    expect(res.body).toMatchSnapshot();
  });

  test("throws 403 on incorrectly signed token", async () => {
    const res = await request
      .post("/test")
      .set("Authorization", "Bearer " + tokens.invalidToken)
      .send({ payload: true })
      .expect(403);

    expect(res.body).toMatchSnapshot();
  });

  test("sets user on correctly signed token", async () => {
    app.post("/test", (req, res) => {
      expect(req.user).toMatchSnapshot();
      res.status(200).send("ok");
    });

    const res = await request
      .post("/test")
      .set("Authorization", "Bearer " + tokens.validToken)
      .send({ payload: true })
      .expect(200);

    expect(res.body).toMatchSnapshot();
  });
});
