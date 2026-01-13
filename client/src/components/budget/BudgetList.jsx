import { useEffect, useState } from "react";
import {
  deleteBudget,
  getBudgets,
} from "../../controllers/budgetController.js";
import { Calendar, Wallet, Trash2 } from "lucide-react";

const BudgetList = () => {
  const [budgets, setBudgets] = useState([]);

  const fetchBudgets = async () => {
    const data = await getBudgets();
    setBudgets(data);
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Delete this budget?")) return;
    await deleteBudget(id);
    fetchBudgets();
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5">
      <h2 className="text-lg font-semibold mb-4">Your Budgets</h2>

      {budgets.length === 0 ? (
        <div className="text-center py-10">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
            <Wallet className="h-7 w-7 text-slate-400" />
          </div>
          <p className="text-slate-600 font-medium">No budgets set yet</p>
          <p className="text-sm text-slate-400">
            Create your first monthly budget
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {budgets.map((b) => (
            <div
              key={b._id}
              className="flex items-center justify-between rounded-xl border
                         border-slate-200 p-3 hover:shadow-sm transition"
            >
              {/* Category */}
              <div>
                <p className="font-semibold text-slate-800">{b.category}</p>
                <div className="flex items-center gap-1 text-xs text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  {b.month}
                </div>
              </div>

              {/* Amount */}
              <span className="text-lg font-bold text-green-600 ">
                <button
                  onClick={() => handleDelete(b._id)}
                  className="rounded-md p-2 text-red-500 hover:bg-red-50 mr-5 cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
                ₹{b.limit.toLocaleString("en-IN")}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BudgetList;
