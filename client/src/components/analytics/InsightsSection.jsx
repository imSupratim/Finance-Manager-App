const InsightsSection = ({ transactions }) => {
  let totalIncome = 0;
  let totalExpense = 0;
  const categoryMap = {};

  transactions.forEach((tx) => {
    if (tx.type === "income") totalIncome += tx.amount;
    else totalExpense += tx.amount;

    if (tx.type === "expense") {
      categoryMap[tx.category] = (categoryMap[tx.category] || 0) + tx.amount;
    }
  });

  const savings = totalIncome - totalExpense;

  const topCategory = Object.entries(categoryMap).sort(
    (a, b) => b[1] - a[1]
  )[0];

  return (
    // <div className="border rounded p-4 space-y-2">
    //   <h2 className="text-lg font-semibold">Insights</h2>

    //   <p>💰 Total Income: ₹{totalIncome}</p>
    //   <p>💸 Total Expense: ₹{totalExpense}</p>
    //   <p>💾 Savings: ₹{savings}</p>

    //   {topCategory && (
    //     <p>
    //       🔥 Highest Spending:{" "}
    //       <span className="font-semibold">
    //         {topCategory[0]} (₹{topCategory[1]})
    //       </span>
    //     </p>
    //   )}
    // </div>

    <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
      <h2 className="text-lg font-semibold text-slate-800">Insights</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-green-50 rounded-xl p-4">
          <p className="text-sm text-slate-500">Total Income</p>
          <p className="text-xl font-bold text-green-600">
            ₹{totalIncome.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="bg-red-50 rounded-xl p-4">
          <p className="text-sm text-slate-500">Total Expense</p>
          <p className="text-xl font-bold text-red-600">
            ₹{totalExpense.toLocaleString("en-IN")}
          </p>
        </div>

        <div className="bg-blue-50 rounded-xl p-4">
          <p className="text-sm text-slate-500">Savings</p>
          <p className="text-xl font-bold text-blue-600">
            ₹{savings.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      {topCategory && (
        <div className="flex items-center gap-3 bg-orange-50 p-4 rounded-2xl">
          <span className="text-xl">🔥</span>
          <p className="text-sm text-slate-700">
            Highest Spending Category:
            <span className="ml-1 font-semibold text-slate-900">
              {topCategory[0]}
            </span>
            <span className="ml-2 text-orange-600 font-semibold">
              ₹{topCategory[1].toLocaleString("en-IN")}
            </span>
          </p>
        </div>
      )}
    </div>
  );
};

export default InsightsSection;
