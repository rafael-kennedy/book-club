import { LitElement, html } from "@polymer/lit-element";

import { authenticate } from "../api/service-wrapper";

class ECLogin extends LitElement {
  static get properties() {
    return {
      mood: { type: String }
    };
  }

  inputEmail(value) {
    this.email = value.target.value;
  }

  inputPassword(value) {
    this.password = value.target.value;
  }

  submitIfEnter(event) {
    if (event.key === "Enter") {
      this.submit();
    }
  }

  async submit() {
    const { email, password } = this;
    let user;
    try {
      user = await authenticate(email, password);
      debugger;
      this.dispatchEvent(new CustomEvent("login-success", { detail: user }));
    } catch (error) {
      debugger;
      this.dispatchEvent(new CustomEvent("login-failure", { detail: error }));
    }
  }

  constructor() {
    super();
    this.email = "";
    this.password = "";
  }

  render() {
    return html`
      <style>
        .mood {
          color: green;
        }
      </style>
      <div @keydown="${this.submitIfEnter}">
        <input
          @input="${this.inputEmail}"
          label="Email or Username"
          type="email"
        />
        <input
          @input="${this.inputPassword}"
          label="Password"
          type="password"
        />
      </div>
    `;
  }
}

customElements.define("ec-login", ECLogin);
