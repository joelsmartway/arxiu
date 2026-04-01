import { PostForm } from "./Post";
import { CategoryForm } from "./Category";
import { AuthorForm } from "./Author";

export class ModalFormFactory {
  static createForm(type) {
    switch (type) {
      case "post":
        return PostForm;
      case "category":
        return CategoryForm;
      case "author":
        return AuthorForm;
      default:
        throw new Error(`Unknown Modal form: ${type}`);
    }
  }
}
