const subject = require("./request-wrapper");

describe("request wrapper", () => {
  test("catches rejection in error property", async () => {
    const result = await subject(Promise.reject(new Error("Test")));
    expect(result.error).toBeTruthy();
    expect(result.error.message).toBe("Test");
    expect(result.result).toBeFalsy();
  });

  test("returns resolved value in result property", async () => {
    const result = await subject(Promise.resolve(21));
    expect(result.result).toBeTruthy();
    expect(result.result).toBe(21);
    expect(result.error).toBeFalsy();
  });
});
