import { useState } from "react";
import api from "../api/axios.js";
import EditTransactionModal from "./EditTransactionModel.jsx";
import { TrendingUp, TrendingDown, Pencil, Trash2, Calendar } from "lucide-react";

const TransactionItem = ({ tx, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);

  const deleteHandler = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmed) return;

    await api.delete(`/transactions/${tx._id}`);
    onDelete();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <>
      <div className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Left */}
          <div className="flex items-start gap-3">
            <div
              className={`p-2 rounded-lg ${
                tx.type === "income"
                  ? "bg-green-100"
                  : "bg-red-100"
              }`}
            >
              {tx.type === "income" ? (
                <TrendingUp className="w-4 h-4 text-green-600" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-600" />
              )}
            </div>

            <div>
              <p className="font-semibold text-slate-800 capitalize">
                {tx.category}
              </p>
              {tx.note && (
                <p className="text-sm text-slate-500">
                  {tx.note}
                </p>
              )}
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-wrap items-center gap-4 justify-between sm:justify-end">
            <span className="text-sm text-slate-500">
              <div className="flex items-center justify-center gap-2">
                <Calendar className="size-5" />
                {formatDate(tx.date)}
              </div>
            </span>

            <span
              className={`text-lg font-bold ${
                tx.type === "income"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {tx.type === "income" ? "+" : "-"}₹
              {tx.amount.toLocaleString("en-IN")}
            </span>

            <div className="flex items-center gap-2">
              {/* EDIT */}
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 rounded-lg text-blue-600 hover:bg-blue-50 transition"
                title="Edit"
              >
                <Pencil className="w-4 h-4" />
              </button>

              {/* DELETE */}
              <button
                onClick={deleteHandler}
                className="p-2 rounded-lg text-red-600 hover:bg-red-50 transition"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* EDIT MODAL */}
      {isEditing && (
        <EditTransactionModal
          tx={tx}
          onClose={() => setIsEditing(false)}
          onSuccess={onDelete}
        />
      )}
    </>
  );
};

export default TransactionItem;
