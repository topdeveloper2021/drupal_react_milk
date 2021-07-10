const fetch = require("node-fetch");

export interface AccessTokenInterface {
  token_type: string;
  expires_in: number;
  access_token: string;
}

export class AccessToken {
  token_type: string;
  expires_in: number;
  access_token: string;

  constructor(incoming: AccessTokenInterface = null) {
    if (incoming !== null) {
      Object.assign(this, incoming);
    }
    if (this.token_type === undefined) {
      Object.assign(this, AccessToken.getToken());
    }
  }

  static async getToken() {
    return fetch("http://localhost:8080/oauth/token?_format=json", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      },
      body:
        "client_secret=Now-is-the-time&client_id=3cc0308d-8a81-4f43-b380-8f3fb6a8f46b&grant_type=password&username=admin&password=password",
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err.message);
      });
  }

  get Authorization(): string {
    return this.token_type?.concat(" ", this.access_token);
  }

  get requestHeaders() {
    return this.token_type
      ? {
          Authorization: this.token_type?.concat(" ", this.access_token),
        }
      : null;
  }
}

export default AccessToken;
