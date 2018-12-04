const { tokenizedUserId } = require("../../test/utils/fixture-tokens");
const { ObjectId } = require("bson");

module.exports.incomingPayload = () => ({
  title: "A darker shade of magic",
  key: "/works/OL17332803W",
  author: "Victoria Schwab",
  published: 2015,
  cover: "https://covers.openlibrary.org/w/id/7410930-S.jpg",
  description:
    "STEP INTO A UNIVERSE OF DARING ADVENTURE, THRILLING POWER, AND MULTIPLE LONDONS.",
  coverURL: "https://covers.openlibrary.org/w/id/7410930-L.jpg"
});

module.exports.seedData = () => [
  {
    _id: ObjectId("5c06edc72ca07777df1dff64"),
    title: "One Shot",
    key: "/works/OL52953W",
    author: "Lee Child",
    published: 2005,
    cover: "https://covers.openlibrary.org/w/id/240050-S.jpg",
    description: "Six shots.  and cunning—and then beat him shot for shot.",
    coverURL: "https://covers.openlibrary.org/w/id/240050-L.jpg",
    nominatedBy: ObjectId(tokenizedUserId)
  },
  {
    _id: ObjectId("5c06f1ef004799790f896d33"),
    title: "Time Out Madrid",
    key: "/works/OL7971169W",
    author: "Time Out",
    published: 2004,
    cover: "https://covers.openlibrary.org/w/id/951934-S.jpg",
    description: "No description provided",
    coverURL: "https://covers.openlibrary.org/w/id/951934-L.jpg",
    nominatedBy: ObjectId(tokenizedUserId)
  },
  {
    _id: ObjectId("5c06f62d1739f87b9e8ffd1c"),
    title: "Time Enough for Love",
    key: "/works/OL59694W",
    author: "Robert A. Heinlein",
    published: 1973,
    cover: "https://covers.openlibrary.org/w/id/6569996-S.jpg",
    description:
      "Heinlein brought back Lazarus Long (his almost immortal) and covered parts of his life. It is one of Heinlein's best life, love, immortality and death.",
    coverURL: "https://covers.openlibrary.org/w/id/6569996-L.jpg",
    nominatedBy: ObjectId("5c05e8a02cfef52e5b197fbb")
  }
];
