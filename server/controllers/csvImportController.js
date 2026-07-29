import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { parseCSV } from "../services/csvImporter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PRODUCTS_FILE = path.join(
  __dirname,
  "../data/products/products.json"
);

const createSlug = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const uploadCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a CSV file."
      });
    }

    const importedProducts = await parseCSV(req.file.path);

    let products = [];

    if (fs.existsSync(PRODUCTS_FILE)) {
      const data = fs.readFileSync(PRODUCTS_FILE, "utf8");

      if (data.trim()) {
        products = JSON.parse(data);
      }
    }

    const existingSlugs = new Set(
      products.map((p) => p.slug)
    );

    const newProducts = [];

    for (const product of importedProducts) {

      const slug = createSlug(product.title);

      if (existingSlugs.has(slug)) {
        continue;
      }

      existingSlugs.add(slug);

      newProducts.push({
        id: Date.now() + Math.floor(Math.random() * 10000),
        slug,
        title: product.title,
        category: product.category,
        brand: product.brand,
        price: product.price,
        image: product.image,
        affiliateLink: product.affiliateLink,
        description: product.description,
        createdAt: new Date().toISOString()
      });
    }

    products.push(...newProducts);

    fs.writeFileSync(
      PRODUCTS_FILE,
      JSON.stringify(products, null, 2)
    );

    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(200).json({
      success: true,
      imported: newProducts.length,
      skipped: importedProducts.length - newProducts.length,
      total: products.length,
      message: "CSV imported successfully."
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
