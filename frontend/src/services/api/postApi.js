import ApiClient from "./apiClient";

export class PostApiClient extends ApiClient {
  constructor() {
    super("/posts");
  }

  get({endpoint = "/", params = {}, headers = {}}) {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;
    return this.request(url, "GET", null, headers);
  }

  post({endpoint = "/", body = {}, headers = {}}) {
    return this.request(endpoint, "POST", body, headers);
  }

  put({endpoint = "/", body = {}, headers = {}}) {
    return this.request(endpoint, "PUT", body, headers);
  }

  delete(endpoint = "/", headers = {}) {
    return this.request(endpoint, "DELETE", null, headers);
  }
}
