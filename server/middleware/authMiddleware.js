import { TOKENS } from "../config/admin.js";

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!TOKENS.has(token)) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }

  req.token = token;
  next();
}
