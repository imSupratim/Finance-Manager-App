import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../controllers/authController";
import { LogIn, UserPlus, Menu, X, Wallet, User } from "lucide-react";
import { getUser } from "../utils/auth";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const token = localStorage.getItem("token");
  const user = getUser();

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
    setIsOpen(false);
  };

  const closeMenu = () => setIsOpen(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-black font-semibold relative after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-black"
      : "text-gray-600 hover:text-black transition-colors";

  const mobileLinkClass = ({ isActive }) =>
    isActive
      ? "flex items-center gap-2 px-4 py-3 bg-slate-100 text-black font-semibold rounded-xl"
      : "flex items-center gap-2 px-4 py-3 text-gray-600 hover:bg-slate-50 rounded-xl transition-colors";

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-md border-b border-slate-200/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => {
              navigate("/");
              closeMenu();
            }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="flex items-center justify-center rounded-xl bg-blue-700 p-2 shadow-sm">
              <Wallet className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              Moneymap
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {token ? (
              <>
                <NavLink to="/" className={linkClass}>Home</NavLink>
                <NavLink to="/transactions" className={linkClass}>Transactions</NavLink>
                <NavLink to="/analytics" className={linkClass}>Analytics</NavLink>
                <NavLink to="/budgets" className={linkClass}>Budgets</NavLink>
                <NavLink to="/budget-analytics" className={linkClass}>
                  Budget Analytics
                </NavLink>
                <NavLink to="/news" className={linkClass}>
                  News
                </NavLink>

                {/* User */}
                <NavLink to="/user" className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                    {user.name[0]}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user.name.split(" ")[0]}
                  </span>
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-black font-medium transition"
                >
                  <LogIn size={18} />
                  Login
                </button>

                <button
                  onClick={() => navigate("/register")}
                  className="flex items-center cursor-pointer gap-2 rounded-xl bg-blue-800 px-4 py-2 text-white hover:bg-blue-900 transition font-medium"
                >
                  <UserPlus size={18} />
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden rounded-xl p-2 hover:bg-slate-100 transition"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="space-y-2 px-4 py-4">
            {token ? (
              <>
                <NavLink to="/" onClick={closeMenu} className={mobileLinkClass}>
                  Dashboard
                </NavLink>
                <NavLink to="/transactions" onClick={closeMenu} className={mobileLinkClass}>
                  Transactions
                </NavLink>
                <NavLink to="/analytics" onClick={closeMenu} className={mobileLinkClass}>
                  Analytics
                </NavLink>
                <NavLink to="/budgets" onClick={closeMenu} className={mobileLinkClass}>
                  Budgets
                </NavLink>
                <NavLink to="/budget-analytics" onClick={closeMenu} className={mobileLinkClass}>
                  Budget Analytics
                </NavLink>
                <NavLink to="/news" onClick={closeMenu} className={mobileLinkClass}>
                  News
                </NavLink>
                
                {/* User */}
                <NavLink to="/user" onClick={closeMenu} className={mobileLinkClass}>
                 <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                    {user.name[0]}
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {user.name.split(" ")[0]}
                  </span>
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="w-full rounded-xl bg-red-500 px-4 py-3 text-white font-medium hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate("/login");
                    closeMenu();
                  }}
                  className="w-full flex items-center gap-2 rounded-xl border px-4 py-3 text-gray-700 hover:bg-slate-50"
                >
                  <LogIn size={18} />
                  Login
                </button>

                <button
                  onClick={() => {
                    navigate("/register");
                    closeMenu();
                  }}
                  className="w-full flex items-center gap-2 rounded-xl bg-black px-4 py-3 text-white hover:bg-gray-800"
                >
                  <UserPlus size={18} />
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
