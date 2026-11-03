import express from "express";
import {
  getProductReviews,
  getAllReviews,
  createReview,
  updateReviewStatus,
  deleteReview,
} from "../controllers/reviewController.js";
import { protectAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/", createReview);
router.get("/product/:productId", getProductReviews);

// Protected Admin routes
router.get("/", protectAdmin, getAllReviews);
router.put("/:id/status", protectAdmin, updateReviewStatus);
router.delete("/:id", protectAdmin, deleteReview);

export default router;
