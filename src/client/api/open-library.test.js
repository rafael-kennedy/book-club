const { searchPayload, detailPayload } = require("./open-library.fixture");
const {
  transformOpenLibraryData,
  transformBookDetail
} = require("./open-library");

describe("open library search transform function", () => {
  test("returns formatted array of books", () => {
    const output = transformOpenLibraryData(searchPayload());
    expect(output).toMatchSnapshot();
  });
});

describe("open library detail transform function", () => {
  test("returns formatted array of books", () => {
    const output = transformBookDetail(detailPayload());
    expect(output).toMatchSnapshot();
  });
});
