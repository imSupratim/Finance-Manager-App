import { useState } from "react";
import api from "../api/axios.js";

const TransactionForm = ({ onSuccess }) => {
  const categories = {
    expense: [
      "Food",
      "Rent",
      "Transport",
      "Shopping",
      "Bills",
      "Entertainment",
      "Other",
    ],
    income: [
      "Salary",
      "Pocket Money",
      "Freelance",
      "Business",
      "Investment",
      "Other",
    ],
  };

  const [form, setForm] = useState({
    type: "expense",
    amount: "",
    category: "",
    note: "",
    date: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await api.post("/transactions", {
        ...form,
        amount: Number(form.amount),
        date: form.date ? new Date(form.date) : undefined,
      });

      setForm({
        type: "expense",
        amount: "",
        category: "",
        note: "",
        date: "",
      });

      onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form
      onSubmit={submitHandler}
      className="bg-white p-6 rounded-2xl shadow-sm space-y-4"
    >
      <h2 className="text-lg font-semibold text-slate-700">
        Add Transaction
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {/* Type */}
        <select
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
          className="border border-slate-300 rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        {/* Amount */}
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          required
        />

        {/* Category */}
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          required
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
          type="text"
          placeholder="Note (optional)"
          value={form.note}
          onChange={(e) => setForm({ ...form, note: e.target.value })}
          className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />

        {/* Date */}
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="border border-slate-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      <button className="w-full bg-blue-700 text-white py-2.5 rounded-xl font-medium hover:bg-blue-800 transition cursor-pointer">
        Add Transaction
      </button>
    </form>
  );
};

export default TransactionForm;
