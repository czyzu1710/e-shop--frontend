import client from "./client";
import header from "./header";

class ProductService {
  getProduct(id) {
    return client.get(`product/${id}`);
  }

  deleteProduct(id) {
    return client.delete(`product/${id}`, {
      headers: header(),
    });
  }

  addProduct(
    component,
    images,
    newCat,
    newBrand,
    available_sizes,
    cat,
    brands
  ) {
    let avSizes = [];
    Object.entries(available_sizes).forEach(([key, value]) => {
      if (value) {
        avSizes.push(key);
      }
    });

    const formData = new FormData();
    const product = {
      name: component.name,
      quantity: component.quantity,
      brand: component.brand,
      description: component.description,
      category: component.category_name,
      price: component.price,
      sizes: avSizes,
      for: component.for ? "MALE" : "FEMALE",
      custom_category: newCat !== "" && !cat.includes(newCat),
      custom_brand: newBrand !== "" && !brands.includes(newBrand),
    };

    let imgArr = [];
    images.forEach((photo, i) => {

      const imgPrepare = {
        content: JSON.stringify(photo),
        name: photo.file.name,
        type: photo.file.type,
      };
      imgArr.push(imgPrepare);

    });
    formData.append("image", JSON.stringify(imgArr));
    formData.append("data", JSON.stringify(product));

    return client
      .post(`/product/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        return response.data;
      });
  }

  restockProduct(component, id) {
    const product = {
      types: component.types,
    };

    return client.post(`product/${id}`, product, {
      headers: header(),
    });
  }
}

export default new ProductService();
