import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const MonthlyIncomeExpenseChart = ({ transactions }) => {
  const monthlyData = {};

  transactions.forEach((tx) => {
    const date = new Date(tx.date);
    const monthKey = date.toISOString().slice(0, 7); // YYYY-MM (for sorting)

    const label = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        month: label,
        income: 0,
        expense: 0,
      };
    }

    if (tx.type === "income") {
      monthlyData[monthKey].income += tx.amount;
    } else {
      monthlyData[monthKey].expense += tx.amount;
    }
  });

  const chartData = Object.keys(monthlyData)
    .sort()
    .map((key) => monthlyData[key]);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-slate-800">
        Monthly Income vs Expense
      </h2>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={chartData}>
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `₹${v / 1000}k`}
          />

          <Tooltip
            formatter={(value) => `₹${value.toLocaleString("en-IN")}`}
            contentStyle={{
              borderRadius: "12px",
              border: "none",
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            }}
          />

          <Legend
            verticalAlign="top"
            height={36}
            iconType="circle"
          />

          <Line
            type="monotone"
            dataKey="income"
            name="Income"
            stroke="#22c55e"
            strokeWidth={3}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />

          <Line
            type="monotone"
            dataKey="expense"
            name="Expense"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ r: 3 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyIncomeExpenseChart;
