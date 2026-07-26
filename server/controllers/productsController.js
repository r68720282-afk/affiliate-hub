import { getAllProducts } from "../services/productLoader.js";

export const getProducts = (req, res) => {
  const products = getAllProducts();

  res.json({
    success: true,
    total: products.length,
    products
  });
};

export const getProductById = (req, res) => {
  const products = getAllProducts();

  const product = products.find(
    (item) => item.id == req.params.id
  );

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found"
    });
  }

  res.json({
    success: true,
    product
  });
};
