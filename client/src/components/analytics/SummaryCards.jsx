import { ArrowUpRight, ArrowDownRight, PiggyBank, Percent } from "lucide-react";

const SummaryCards = ({ transactions }) => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  const savings = income - expense;
  const savingsRate = income
    ? ((savings / income) * 100).toFixed(1)
    : 0;

  const formatCurrency = (value) =>
    `₹${value.toLocaleString("en-IN")}`;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Income"
        value={formatCurrency(income)}
        icon={ArrowUpRight}
        color="green"
      />

      <StatCard
        title="Total Expense"
        value={formatCurrency(expense)}
        icon={ArrowDownRight}
        color="red"
      />

      <StatCard
        title="Savings"
        value={formatCurrency(savings)}
        icon={PiggyBank}
        color={savings >= 0 ? "blue" : "orange"}
      />

      <StatCard
        title="Savings Rate"
        value={`${savingsRate}%`}
        icon={Percent}
        color="purple"
      />
    </div>
  );
};

const StatCard = ({ title, value, icon: Icon, color }) => {
  const colors = {
    green: "bg-green-50 text-green-600",
    red: "bg-red-50 text-red-600",
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-md transition">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm text-slate-500">{title}</p>
        <div className={`p-2 rounded-xl ${colors[color]}`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>

      <p className="text-2xl font-bold text-slate-800">
        {value}
      </p>
    </div>
  );
};

export default SummaryCards;
