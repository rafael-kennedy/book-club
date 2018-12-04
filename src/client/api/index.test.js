import jwt from "jsonwebtoken";
const mockSuperAgent = require("../../test/superagent");

// need to require these commonjs style within the beforeAll to get around
// jest's hoisting behavior
let APIWrapper;
let superAgent;

const validToken = jwt.sign({ email: "fake@fake.fake", _id: "1" }, "secret", {
  expiresIn: "1d"
});
const oldToken = jwt.sign(
  {
    email: "fake@fake.fake",
    _id: "1",
    iat: Math.floor(Date.now() / 1000) - 25 * 60 * 60 * 1000
  },
  "secret",
  {
    expiresIn: "1d"
  }
);
beforeAll(() => {
  jest.doMock("superagent", () => mockSuperAgent);
  superAgent = require("superagent");
  APIWrapper = require("./index").APIWrapper;
});
beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe("authentication methods", () => {
  test("calls auto login if valid token exists", () => {
    localStorage.setItem("book-club-token", validToken);
    const subject = new APIWrapper();
    expect(subject.user).toBeTruthy();
  });

  test("doesn't auto login if token is expired", () => {
    localStorage.setItem("book-club-token", oldToken);
    const subject = new APIWrapper();
    expect(subject.user).toBeFalsy();
  });

  test("login method works", async () => {
    const subject = new APIWrapper();
    superAgent.__setMockResponse({ body: { token: validToken } });
    await subject.login("fake@email.com", "password");
    expect(superAgent.post).toHaveBeenCalledWith("http://localhost:3000/login");
    expect(subject.user).toBeTruthy();
    expect(subject.token).toBe(validToken);
  });

  test("register method works", async () => {
    const subject = new APIWrapper();
    superAgent.__setMockResponse({ body: { token: validToken } });
    await subject.register("fake@email.com", "password");
    expect(superAgent.post).toHaveBeenCalledWith(
      "http://localhost:3000/register"
    );
    expect(subject.user).toBeTruthy();
    expect(subject.token).toBe(validToken);
  });
});
