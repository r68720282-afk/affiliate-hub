import express from "express";

import {
  getProducts,
  getProductById,
  addProduct,
  editProduct,
  removeProduct
} from "../controllers/productsController.js";

const router = express.Router();

router.get("/", getProducts);

router.get("/:id", getProductById);

router.post("/", addProduct);

router.put("/:id", editProduct);

router.delete("/:id", removeProduct);

export default router;
