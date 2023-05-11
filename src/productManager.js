import fs from "fs";

export class ProductManager {
  constructor() {
    this.path = "./src/product.json";
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
      //let lastProductId = data.lenght > 0 ? data[data.lenght - 1].id + 1 : 1;
      let id = data[data.length - 1]?.id + 1;

      const newProduct = { id: id, ...product };
      data.push(newProduct);
      const productString = JSON.stringify(data, null, 2);
      await fs.promises.writeFile("./src/product.json", productString);
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

  async updateProduct(id, newData) {
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
  id: 1,
  title: "buzo",
  description: "buzo de lana1",
  thumbnail: "foto",
  stock: 12,
  code: "123",
  price: 123,
};
const product2 = {
  id: 2,
  title: "remera",
  description: "remera1",
  thumbnail: "foto",
  stock: 13,
  code: "1234",
  price: 1234,
};
const product3 = {
  title: "pantalon",
  description: "pantalon1",
  thumbnail: "foto",
  stock: 13,
  code: "12345",
  price: 12345,
};
const product4 = {
  title: "campera",
  description: "campera1",
  thumbnail: "foto",
  stock: 13,
  code: "123456",
  price: 123456,
};
const product5 = {
  title: "bufanda",
  description: "bufanda1",
  thumbnail: "foto",
  stock: 13,
  code: "1234567",
  price: 1234567,
};
const product6 = {
  title: "gorro",
  description: "gorro1",
  thumbnail: "foto",
  stock: 13,
  code: "12345678",
  price: 1234567,
};

/* const productsManager = new ProductManager();
const asyncFn = async () => {
  await productsManager.addProduct(product1);
  await productsManager.addProduct(product2);
  await productsManager.addProduct(product3);
  await productsManager.addProduct(product4);
  await productsManager.addProduct(product5);
  await productsManager.addProduct(product6);
};
asyncFn(); */
