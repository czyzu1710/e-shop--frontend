import client from "./client";
import header from "./header";

class BrandService {
  getBrand(id) {
    return client.get(`/brand/${id}`);
  }

  getBrands() {
    return client.get(`/brand/all`);
  }

  deleteBrand(id) {
    return client.delete(`/brand/${id}`, {
      headers: header(),
    });
  }

  addBrand(component) {
    const formData = new FormData();
    const product = {
      name: component.name,
      createdOn: new Date(),
    };

    const blob = new Blob([JSON.stringify(product)], {
      type: "application/json",
    });
    formData.append("data", blob);
    formData.append("photo", component.image);

    return client.post(`product`, formData, {
      headers: header(),
    });
  }

  updateBrand(component, id) {
    const formData = new FormData();
    const product = {
      name: component.name,
      createdOn: new Date(),
    };

    const blob = new Blob([JSON.stringify(product)], {
      type: "application/json",
    });
    formData.append("data", blob);
    formData.append("photo", component.image);

    return client.post(`product/${id}`, formData, {
      headers: header(),
    });
  }
}

export default new BrandService();
