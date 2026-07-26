import express from "express";
import auth from "../middleware/auth.js";

import {
  getProducts,
  getProductById,
  addProduct,
  editProduct,
  removeProduct
} from "../controllers/productsController.js";

const router = express.Router();

/* Public APIs */

router.get("/", getProducts);

router.get("/:id", getProductById);

/* Admin Only APIs */

router.post("/", auth, addProduct);

router.put("/:id", auth, editProduct);

router.delete("/:id", auth, removeProduct);

export default router;
