import ApiClient from "./apiClient";

export class UserApiClient extends ApiClient {
  constructor() {
    super("/users");
  }

  get(endpoint = "/", headers = {}) {
    return this.request(endpoint, "GET", null, headers);
  }

  post(endpoint = "/", body, headers = {}) {
    return this.request(endpoint, "POST", body, headers);
  }

  login(endpoint = "/", body, headers = {}) {
    return this.request(endpoint, "POST", body, headers);
  }

  put(endpoint = "/", body, headers = {}) {
    return this.request(endpoint, "PUT", body, headers);
  }

  delete(endpoint = "/", headers = {}) {
    return this.request(endpoint, "DELETE", null, headers);
  }
}
