import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";

const BudgetVsActualChart = ({ budgets, transactions }) => {
  const data = budgets.map((budget) => {
    const actual = transactions
      .filter(
        (tx) =>
          tx.type === "expense" &&
          tx.category === budget.category &&
          new Date(tx.date).toISOString().slice(0, 7) === budget.month
      )
      .reduce((sum, tx) => sum + tx.amount, 0);

    return {
      category: budget.category,
      Budget: budget.limit,
      Actual: actual,
    };
  });

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">
          Budget vs Actual Spending
        </h2>
        <p className="text-sm text-slate-500">
          Compare planned budgets with real expenses
        </p>
      </div>

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barGap={6}
            barCategoryGap="20%"
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
            />

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
            />

            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                fontSize: "12px",
              }}
            />

            <Legend />

            <Bar
              dataKey="Budget"
              fill="#22c55e"
              radius={[8, 8, 0, 0]}
            />

            <Bar
              dataKey="Actual"
              fill="#ef4444"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BudgetVsActualChart;
