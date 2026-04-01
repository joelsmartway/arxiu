import { ApiClientFactory, ApiClientType } from "./api/apiClientFactory";

class AuthServiceClass {
  constructor() {
    this.api = ApiClientFactory.createClient(ApiClientType.AUTH);
  }

  async login(query = {}) {
    try {
      const response = await this.api.post("/login", query);
      return response;
    } catch (error) {
      console.error("Auth error:", error);
      throw error;
    }
  }

  async status(query = {}) {
    try {
      const response = await this.api.post("/status", query);
      return response;
    } catch (error) {
      console.error("Auth error:", error);
      throw error;
    }
  }
}

export const AuthService = new AuthServiceClass();
