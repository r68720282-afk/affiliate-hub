import express from "express";
import { importProduct } from "../controllers/importController.js";

const router = express.Router();

router.post("/", importProduct);

export default router;
