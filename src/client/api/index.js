import request from "superagent";
import jwt from "jsonwebtoken";

export class APIWrapper {
  getUrl() {
    const root = new URL(window.location.href);
    root.port = this.port || "3000";
    return root;
  }

  async login(email, password) {
    const res = await request
      .post(this.getUrl() + "login")
      .send({ email, password }) // sends a JSON post body
      .set("accept", "json");

    this.token = res.body.token;
    const payload = jwt.decode(this.token);
    const { iat, exp, ...user } = payload;
    return user;
  }

  async register(email, password) {
    const res = await request
      .post(this.getUrl() + "register")
      .send({ email, password }) // sends a JSON post body
      .set("accept", "json");

    this.token = res.token;
  }

  async searchBooks(term) {
    const urlBase = "http://openlibrary.org/search.json?q=";
    const search = term.replace(/\s/g, "+");
    const res = await request.get(urlBase + search);
    debugger;
  }
}

const apiWrapperSingleton = new APIWrapper();

export default apiWrapperSingleton;
