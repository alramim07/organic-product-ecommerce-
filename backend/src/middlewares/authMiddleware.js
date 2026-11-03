import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectAdmin = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "ammwala_super_secret_jwt_key_2026_secured"
      );
      req.user = await User.findById(decoded.id).select("-password");

      // Verify user has legitimate admin/superadmin role
      if (!req.user && decoded.email) {
        req.user = await User.findOne({ email: decoded.email }).select("-password");
      }

      if (!req.user || (req.user.role !== "admin" && req.user.role !== "superadmin")) {
        return res.status(401).json({
          success: false,
          message: "অননুমোদিত এক্সেস! ইউজার খুঁজে পাওয়া যায়নি বা অ্যাডমিন পারমিশন নেই।",
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "অননুমোদিত এক্সেস! টোকেন সঠিক নয় বা মেয়াদোত্তীর্ণ।",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "অননুমোদিত এক্সেস! কোনো টোকেন পাওয়া যায়নি।",
    });
  }
};
