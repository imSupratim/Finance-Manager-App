import express from "express";
import {
  addCategory,
  getCategories,
  deleteCategory,
} from "../controllers/category.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protect, addCategory);
router.get("/", protect, getCategories);
router.delete("/:id", protect, deleteCategory);

export default router;
