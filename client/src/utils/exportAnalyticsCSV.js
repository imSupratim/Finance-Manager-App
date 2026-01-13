export const exportAnalyticsCSV = (transactions) => {
  if (!transactions.length) return

  let totalIncome = 0
  let totalExpense = 0

  const monthlyData = {}
  const categoryData = {}

  transactions.forEach((tx) => {
    const date = new Date(tx.date)
    const month = date.toLocaleString("default", {
      month: "short",
      year: "numeric",
    })

    // Monthly aggregation
    if (!monthlyData[month]) {
      monthlyData[month] = {
        month,
        income: 0,
        expense: 0,
      }
    }

    if (tx.type === "income") {
      totalIncome += tx.amount
      monthlyData[month].income += tx.amount
    } else {
      totalExpense += tx.amount
      monthlyData[month].expense += tx.amount

      // Category aggregation
      categoryData[tx.category] =
        (categoryData[tx.category] || 0) + tx.amount
    }
  })

  const startDate = new Date(
    Math.min(...transactions.map((t) => new Date(t.date)))
  ).toDateString()

  const endDate = new Date(
    Math.max(...transactions.map((t) => new Date(t.date)))
  ).toDateString()

  const rows = []

  // 📌 Header Section
  rows.push(["Finance Analytics Report"])
  rows.push(["Date Range", startDate, "to", endDate])
  rows.push([])

  // 📌 Summary Section
  rows.push(["SUMMARY"])
  rows.push(["Total Income", totalIncome])
  rows.push(["Total Expense", totalExpense])
  rows.push(["Total Savings", totalIncome - totalExpense])
  rows.push([])

  // 📌 Monthly Breakdown
  rows.push(["MONTHLY BREAKDOWN"])
  rows.push(["Month", "Income", "Expense", "Savings"])

  Object.values(monthlyData).forEach((m) => {
    rows.push([
      m.month,
      m.income,
      m.expense,
      m.income - m.expense,
    ])
  })

  rows.push([])

  // 📌 Category Breakdown
  rows.push(["CATEGORY EXPENSE BREAKDOWN"])
  rows.push(["Category", "Amount"])

  Object.entries(categoryData).forEach(([category, amount]) => {
    rows.push([category, amount])
  })

  const csvContent = rows.map((r) => r.join(",")).join("\n")

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  })

  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")

  link.href = url
  link.setAttribute("download", "finance-analytics-report.csv")
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
