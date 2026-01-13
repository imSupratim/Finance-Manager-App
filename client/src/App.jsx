import {  Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import './App.css';
import Transactions from "./pages/Transactions";
import Navbar from "./components/Navbar";
import AnalyticsPage from "./pages/AnalyticsPage";
import BudgetPage from "./pages/BudgetPage";
import BudgetAnalyticsPage from "./pages/BudgetAnalyticsPage";
import UserInfo from "./pages/UserInfo";
import News from "./pages/News";
import {Toaster} from "react-hot-toast"

function App() {
  return (
    <>
    <Toaster/>

    <Navbar/>
    <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/transactions" element={<Transactions/>} />
        <Route path="/analytics" element={<AnalyticsPage/>} />
        <Route path="/budgets" element={<BudgetPage />} />
        <Route path="/budget-analytics" element={<BudgetAnalyticsPage/>} />
        <Route path='/user' element={<UserInfo/>} />
        <Route  path="/news" element={<News/>} />
      </Routes>
    </>
      
  );
}

export default App;
