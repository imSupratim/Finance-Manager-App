import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"

const MonthlyExpenseLineChart = ({ transactions }) => {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ]

  const monthlyTotals = months.map((month, index) => ({
    month,
    expense: 0,
  }))

  transactions.forEach((tx) => {
    if (tx.type === "expense") {
      const m = new Date(tx.date).getMonth()
      monthlyTotals[m].expense += tx.amount
    }
  })

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-700">
          Monthly Expenses
        </h2>
        <p className="text-sm text-slate-500">
          Track your spending trend over the year
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyTotals}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
            />

            <XAxis
              dataKey="month"
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={{ stroke: "#e5e7eb" }}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#64748b", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                border: "1px solid #e5e7eb",
                boxShadow: "0 10px 15px rgba(0,0,0,0.05)",
              }}
              labelStyle={{ color: "#334155", fontWeight: 600 }}
              formatter={(value) => [`₹${value.toLocaleString("en-IN")}`, "Expense"]}
            />

            <Line
              type="monotone"
              dataKey="expense"
              stroke="#ef4444"
              strokeWidth={3}
              dot={{ r: 4, fill: "#ef4444" }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default MonthlyExpenseLineChart
