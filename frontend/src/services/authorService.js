import { ApiClientFactory, ApiClientType } from "./api/apiClientFactory";

class AuthorServiceClass {
  constructor() {
    this.api = ApiClientFactory.createClient(ApiClientType.AUTHORS);
  }

  async getAll(query = {}) {
    try {
      const response = await this.api.get(query);
      return response;
    } catch (error) {
      console.error("Authors error:", error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const response = await this.api.get({
        endpoint: `/${id}`,
      });
      return response;
    } catch (error) {
      console.error("Authors error:", error);
      throw error;
    }
  }
  async create(body = {}) {
    try {
      const token = localStorage.getItem("token");

      const response = await this.api.post({
        body,
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });

      return response;
    } catch (error) {
      console.error("Category create error:", error);
      throw error;
    }
  }
  async update(id,body = {}) {
    try {
      const token = localStorage.getItem("token");

      const response = await this.api.put({
        endpoint:`/${id}`,
        body,
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });

      return response;
    } catch (error) {
      console.error("Category create error:", error);
      throw error;
    }
  }


  async delete(id) {
    try {
      const token = localStorage.getItem("token");
      const response = await this.api.delete(`/${id}`,{ Authorization: `Bearer ${token}` });
      return response;
    } catch (error) {
      console.error("Categories error:", error);
      throw error;
    }
  }
}

export const AuthorService = new AuthorServiceClass();
