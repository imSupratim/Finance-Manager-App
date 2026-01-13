import { useEffect, useState } from "react";
import api from "../api/axios.js";
import SummaryCards from "../components/analytics/SummaryCards.jsx";
import CategoryExpenseBarChart from "../components/analytics/CategoryExpenseBarChart.jsx";
import MonthlyExpenseLineChart from "../components/MonthlyExpenseLineChart.jsx";
import MonthlyIncomeExpenseChart from "../components/analytics/MonthlyIncomeExpenseChart.jsx";
import InsightsSection from "../components/analytics/InsightsSection.jsx";
import { exportAnalyticsCSV } from "../utils/exportAnalyticsCSV.js";
import SmartInsights from "../components/analytics/SmartInsights.jsx";
import { Download } from "lucide-react";

const AnalyticsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await api.get("/transactions");
    setTransactions(res.data);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500">
        Loading analytics...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">
              Analytics
            </h1>
            <p className="text-sm text-slate-500">
              Insights into your income and spending habits
            </p>
          </div>

          <button
            onClick={() => exportAnalyticsCSV(transactions)}
            className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl font-medium hover:bg-green-700 transition w-fit"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* Summary */}
        <SummaryCards transactions={transactions} />

        {/* Main Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <MonthlyIncomeExpenseChart transactions={transactions} />
        </div>

        {/* Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CategoryExpenseBarChart transactions={transactions} />
          <MonthlyExpenseLineChart transactions={transactions} />
          <InsightsSection transactions={transactions} />
          <SmartInsights transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
