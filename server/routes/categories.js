import express from "express";

import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from "../controllers/categoriesController.js";

const router = express.Router();

/*
========================================
GET ALL CATEGORIES
GET /api/categories
========================================
*/
router.get("/", getCategories);

/*
========================================
ADD NEW CATEGORY
POST /api/categories
========================================
*/
router.post("/", createCategory);

/*
========================================
UPDATE CATEGORY
PUT /api/categories/:id
========================================
*/
router.put("/:id", updateCategory);

/*
========================================
DELETE CATEGORY
DELETE /api/categories/:id
========================================
*/
router.delete("/:id", deleteCategory);

export default router;
