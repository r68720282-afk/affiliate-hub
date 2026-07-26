import express from "express";
import { login, verifyToken, logout } from "../controllers/authController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Login
router.post("/login", login);

// Verify Token
router.get("/verify", authMiddleware, verifyToken);

// Logout
router.post("/logout", authMiddleware, logout);

export default router;
