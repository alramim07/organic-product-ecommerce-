import rateLimit from "express-rate-limit";

// General API Rate Limiter: max 1500 requests per 15 minutes, skips local dev
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1500,
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) =>
    req.ip === "127.0.0.1" ||
    req.ip === "::1" ||
    req.ip === "::ffff:127.0.0.1" ||
    (req.method === "GET" && req.path.startsWith("/settings")),
  message: {
    success: false,
    message: "Too many requests. Please try again after a few minutes.",
  },
});

// Strict Auth Rate Limiter: max 20 login attempts per 15 minutes
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "অতিরিক্ত লগইন চেষ্টা করা হয়েছে। ১৫ মিনিট পর চেষ্টা করুন।",
  },
});
