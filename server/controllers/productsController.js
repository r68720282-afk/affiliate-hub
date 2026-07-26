import products from "../data/products.json" assert { type: "json" };

export const getProducts = (req, res) => {
  res.status(200).json({
    success: true,
    total: products.length,
    products
  });
};

export const getProductById = (req, res) => {
  const { id } = req.params;

  const product = products.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found"
    });
  }

  res.status(200).json({
    success: true,
    product
  });
};
