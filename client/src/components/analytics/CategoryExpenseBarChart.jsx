import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CategoryExpenseBarChart = ({ transactions }) => {
  const categoryData = {};

  transactions.forEach((tx) => {
    if (tx.type !== "expense") return;

    if (!categoryData[tx.category]) {
      categoryData[tx.category] = {
        category: tx.category,
        amount: 0,
      };
    }

    categoryData[tx.category].amount += tx.amount;
  });

  const chartData = Object.values(categoryData)
    .sort((a, b) => b.amount - a.amount);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm">
      <h2 className="text-lg font-semibold mb-4 text-slate-800">
        Category Expense Breakdown
      </h2>

      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData}>
          <XAxis
            dataKey="category"
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

          <Bar
            dataKey="amount"
            radius={[8, 8, 0, 0]}
            fill="#3b82f6"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryExpenseBarChart;
