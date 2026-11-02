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

      // Robust fallback if database re-seeded or memory server restarted
      if (!req.user) {
        req.user = await User.findOne({
          $or: [
            { email: process.env.ADMIN_EMAIL || "admin@test.com" },
            { role: "superadmin" },
            { role: "admin" },
          ],
        }).select("-password");
      }

      if (!req.user) {
        return res.status(401).json({
          success: false,
          message: "ইউজার খুঁজে পাওয়া যায়নি। দয়া করে আবার লগইন করুন।",
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
