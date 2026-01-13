import { useEffect, useState } from "react";
import api from "../api/axios";
import { logoutUser } from "../controllers/authController";
import { useNavigate } from "react-router-dom";
import ExpensePieChart from "../components/ExpensePieChart";
import MonthlyBarChart from "../components/MonthlyBarChart";
import MonthlyExpenseLineChart from "../components/MonthlyExpenseLineChart";
import {
  Calendar,
  Tag,
  FileText,
  TrendingUp,
  TrendingDown,
  Wallet,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const [categoryData, setCategoryData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    type: "expense",
    amount: "",
    category: "",
  });
  const [summary, setSummary] = useState({
    income: 0,
    expense: 0,
    balance: 0,
  });

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetchSummary();
    fetchTransactions();
    fetchCategoryExpense();
    fetchMonthlySummary();
  }, []);

  const fetchSummary = async () => {
    const res = await api.get("/analytics/summary");
    setSummary(res.data);
  };

  const fetchTransactions = async () => {
    const res = await api.get("/transactions");
    setTransactions(res.data);
  };

  const fetchCategoryExpense = async () => {
    const res = await api.get("/analytics/category-expense");
    setCategoryData(res.data);
  };

  const fetchMonthlySummary = async () => {
    const res = await api.get("/analytics/monthly");
    setMonthlyData(formatMonthlyData(res.data));
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  const formatMonthlyData = (rawData) => {
    const map = {};

    rawData.forEach((item) => {
      const key = `${item._id.month}/${item._id.year}`;
      if (!map[key]) {
        map[key] = {
          month: key,
          income: 0,
          expense: 0,
        };
      }
      map[key][item._id.type] = item.total;
    });

    return Object.values(map);
  };

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    // <div className="p-6 max-w-5xl mx-auto">
    //   <div className="flex justify-between items-center mb-6">
    //     <h1 className="text-2xl font-bold">{user.name.split(" ")[0]}'s Dashboard</h1>
    //   </div>

    //   {/* Summary Cards */}
    //   <div className="grid grid-cols-3 gap-4 mb-6">
    //     <div className="bg-white p-4 rounded shadow">
    //       <h3 className="text-gray-500">Income</h3>
    //       <p className="text-xl font-bold text-green-600">₹{summary.income}</p>
    //     </div>

    //     <div className="bg-white p-4 rounded shadow">
    //       <h3 className="text-gray-500">Expense</h3>
    //       <p className="text-xl font-bold text-red-500">₹{summary.expense}</p>
    //     </div>

    //     <div className="bg-white p-4 rounded shadow">
    //       <h3 className="text-gray-500">Balance</h3>
    //       <p className="text-xl font-bold">₹{summary.balance}</p>
    //     </div>
    //   </div>

      

    //   <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mt-6">
    //     <div className="bg-white p-4 rounded shadow">
    //       <h2 className="text-lg font-bold mb-4">Expense by Category</h2>
    //       <ExpensePieChart data={categoryData} />
    //     </div>

    //     <div className="bg-white p-4 rounded shadow">
    //       <h2 className="text-lg font-bold mb-4">Monthly Overview</h2>
    //       <MonthlyBarChart data={monthlyData} />
    //     </div>
    //   </div>

    //   <div className="mt-10 mb-10">
    //     <MonthlyExpenseLineChart transactions={transactions} />
    //   </div>


    //   {/* Transactions */}
    //   <div className="bg-white p-4 rounded shadow">
    //     <h2 className="text-lg font-bold mb-4">Recent Transactions</h2>

    //     {transactions.length === 0 ? (
    //       <div className="text-center py-16">
    //         <div className="bg-slate-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
    //           <Wallet className="w-10 h-10 text-slate-400" />
    //         </div>
    //         <p className="text-lg text-slate-600 font-medium mb-2">
    //           No transactions yet
    //         </p>
    //         <p className="text-sm text-slate-500">
    //           Add your first transaction to get started
    //         </p>
    //       </div>
    //     ) : (
    //       <div className="space-y-3">
    //         {transactions.map((t) => (
    //           <div
    //             key={t._id}
    //             className="bg-white border border-slate-200 rounded-xl p-4 hover:shadow-md transition-shadow"
    //           >
    //             <div className="flex items-center justify-between gap-4">
    //               {/* Left Section - Category & Note */}
    //               <div className="flex-1 min-w-0">
    //                 <div className="flex items-center gap-2 mb-1">
    //                   <div
    //                     className={`rounded-lg p-1.5 ${
    //                       t.type === "income" ? "bg-green-100" : "bg-red-100"
    //                     }`}
    //                   >
    //                     {t.type === "income" ? (
    //                       <TrendingUp className="w-4 h-4 text-green-600" />
    //                     ) : (
    //                       <TrendingDown className="w-4 h-4 text-red-600" />
    //                     )}
    //                   </div>
    //                   <span className="font-semibold text-slate-800 capitalize">
    //                     {t.category}
    //                   </span>
    //                 </div>
    //                 {t.note && (
    //                   <p className="text-sm text-slate-600 ml-9 truncate">
    //                     {t.note}
    //                   </p>
    //                 )}
    //               </div>

    //               {/* Middle Section - Date (Hidden on mobile) */}
    //               <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
    //                 <Calendar className="w-4 h-4" />
    //                 <span>{formatDate(t.date)}</span>
    //               </div>

    //               {/* Right Section - Amount */}
    //               <div className="text-right">
    //                 <span
    //                   className={`text-lg font-bold ${
    //                     t.type === "income" ? "text-green-600" : "text-red-600"
    //                   }`}
    //                 >
    //                   {t.type === "income" ? "+" : "-"}₹
    //                   {t.amount.toLocaleString("en-IN")}
    //                 </span>
    //                 {/* Date shown on mobile only */}
    //                 <div className="sm:hidden text-xs text-slate-500 mt-1">
    //                   {formatDate(t.date)}
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     )}
    //   </div>
    // </div>



    <div className="p-6 max-w-6xl mx-auto bg-slate-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">
          {user.name.split(" ")[0]}'s Dashboard
        </h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-sm text-slate-500 mb-1">Income</h3>
          <p className="text-2xl font-bold text-green-600">
            ₹{summary.income}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-sm text-slate-500 mb-1">Expense</h3>
          <p className="text-2xl font-bold text-red-500">
            ₹{summary.expense}
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm hover:shadow-md transition">
          <h3 className="text-sm text-slate-500 mb-1">Balance</h3>
          <p className="text-2xl font-bold text-slate-800">
            ₹{summary.balance}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">
            Expense by Category
          </h2>
          <ExpensePieChart data={categoryData} />
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm">
          <h2 className="text-lg font-semibold text-slate-700 mb-4">
            Monthly Overview
          </h2>
          <MonthlyBarChart data={monthlyData} />
        </div>
      </div>

      <div className="mt-10 mb-10 bg-white p-5 rounded-2xl shadow-sm">
        <MonthlyExpenseLineChart transactions={transactions} />
      </div>

      {/* Transactions */}
      <div className="bg-white p-5 rounded-2xl shadow-sm">
        <h2 className="text-lg font-semibold text-slate-700 mb-4">
          Recent Transactions
        </h2>

        {transactions.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-slate-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-10 h-10 text-slate-400" />
            </div>
            <p className="text-lg text-slate-600 font-medium">
              No transactions yet
            </p>
            <p className="text-sm text-slate-500">
              Add your first transaction to get started
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {transactions.map((t) => (
              <div
                key={t._id}
                className="border border-slate-200 rounded-xl p-4 hover:shadow-md transition bg-white"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className={`p-2 rounded-lg ${
                          t.type === "income"
                            ? "bg-green-100"
                            : "bg-red-100"
                        }`}
                      >
                        {t.type === "income" ? (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        )}
                      </div>
                      <span className="font-semibold text-slate-800 capitalize">
                        {t.category}
                      </span>
                    </div>

                    {t.note && (
                      <p className="text-sm text-slate-500 ml-10 truncate">
                        {t.note}
                      </p>
                    )}
                  </div>

                  <div className="hidden sm:flex items-center gap-2 text-sm text-slate-500">
                    <Calendar className="w-4 h-4" />
                    {formatDate(t.date)}
                  </div>

                  <div className="text-right">
                    <span
                      className={`text-lg font-bold ${
                        t.type === "income"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {t.type === "income" ? "+" : "-"}₹
                      {t.amount.toLocaleString("en-IN")}
                    </span>
                    <div className="sm:hidden text-xs text-slate-500 mt-1">
                      {formatDate(t.date)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
