import { getAllProducts } from "../services/productLoader.js";

export const searchProducts = (req, res) => {
  const products = getAllProducts();

  const keyword = (req.query.q || "").toLowerCase();

  const results = products.filter((product) => {
    return (
      product.title.toLowerCase().includes(keyword) ||
      product.brand.toLowerCase().includes(keyword) ||
      product.category.toLowerCase().includes(keyword)
    );
  });

  res.json({
    success: true,
    total: results.length,
    products: results
  });
};
