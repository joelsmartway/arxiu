import { ApiClientFactory, ApiClientType } from "./api/apiClientFactory";

class UserServiceClass {
  constructor() {
    this.api = ApiClientFactory.createClient(ApiClientType.USERS);
  }

  async login(email, password) {
    try {
      const response = await this.api.post('/login', {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }
}

export const UserService = new UserServiceClass();
