import Transaction from "../models/Transaction.js";
import mongoose from "mongoose";

// OVERALL SUMMARY
export const getSummary = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);

    const summary = await Transaction.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: "$type",
          total: { $sum: "$amount" },
        },
      },
    ]);

    let income = 0;
    let expense = 0;

    summary.forEach((item) => {
      if (item._id === "income") income = item.total;
      if (item._id === "expense") expense = item.total;
    });

    res.json({
      income,
      expense,
      balance: income - expense,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// CATEGORY-WISE EXPENSE
export const categoryWiseExpense = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);

    const data = await Transaction.aggregate([
      {
        $match: {
          user: userId,
          type: "expense",
        },
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
      { $sort: { total: -1 } },
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// MONTHLY SUMMARY
export const monthlySummary = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);

    const data = await Transaction.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: {
            month: { $month: "$date" },
            year: { $year: "$date" },
            type: "$type",
          },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
