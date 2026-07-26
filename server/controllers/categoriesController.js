import categories from "../data/categories.json" assert { type: "json" };

export const getCategories = (req, res) => {
  res.status(200).json({
    success: true,
    total: categories.length,
    categories
  });
};
