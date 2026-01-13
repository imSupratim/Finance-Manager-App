import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getBudgets, upsertBudget } from "../controllers/budget.controller.js";
import Budget from "../models/Budget.js";

const router = express.Router();

router.get("/", protect, getBudgets);
router.post("/", protect, upsertBudget);
router.delete("/:id", protect, async (req, res) => {
  try {
    await Budget.findByIdAndDelete(req.params.id);
    res.json({ message: "Budget deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete budget" });
  }
});

export default router;
