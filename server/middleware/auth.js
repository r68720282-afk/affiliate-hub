import { activeTokens } from "../controllers/authController.js";

export default function auth(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token || !activeTokens.has(token)) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized"
    });
  }

  next();
}
