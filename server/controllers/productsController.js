import { getAllProducts } from "../services/productLoader.js";

import {
  saveProduct,
  updateProduct,
  deleteProduct
} from "../services/productWriter.js";

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

export const addProduct = (req, res) => {
  const product = saveProduct(req.body);

  res.status(201).json({
    success: true,
    product
  });
};

export const editProduct = (req, res) => {
  const product = updateProduct(
    req.params.id,
    req.body
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

export const removeProduct = (req, res) => {
  const success = deleteProduct(
    req.params.id,
    req.body.category
  );

  if (!success) {
    return res.status(404).json({
      success: false,
      message: "Product not found"
    });
  }

  res.json({
    success: true,
    message: "Product deleted successfully."
  });
};
