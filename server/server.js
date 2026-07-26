import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import productRoutes from "./routes/products.js";
import categoryRoutes from "./routes/categories.js";
import searchRoutes from "./routes/search.js";
import importRoutes from "./routes/import.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    project: "Affiliate Hub API",
    version: "1.0.0"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/import", importRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
