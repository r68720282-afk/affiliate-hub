import crypto from "crypto";
import { ADMIN } from "../config/admin.js";

export const activeTokens = new Set();

export const login = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and Password are required."
    });
  }

  if (
    email !== ADMIN.email ||
    password !== ADMIN.password
  ) {
    return res.status(401).json({
      success: false,
      message: "Invalid Email or Password"
    });
  }

  const token = crypto.randomBytes(32).toString("hex");

  activeTokens.add(token);

  res.json({
    success: true,
    token,
    admin: {
      email: ADMIN.email
    }
  });
};

export const verifyToken = (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token || !activeTokens.has(token)) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
  }

  res.json({
    success: true,
    admin: {
      email: ADMIN.email
    }
  });
};

export const logout = (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (token) {
    activeTokens.delete(token);
  }

  res.json({
    success: true,
    message: "Logged out successfully."
  });
};
