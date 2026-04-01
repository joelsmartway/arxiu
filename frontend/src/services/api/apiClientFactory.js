import { UserApiClient } from "./userApi.js";
import { PostApiClient } from "./postApi.js";
import { CategoryApiClient } from "./categoryApi.js";
import { AuthorApiClient } from "./authorApi.js";
import { AuthApiClient } from "./authApi.js";

export const ApiClientType = {
  USERS: "users",
  POSTS: "posts",
  CATEGORIES: "categories",
  AUTHORS: "authors",
  AUTH: "auth",
};

export class ApiClientFactory {
  static createClient(type) {
    switch (type) {
      case ApiClientType.USERS:
        return new UserApiClient();
      case ApiClientType.POSTS:
        return new PostApiClient();
      case ApiClientType.CATEGORIES:
        return new CategoryApiClient();
      case ApiClientType.AUTHORS:
        return new AuthorApiClient();
      case ApiClientType.AUTH:
        return new AuthApiClient();
      default:
        throw new Error(`Unknown API client type: ${type}`);
    }
  }
}
