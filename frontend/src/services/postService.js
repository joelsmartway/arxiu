import { ApiClientFactory, ApiClientType } from "./api/apiClientFactory";

class PostServiceClass {
  constructor() {
    this.api = ApiClientFactory.createClient(ApiClientType.POSTS);
  }

  async getAll(query = {}) {
    try {
      const response = await this.api.get(query);
      return response;
    } catch (error) {
      console.error("Posts error:", error);
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
    console.error("Post create error:", error);
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
    console.error("Post create error:", error);
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
      console.error("Posts error:", error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const token = localStorage.getItem("token");
      const response = await this.api.delete(`/${id}`,{ Authorization: `Bearer ${token}` });
      return response;
    } catch (error) {
      console.error("Posts error:", error);
      throw error;
    }
  }

}

export const PostService = new PostServiceClass();
