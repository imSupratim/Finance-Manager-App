import express from "express";
import {
  getSummary,
  categoryWiseExpense,
  monthlySummary,
} from "../controllers/analytics.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/summary", protect, getSummary);
router.get("/category-expense", protect, categoryWiseExpense);
router.get("/monthly", protect, monthlySummary);

export default router;
