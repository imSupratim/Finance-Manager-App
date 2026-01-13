// import { useState } from "react"
// import BudgetForm from "../components/budget/BudgetForm"
// import BudgetList from "../components/budget/BudgetList"

// const BudgetPage = () => {
//   const [refresh, setRefresh] = useState(false)

//   return (
//     <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//       <BudgetForm onSave={() => setRefresh(!refresh)} />
//       <BudgetList key={refresh} />
//     </div>
//   )
// }

// export default BudgetPage


import { useState } from "react";
import BudgetForm from "../components/budget/BudgetForm";
import BudgetList from "../components/budget/BudgetList";

const BudgetPage = () => {
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
          Budget Planner
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Set monthly budgets and track your spending limits
        </p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Budget Form */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Create / Update Budget
          </h2>
          <BudgetForm onSave={() => setRefresh(!refresh)} />
        </div>

        {/* Budget List */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            Your Budgets
          </h2>
          <BudgetList key={refresh} />
        </div>
      </div>
    </div>
  );
};

export default BudgetPage;