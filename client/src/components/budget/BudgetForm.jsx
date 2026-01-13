import { useState } from "react";
import { saveBudget } from "../../controllers/budgetController.js";

const categories = ["Food", "Rent", "Travel", "Shopping", "Other"];

const BudgetForm = ({ onSave }) => {
  const [form, setForm] = useState({
    category: "",
    month: "",
    limit: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    await saveBudget(form);
    onSave();
    setForm({ category: "", month: "", limit: "" });
  };

  return (
    <form
      onSubmit={submitHandler}
      className="space-y-5"
    >
      {/* Category */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-600 ">
          Category
        </label>
        <select
          value={form.category}
          onChange={(e) =>
            setForm({ ...form, category: e.target.value })
          }
          required
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          <option value="">Select category</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Month */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-600">
          Month
        </label>
        <input
          type="month"
          value={form.month}
          onChange={(e) =>
            setForm({ ...form, month: e.target.value })
          }
          required
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Limit */}
      <div className="space-y-1">
        <label className="text-sm font-medium text-slate-600">
          Monthly Budget Limit (₹)
        </label>
        <input
          type="number"
          placeholder="e.g. 15000"
          value={form.limit}
          onChange={(e) =>
            setForm({ ...form, limit: e.target.value })
          }
          required
          className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm
                     focus:outline-none focus:ring-2 focus:ring-black"
        />
      </div>

      {/* Button */}
      <button
        className="w-full rounded-xl bg-blue-700 py-2.5 text-sm font-semibold
                   text-white hover:bg-blue-800 transition cursor-pointer"
      >
        Save Budget
      </button>
    </form>
  );
};

export default BudgetForm;
