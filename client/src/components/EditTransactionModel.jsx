import { useState } from "react"
import api from "../api/axios.js"
import { X } from "lucide-react"

const categories = {
  expense: ["Food", "Rent", "Transport", "Shopping", "Bills", "Other"],
  income: ["Salary", "Freelance", "Business", "Investment", "Other"],
}

const EditTransactionModal = ({ tx, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    type: tx.type,
    amount: tx.amount,
    category: tx.category,
    note: tx.note || "",
    date: tx.date?.slice(0, 10),
  })

  const submitHandler = async (e) => {
    e.preventDefault()

    await api.put(`/transactions/${tx._id}`, {
      ...form,
      amount: Number(form.amount),
    })

    onSuccess()
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <form
        onSubmit={submitHandler}
        className="bg-white w-full max-w-md rounded-2xl shadow-lg p-6 space-y-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              Edit Transaction
            </h2>
            <p className="text-sm text-slate-500">
              Update your transaction details
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 transition"
          >
            <X className="w-4 h-4 text-slate-500" />
          </button>
        </div>

        {/* Type */}
        <select
          value={form.type}
          onChange={(e) =>
            setForm({
              ...form,
              type: e.target.value,
              category: "",
            })
          }
          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        {/* Amount */}
        <input
          type="number"
          value={form.amount}
          onChange={(e) =>
            setForm({ ...form, amount: e.target.value })
          }
          required
          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* Category */}
        <select
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
          required
          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Select Category</option>
          {categories[form.type].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        {/* Note */}
        <input
          placeholder="Note (optional)"
          value={form.note}
          onChange={(e) =>
            setForm({ ...form, note: e.target.value })
          }
          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* Date */}
        <input
          type="date"
          value={form.date}
          onChange={(e) =>
            setForm({ ...form, date: e.target.value })
          }
          className="w-full border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 transition"
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-black text-white font-medium hover:bg-slate-800 transition"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditTransactionModal
