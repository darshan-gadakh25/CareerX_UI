import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { authAPI } from "../../services/api";
import Img from "../../assets/loginimg.png";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    age: "",
    location: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  const passwordRegex = /^.{6,}$/;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const {
      fullName,
      email,
      age,
      location,
      password,
      confirmPassword,
    } = formData;

    if (!fullName) {
      toast.error("Please enter your full name");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    if (!age || age < 1) {
      toast.error("Please enter a valid age");
      return;
    }

    if (!location.trim()) {
      toast.error("Please enter your location");
      return;
    }

    if (!passwordRegex.test(password)) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const userData = {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        age: parseInt(formData.age),
        location: formData.location,
      };

      await authAPI.register(userData);

      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);

    } catch (error) {
      console.error("Registration Error:", error);

      // Handle array of validation errors from backend
      if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
        error.response.data.errors.forEach(err => toast.error(err));
      }
      // Handle single message object
      else if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      }
      // Handle plain string or default
      else {
        const errorMessage = error.response?.data || error.message || "Registration failed. Please try again.";
        toast.error(typeof errorMessage === 'string' ? errorMessage : "Registration failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5EFE8] px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl h-auto md:h-[650px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Side - Image */}
        <div className="hidden md:block md:w-1/2 relative bg-[#C8D9E6]">
          <img
            src={Img}
            alt="Register"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute bottom-10 left-10 text-white z-10">
            <h2 className="text-4xl font-bold mb-2">Join CareerX</h2>
            <p className="text-lg opacity-90">Start your journey to success today.</p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-[#2F4156]">Create Account</h1>
            <p className="text-[#567C8D] mt-2">Sign up to get started</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="group">
              <input
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#2F4156] focus:ring-2 focus:ring-[#C8D9E6] outline-none transition-all"
              />
            </div>

            <div className="group">
              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#2F4156] focus:ring-2 focus:ring-[#C8D9E6] outline-none transition-all"
              />
            </div>

            <div className="flex gap-4">
              <input
                name="age"
                type="number"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                className="w-1/3 rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#2F4156] focus:ring-2 focus:ring-[#C8D9E6] outline-none transition-all"
              />
              <input
                name="location"
                placeholder="Location (City, Country)"
                value={formData.location}
                onChange={handleChange}
                className="w-2/3 rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#2F4156] focus:ring-2 focus:ring-[#C8D9E6] outline-none transition-all"
              />
            </div>

            <div className="group">
              <input
                name="password"
                type="password"
                placeholder="Password (Min. 6 chars)"
                value={formData.password}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#2F4156] focus:ring-2 focus:ring-[#C8D9E6] outline-none transition-all"
              />
            </div>

            <div className="group">
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-[#2F4156] focus:ring-2 focus:ring-[#C8D9E6] outline-none transition-all"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#2F4156] py-3 text-white font-semibold hover:bg-[#1e2b3a] transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating Account...
                </span>
              ) : "Sign Up"}
            </motion.button>
          </form>

          <p className="text-center text-sm text-[#567C8D] mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="font-bold text-[#2F4156] cursor-pointer hover:underline"
            >
              Sign in
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
