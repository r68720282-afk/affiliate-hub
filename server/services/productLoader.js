import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsFolder = path.join(__dirname, "../data/products");

export function getAllProducts() {
  const files = fs.readdirSync(productsFolder);

  let products = [];

  files.forEach((file) => {
    if (!file.endsWith(".json")) return;

    const filePath = path.join(productsFolder, file);

    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    products = [...products, ...data];
  });

  return products;
}
