import rateLimit from "express-rate-limit";

// General API Rate Limiter: max 300 requests per 15 minutes
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "অতিরিক্ত রিকোয়েস্ট পাঠানো হয়েছে। দয়া করে ১৫ মিনিট পর আবার চেষ্টা করুন।",
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
