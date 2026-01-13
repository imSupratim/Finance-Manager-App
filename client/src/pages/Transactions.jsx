import { useEffect, useState } from "react"
import api from "../api/axios.js"
import TransactionForm from "../components/TransactionForm"
import TransactionList from "../components/TransactionList"

const Transactions = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchTransactions = async () => {
    try {
      const res = await api.get("/transactions")
      setTransactions(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="p-6 max-w-5xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Transactions
          </h1>
          <p className="text-sm text-slate-500">
            Manage your income and expenses
          </p>
        </div>

        {/* Add Transaction */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          <TransactionForm onSuccess={fetchTransactions} />
        </div>

        {/* Transaction List */}
        <div className="bg-white p-6 rounded-2xl shadow-sm">
          {loading ? (
            <div className="text-center py-12 text-slate-500">
              Loading transactions...
            </div>
          ) : (
            <TransactionList
              transactions={transactions}
              onDelete={fetchTransactions}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default Transactions
