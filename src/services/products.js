import client from "./client";

class ProductService {
  async getPage(pageNumber, state) {
    return client.get(
      `/product/page/${pageNumber}`
    );
  }

  async getProductInfo(productId) {
    return await client.get(`/product/${productId}`);
  }
}

export default new ProductService();
