const express = require("express");
const ProductManager = require("./main.js");
const container = new ProductManager("./product.json");

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  try {
    const limit = req.query.limit;
    const products = await container.getProducts();
    if (limit) {
      res.json(products.slice(0, limit));
    } else {
      res.json(products);
    }
  } catch (error) {
    res.json({ message: "hubo un error" });
  }
});

app.get("/products/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const product = await container.getProductById(parseInt(id));
    if (product) {
      res.json(product);
    } else {
      res.json({ error: "product not find" });
    }
  } catch (error) {
    res.json({ message: "hubo un error" });
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
