import express from "express";

import {
  login,
  logout,
  verifyToken
} from "../controllers/authController.js";

const router = express.Router();

router.post("/login", login);

router.get("/verify", verifyToken);

router.post("/logout", logout);

export default router;
