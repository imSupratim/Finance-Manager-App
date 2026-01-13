import TransactionItem from "./TransactionItem"

const TransactionList = ({ transactions, onDelete }) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        <p className="text-lg font-medium">
          No transactions yet
        </p>
        <p className="text-sm">
          Add a transaction to start tracking your finances
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {transactions.map((tx) => (
        <TransactionItem
          key={tx._id}
          tx={tx}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default TransactionList
  