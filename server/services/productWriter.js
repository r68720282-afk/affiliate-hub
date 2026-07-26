import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsFolder = path.join(__dirname, "../data/products");

function getCategoryFile(category) {
  return path.join(
    productsFolder,
    `${category.toLowerCase().replace(/\s+/g, "-")}.json`
  );
}

export function saveProduct(product) {
  const file = getCategoryFile(product.category);

  let products = [];

  if (fs.existsSync(file)) {
    products = JSON.parse(fs.readFileSync(file, "utf8"));
  }

  products.push(product);

  fs.writeFileSync(
    file,
    JSON.stringify(products, null, 2)
  );

  return product;
}

export function updateProduct(id, updatedProduct) {
  const file = getCategoryFile(updatedProduct.category);

  if (!fs.existsSync(file)) {
    return null;
  }

  let products = JSON.parse(
    fs.readFileSync(file, "utf8")
  );

  const index = products.findIndex(
    (p) => p.id == id
  );

  if (index === -1) {
    return null;
  }

  products[index] = {
    ...products[index],
    ...updatedProduct
  };

  fs.writeFileSync(
    file,
    JSON.stringify(products, null, 2)
  );

  return products[index];
}

export function deleteProduct(id, category) {
  const file = getCategoryFile(category);

  if (!fs.existsSync(file)) {
    return false;
  }

  let products = JSON.parse(
    fs.readFileSync(file, "utf8")
  );

  const newProducts = products.filter(
    (p) => p.id != id
  );

  if (products.length === newProducts.length) {
    return false;
  }

  fs.writeFileSync(
    file,
    JSON.stringify(newProducts, null, 2)
  );

  return true;
}
