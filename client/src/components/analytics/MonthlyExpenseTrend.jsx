import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const MonthlyExpenseTrend = ({ transactions }) => {
  const monthlyExpenses = {}

  transactions.forEach((tx) => {
    if (tx.type !== "expense") return

    const month = new Date(tx.date).toLocaleString("default", {
      month: "short",
      year: "numeric",
    })

    if (!monthlyExpenses[month]) {
      monthlyExpenses[month] = {
        month,
        expense: 0,
      }
    }

    monthlyExpenses[month].expense += tx.amount
  })

  const chartData = Object.values(monthlyExpenses)

  return (
    <div className="border rounded p-4">
      <h2 className="text-lg font-semibold mb-4">
        Monthly Expense Trend
      </h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="expense"
            stroke="#ef4444"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default MonthlyExpenseTrend
