import express from "express";
import { login, getMe, changePassword } from "../controllers/authController.js";
import { protectAdmin } from "../middlewares/authMiddleware.js";
import { authLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

router.post("/login", authLimiter, login);
router.get("/me", protectAdmin, getMe);
router.put("/change-password", protectAdmin, changePassword);

export default router;
