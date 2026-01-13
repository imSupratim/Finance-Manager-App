import { AlertTriangle, CheckCircle2 } from "lucide-react";

const BudgetAlerts = ({ budgets, transactions }) => {
  const alerts = [];

  budgets.forEach((budget) => {
    const actual = transactions
      .filter(
        (tx) =>
          tx.type === "expense" &&
          tx.category === budget.category &&
          new Date(tx.date).toISOString().slice(0, 7) === budget.month
      )
      .reduce((sum, tx) => sum + tx.amount, 0);

    if (actual > budget.limit) {
      alerts.push({
        category: budget.category,
        over: actual - budget.limit,
      });
    }
  });

  /* ✅ NO ALERTS STATE */
  if (alerts.length === 0) {
    return (
      <div className="flex items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-4">
        <CheckCircle2 className="w-6 h-6 text-green-600" />
        <div>
          <p className="font-semibold text-green-700">
            All budgets are under control
          </p>
          <p className="text-sm text-green-600">
            Great job staying within your limits 🎉
          </p>
        </div>
      </div>
    );
  }

  /* 🚨 ALERTS STATE */
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-5">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-6 h-6 text-red-600" />
        <h2 className="text-lg font-semibold text-red-700">
          Budget Alerts
        </h2>
      </div>

      <ul className="space-y-3">
        {alerts.map((a, i) => (
          <li
            key={i}
            className="flex items-center justify-between rounded-xl
                       border border-red-200 bg-white p-3"
          >
            <span className="font-medium text-slate-800">
              {a.category}
            </span>

            <span className="text-sm font-semibold text-red-600">
              Over by ₹{a.over.toLocaleString("en-IN")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetAlerts;
