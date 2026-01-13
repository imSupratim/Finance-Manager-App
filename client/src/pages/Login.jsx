import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, LogIn, Wallet } from "lucide-react";
import { loginUser } from "../controllers/authController";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      await loginUser(formData);
      toast.success("Login successful")
      navigate("/");
    } catch (error) {
      setError("Invalid email or password. Please try again.");
      toast.error("Please try again")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl mb-4 shadow-lg">
            <Wallet className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-slate-600">
            Sign in to manage your finances
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                  value={formData.email}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg 
                           focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                           transition-all"
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block mb-2 text-sm font-medium text-slate-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  placeholder="••••••••"
                  required
                  value={formData.password}
                  className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg 
                           focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200
                           transition-all"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-medium text-white flex items-center justify-center gap-2 transition-all ${
                loading
                  ? 'bg-slate-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg'
              }`}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center text-sm text-slate-600 pt-4 border-t border-slate-200">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-700 hover:underline">
              Create one now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;