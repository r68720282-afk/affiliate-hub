import fs from "fs/promises";
import path from "path";
import categories from "../data/categories.json" with { type: "json" };

const filePath = path.resolve("server/data/categories.json");

async function saveCategories(data) {
  await fs.writeFile(
    filePath,
    JSON.stringify(data, null, 2)
  );
}

export const getCategories = (req, res) => {
  res.json({
    success: true,
    total: categories.length,
    categories
  });
};

export const createCategory = async (req, res) => {

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      message: "Category name is required."
    });
  }

  const newCategory = {
    id: Date.now(),
    name,
    slug: name
      .toLowerCase()
      .replace(/\s+/g, "-"),
    icon: "📦"
  };

  categories.push(newCategory);

  await saveCategories(categories);

  res.status(201).json({
    success: true,
    category: newCategory
  });

};

export const updateCategory = async (req, res) => {

  const id = Number(req.params.id);

  const category = categories.find(
    item => item.id === id
  );

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found."
    });
  }

  category.name = req.body.name;
  category.slug = req.body.name
    .toLowerCase()
    .replace(/\s+/g, "-");

  await saveCategories(categories);

  res.json({
    success: true,
    category
  });

};

export const deleteCategory = async (req, res) => {

  const id = Number(req.params.id);

  const index = categories.findIndex(
    item => item.id === id
  );

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Category not found."
    });
  }

  categories.splice(index, 1);

  await saveCategories(categories);

  res.json({
    success: true,
    message: "Category deleted."
  });

};
