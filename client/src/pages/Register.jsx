import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../controllers/authController";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await registerUser(formData);
      toast.success("Registration successful");
      navigate("/");
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Registration failed";
      // alert("Registration failed")
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg"
      >
        {/* Header */}
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
          <p className="text-sm text-gray-500">
            Start managing your finances smarter
          </p>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            placeholder="Your name"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            required
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="mb-1 block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:outline-none"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </div>

        {/* Button */}
        <button
          disabled={loading}
          className="w-full rounded-md bg-blue-700 py-2 text-sm font-medium text-white transition hover:bg-blue-800 disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Register"}
        </button>

        {/* Footer */}
        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="cursor-pointer font-medium text-blue-700 hover:underline"
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
