import api from "../api/axios.js"

// Get all budgets
export const getBudgets = async () => {
  const res = await api.get("/budgets")
  return res.data
}

// Create / Update budget
export const saveBudget = async (data) => {
  const res = await api.post("/budgets", data)
  return res.data
}

//delete budget
export const deleteBudget = async (id) => {
  await api.delete(`/budgets/${id}`)
}