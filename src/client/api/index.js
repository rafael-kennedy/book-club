import * as request from "superagent";
import jwt from "jsonwebtoken";
import { transformOpenLibraryData, transformBookDetail } from "./open-library";

export class APIWrapper {
  constructor() {
    const token = localStorage["book-club-token"];
    if (token) {
      this.processToken(token);
    }
  }

  // UTILITY METHODS

  getUrl() {
    const root = new URL(window.location.href);
    root.port = this.port || "3000";
    return root;
  }

  static setStoredToken(token) {
    if (localStorage["book-club-token"] !== token) {
      localStorage.setItem("book-club-token", token);
    }
  }

  static clearStoredToken() {
    localStorage.removeItem("book-club-token");
  }

  processToken(token) {
    const payload = jwt.decode(token);
    const { iat, exp, ...user } = payload;
    const tokenExpired = Date.now() / 1000 > exp;
    if (tokenExpired) {
      APIWrapper.clearStoredToken();
    } else {
      this.token = token;
      this.user = user;
      APIWrapper.setStoredToken(token);
    }
  }

  // API METHODS
  // LOCAL APIS

  async login(email, password) {
    const res = await request
      .post(this.getUrl() + "login")
      .send({ email, password })
      .set("accept", "json");

    this.processToken(res.body.token);

    return this.user;
  }

  logout() {
    this.token = null;
    APIWrapper.clearStoredToken();
  }

  async register(email, password) {
    await request
      .post(this.getUrl() + "register")
      .send({ email, password })
      .set("accept", "json");

    return this.login(email, password);
  }

  // THIRD PARTY APIS

  async searchBooks(term) {
    const urlBase = "http://openlibrary.org/search.json?q=";
    const search = term.replace(/\s/g, "+");
    const res = await request.get(urlBase + search);
    // TODO: Clean this up, need better docs on this API, currently returns data
    // as text
    const body = JSON.parse(res.text);
    return transformOpenLibraryData(body);
  }

  async getBookDetails(book) {
    const workUrl = `https://openlibrary.org${book.key}.json`;
    const res = await request.get(workUrl).set("accept", "json");
    return { ...book, ...transformBookDetail(res.body) };
  }
}

const apiWrapperSingleton = new APIWrapper();

export default apiWrapperSingleton;
