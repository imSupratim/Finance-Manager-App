import express from "express";
import axios from "axios";

const router = express.Router();

router.get("/finance", async (req, res) => {
  try {
    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        category: "business",
        language: "en",
        apiKey: process.env.NEWS_API_KEY,
      },
    });

    res.json(response.data.articles);
  } catch (error) {
    console.error("News API Error:", error.message);
    res.status(500).json({ message: "Failed to fetch news" });
  }
});

export default router;
