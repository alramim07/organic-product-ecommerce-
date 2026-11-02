import express from "express";
import {
  createOrder,
  getOrders,
  getOrderStats,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} from "../controllers/orderController.js";
import { protectAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", protectAdmin, getOrders);
router.get("/stats", protectAdmin, getOrderStats);
router.get("/:id", protectAdmin, getOrderById);
router.put("/:id/status", protectAdmin, updateOrderStatus);
router.delete("/:id", protectAdmin, deleteOrder);

export default router;
