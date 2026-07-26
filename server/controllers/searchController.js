import products from "../data/products.json" assert { type: "json" };

export const searchProducts = (req, res) => {
  const q = (req.query.q || "").toLowerCase();

  const results = products.filter((product) =>
    product.title.toLowerCase().includes(q)
  );

  res.status(200).json({
    success: true,
    total: results.length,
    products: results
  });
};
