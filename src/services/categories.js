import client from "./client";

class CategoryService {
  getCategories() {
    return client.get(`category/all`);
  }

  getCategory(id) {
    return client.get(`category/${id}`);
  }
}

export default new CategoryService();
