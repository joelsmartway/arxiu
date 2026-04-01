const BASE_URL = import.meta.env.VITE_BACK_URL;

export default class ApiClient {
  constructor(routeRoot = "") {
    if (new.target === ApiClient) {
      throw new TypeError("Cannot construct ApiClient instances directly");
    }
    if (!BASE_URL) {
      throw new Error("REACT_APP_API_BASE_URL is not defined. Check your .env file.");
    }

    this.baseURL = `${BASE_URL}${routeRoot}`;
  }

  async request(endpoint, method = "GET", body = null, headers = {}, query = {}) {
    const config = {
      method,
      headers: {
        ...headers,
      },
    };

    const isFormData = body instanceof FormData;

    if (body) {
      if (isFormData) {
        config.body = body;
      } else {
        config.headers["Content-Type"] = "application/json";
        config.body = JSON.stringify(body);
      }
    }

    const queryString = new URLSearchParams(query).toString();
    const url = `${this.baseURL}${endpoint}${queryString ? `?${queryString}` : ""}`;

    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API request failed with status ${response.status}`);
    }

    return response.json();
  }

  get(endpoint, headers = {}) {
    throw new Error("Method 'get()' must be implemented.");
  }

  post(endpoint, body, headers = {}) {
    throw new Error("Method 'post()' must be implemented.");
  }

  put(endpoint, body, headers = {}) {
    throw new Error("Method 'put()' must be implemented.");
  }

  delete(endpoint, headers = {}) {
    throw new Error("Method 'delete()' must be implemented.");
  }
}
