import { useEffect, useState } from "react";
import { getBudgets } from "../controllers/budgetController";
import api from "../api/axios";

import BudgetVsActualChart from "../components/budget/BudgetVsActualChart";
import BudgetAlerts from "../components/budget/BudgetAlerts";

const BudgetAnalyticsPage = () => {
  const [budgets, setBudgets] = useState([]);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const budgetsRes = await getBudgets();
      const txRes = await api.get("/transactions");

      setBudgets(budgetsRes);
      setTransactions(txRes.data);
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Budget Analytics
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Track your budgets, spot overspending, and stay in control
        </p>
      </div>

      {/* Alerts Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <BudgetAlerts
          budgets={budgets}
          transactions={transactions}
        />
      </div>

      {/* Chart Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
        <h2 className="text-lg font-semibold mb-4">
          Budget vs Actual Spending
        </h2>

        <BudgetVsActualChart
          budgets={budgets}
          transactions={transactions}
        />
      </div>
    </div>
  );
};

export default BudgetAnalyticsPage;
