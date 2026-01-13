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

const MonthlyBarChart = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-700">
          Monthly Overview
        </h2>
        <p className="text-sm text-slate-500">
          Income vs Expense comparison
        </p>
      </div>

      <div className="h-72 sm:h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barCategoryGap="20%"
          >
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
              formatter={(value) =>
                `₹${value.toLocaleString("en-IN")}`
              }
            />

            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{
                fontSize: "12px",
                paddingBottom: "10px",
              }}
            />

            <Bar
              dataKey="income"
              fill="#22c55e"
              radius={[6, 6, 0, 0]}
              barSize={20}
            />

            <Bar
              dataKey="expense"
              fill="#ef4444"
              radius={[6, 6, 0, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyBarChart;
