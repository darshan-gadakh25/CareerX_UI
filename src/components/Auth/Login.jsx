import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { authAPI } from "../../services/api";
import Img from "../../assets/loginimg.png";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  const passwordRegex = /^.{6,}$/;

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (!passwordRegex.test(password)) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const response = await authAPI.login({ email, password });

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      toast.success("Login successful! Redirecting...");

      const userRole = response.data.user?.role || 'Student';
      setTimeout(() => {
        if (userRole === "Student") {
          navigate("/studentdashboard");
        } else if (userRole === "Admin") {
          navigate("/admindashboard");
        } else {
          navigate("/"); // Fallback
        }
      }, 1200);

    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = "Login failed";

      if (error.response) {
        // Handle various error formats
        errorMessage = error.response.data?.message ||
          (typeof error.response.data === 'string' ? error.response.data : "") ||
          error.response.data?.error ||
          `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = "Cannot connect to server. Please ensure your backend API is running.";
      } else {
        errorMessage = error.message || "An unexpected error occurred";
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5EFE8] px-4 py-8">
      <Toaster position="top-center" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden md:flex h-auto md:h-[600px]"
      >
        <div className="hidden md:block md:w-1/2 relative bg-[#C8D9E6]">
          <img
            src={Img}
            alt="Student Login"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute bottom-10 left-10 text-white z-10">
            <h2 className="text-3xl font-bold mb-2">Welcome Back</h2>
            <p className="opacity-90">Continue your career journey.</p>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-[#2F4156]">CareerX</h2>
            <p className="text-sm text-[#567C8D] mt-2">
              Login to your account
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="group">
              <label className="block text-sm font-medium text-[#2F4156] mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@email.com"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#2F4156] focus:ring-2 focus:ring-[#C8D9E6] outline-none transition-all"
              />
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-[#2F4156] mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#2F4156] focus:ring-2 focus:ring-[#C8D9E6] outline-none transition-all"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-[#567C8D] cursor-pointer hover:text-[#2F4156] transition-colors">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-[#2F4156] w-4 h-4"
                />
                Remember me
              </label>

              <span
                onClick={() => navigate("/forgot-password")}
                className="text-[#2F4156] font-medium cursor-pointer hover:underline"
              >
                Forgot password?
              </span>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#2F4156] py-3 text-white font-semibold hover:bg-[#1e2b3a] transition-colors disabled:opacity-70 shadow-md"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : "Sign in"}
            </motion.button>
          </form>

          <p className="text-center text-sm text-[#567C8D] mt-8">
            Don’t have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              className="font-bold text-[#2F4156] cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}