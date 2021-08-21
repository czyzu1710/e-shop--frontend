import client from "./client";

class ProductService {
  async getPage(pageNumber, state) {
    return client.get(
      `/product/page/${pageNumber}?category=${
        state.searchByCategory ? state.searchByCategory.toUpperCase() : ""
      }&sex=${
        state.searchBySex ? state.searchBySex : ""
      }&brands=${encodeURIComponent(state.searchByBrand)}&from=${
        state.from ? state.from : ""
      }&to=${state.to ? state.to : ""}&sortBy=${
        state.sortBy ? state.sortBy : ""
      }`
    );
  }

  async getProductInfo(productId) {
    return await client.get(`/product/${productId}`);
  }
}

export default new ProductService();
