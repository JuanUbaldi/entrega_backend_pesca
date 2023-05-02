const fs = require("fs");

class ProductManager {
  constructor() {
    this.path = "./src/product.json";
    /*  this.id = id; */
  }
  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf8");
        return JSON.parse(data);
      }
      await fs.promises.writeFile(this.path, JSON.stringify([]));
      return [];
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async addProduct(product) {
    try {
      let data = await this.getProducts();
      const searchCode = data.find((p) => p.code === product.code);
      if (searchCode) {
        return "this code already exist";
      }
      if (
        !product.title ||
        !product.description ||
        !product.thumbnail ||
        !product.code ||
        !product.price ||
        !product.stock
      ) {
        return "field missing";
      }
      const lastProductId = data.lenght > 0 ? data[data.lenght - 1].id : 1;

      const newProduct = { ...product, id: lastProductId };
      data.push(newProduct);
      const productString = JSON.stringify(data, null, 2);
      await fs.promises.writeFile("product.json", productString);
      return newProduct;
    } catch (error) {
      throw new Error(error);
    }
  }
  async getProductById(id) {
    try {
      let data = await this.getProducts();
      const productFound = data.find((product) => product.id === id);
      if (!productFound) {
        throw new error("product not found");
      }
      return productFound;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id, newData) {
    let data = await this.getProducts();
    const position = data.findIndex((product) => product.id === id);
    if (position !== -1) {
      data[position] = { ...data[position], ...newData };
      const productString = JSON.stringify(data, null, 2);
      await fs.promises.writeFile("product.json", productString);
      return "product updated";
    }
  }
  async deleteProduct(id) {
    const products = await this.getProducts();
    if (!products.some((product) => product.id === id)) {
      return "producto no encontrado";
    }
    const newProducts = products.filter((product) => product.id !== id);
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(newProducts, null, 2)
    );
  }
}
const product1 = {
  title: "pescado1",
  description: "pescado",
  thumbnail: "foto",
  stock: 12,
  code: "3345",
  price: 123,
};
const product2 = {
  title: "pescado2",
  description: "pescado",
  thumbnail: "foto",
  stock: 13,
  code: "33345",
  price: 122,
};
const product3 = {
  title: "pescado3",
  description: "pescado",
  thumbnail: "foto",
  stock: 13,
  code: "133345",
  price: 122,
};
/* const productsManager = new ProductManager();
const asyncFn = async () => {
  console.log(await productsManager.addProduct(product1));
  console.log(await productsManager.addProduct(product3));
  console.log(await productsManager.getProducts());
};
asyncFn(); */

module.exports = ProductManager;
