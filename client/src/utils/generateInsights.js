// export const generateInsights = (transactions) => {
//   if (!transactions.length) return []

//   const insights = []

//   const monthly = {}
//   const category = {}

//   transactions.forEach((tx) => {
//     const month = new Date(tx.date).toLocaleString("default", {
//       month: "short",
//       year: "numeric",
//     })

//     if (!monthly[month]) monthly[month] = { income: 0, expense: 0 }
//     if (!category[tx.category]) category[tx.category] = 0

//     if (tx.type === "income") monthly[month].income += tx.amount
//     else {
//       monthly[month].expense += tx.amount
//       category[tx.category] += tx.amount
//     }
//   })

//   const months = Object.keys(monthly)

//   if (months.length >= 2) {
//     const curr = monthly[months[months.length - 1]]
//     const prev = monthly[months[months.length - 2]]

//     if (curr.expense > prev.expense) {
//       const diff = Math.round(
//         ((curr.expense - prev.expense) / prev.expense) * 100
//       )
//       insights.push(`📈 Expenses increased by ${diff}% compared to last month`)
//     } else {
//       insights.push("🎉 Great! Your expenses reduced this month")
//     }
//   }

//   const topCategory = Object.entries(category).sort(
//     (a, b) => b[1] - a[1]
//   )[0]

//   if (topCategory) {
//     insights.push(
//       `🔥 Highest spending category: ${topCategory[0]} (₹${topCategory[1]})`
//     )
//   }

//   return insights
// }


export const generateInsights = (transactions) => {
  if (!transactions || transactions.length === 0) return []

  const insights = []
  const expenses = transactions.filter((t) => t.type === "expense")

  // Helper
  const monthKey = (date) =>
    new Date(date).toISOString().slice(0, 7)

  // -------------------------------
  // 1️⃣ Category-wise analysis
  // -------------------------------
  const categoryTotals = {}

  expenses.forEach((tx) => {
    categoryTotals[tx.category] =
      (categoryTotals[tx.category] || 0) + tx.amount
  })

  Object.entries(categoryTotals).forEach(([category, amount]) => {
    if (amount > 10000) {
      insights.push(
        `You spent a high amount (₹${amount.toLocaleString()}) on ${category}. Consider setting a strict budget or finding cheaper alternatives.`
      )
    }
  })

  // -------------------------------
  // 2️⃣ Monthly comparison
  // -------------------------------
  const monthlyTotals = {}

  expenses.forEach((tx) => {
    const m = monthKey(tx.date)
    monthlyTotals[m] = (monthlyTotals[m] || 0) + tx.amount
  })

  const months = Object.keys(monthlyTotals).sort()
  if (months.length >= 2) {
    const last = months[months.length - 1]
    const prev = months[months.length - 2]

    const diff = monthlyTotals[last] - monthlyTotals[prev]

    if (diff > 0) {
      insights.push(
        `Your spending increased by ₹${diff.toLocaleString()} compared to last month. Watch for unnecessary expenses.`
      )
    } else if (diff < 0) {
      insights.push(
        `Great job! You reduced your spending by ₹${Math.abs(diff).toLocaleString()} compared to last month.`
      )
    }
  }

  // -------------------------------
  // 3️⃣ High frequency expense detection
  // -------------------------------
  const frequencyMap = {}

  expenses.forEach((tx) => {
    frequencyMap[tx.category] =
      (frequencyMap[tx.category] || 0) + 1
  })

  Object.entries(frequencyMap).forEach(([category, count]) => {
    if (count >= 10) {
      insights.push(
        `You made ${count} transactions in ${category}. Frequent small expenses can add up quickly.`
      )
    }
  })

  // -------------------------------
  // 4️⃣ Largest single expense
  // -------------------------------
  const largestExpense = expenses.reduce(
    (max, tx) => (tx.amount > max.amount ? tx : max),
    expenses[0]
  )

  if (largestExpense) {
    insights.push(
      `Your largest single expense was ₹${largestExpense.amount.toLocaleString()} on ${largestExpense.category}. Consider planning for such big expenses in advance.`
    )
  }

  // -------------------------------
  // 5️⃣ Savings opportunity
  // -------------------------------
  if (monthlyTotals[months[months.length - 1]] > 20000) {
    insights.push(
      `Your monthly expenses are quite high. Try setting savings goals to improve financial stability.`
    )
  }

  return insights.slice(0, 6) // limit insights (clean UI)
}
