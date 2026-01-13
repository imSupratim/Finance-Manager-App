import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import testRoute from './routes/test.routes.js';
import transactionRoutes from "./routes/transaction.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import budgetRoutes from './routes/budget.routes.js';
import newsRoutes from "./routes/news.routes.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());


app.use('/api/auth', authRoutes);
app.use('/api/test', testRoute);
app.use('/api/transactions', transactionRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/analytics", analyticsRoutes)
app.use("/api/budgets", budgetRoutes)
app.use("/api/news", newsRoutes)


app.get("/", (req, res) => {
  res.send("Finance Tracker API is running 🚀");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
