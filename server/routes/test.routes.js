import express from "express";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/private", protect, (req, res) => {
  res.json({
    message: "You accessed a protected route 🎉",
    user: req.user,
  });
});

export default router;