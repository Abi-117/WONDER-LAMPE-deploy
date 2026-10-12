
import jwt from "jsonwebtoken";

export function adminAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Please login as admin",
      });
    }

    const token = authHeader.slice(7).trim();

    if (!token || !process.env.JWT_SECRET) {
      return res.status(401).json({
        success: false,
        message: "Authentication failed",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (
      typeof decoded === "string" ||
      decoded.role !== "admin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }

    req.admin = decoded;

    return next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token. Please login again.",
    });
  }
}
