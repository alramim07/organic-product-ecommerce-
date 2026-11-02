import express from "express";
import {
  recordVisit,
  getVisitorStats,
} from "../controllers/visitorController.js";

const router = express.Router();

router.post("/record", recordVisit);
router.get("/stats", getVisitorStats);

export default router;
