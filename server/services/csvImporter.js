import fs from "fs";
import csv from "csv-parser";

export function parseCSV(filePath) {
  return new Promise((resolve, reject) => {
    const products = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        products.push({
          title: row.title?.trim() || "",
          category: row.category?.trim() || "Other",
          brand: row.brand?.trim() || "",
          price: row.price?.trim() || "",
          image: row.image_url?.trim() || "",
          affiliateLink: row.affiliate_link?.trim() || "",
          description: row.description?.trim() || ""
        });
      })
      .on("end", () => resolve(products))
      .on("error", reject);
  });
}
