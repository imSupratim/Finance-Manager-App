import Budget from "../models/Budget.js"

// CREATE / UPDATE BUDGET
export const upsertBudget = async (req, res) => {
  const { category, month, limit } = req.body

  const budget = await Budget.findOneAndUpdate(
    {
      user: req.user._id,
      category,
      month,
    },
    { limit },
    { upsert: true, new: true }
  )

  res.json(budget)
}

// GET BUDGETS
export const getBudgets = async (req, res) => {
  const budgets = await Budget.find({ user: req.user._id })
  res.json(budgets)
}

