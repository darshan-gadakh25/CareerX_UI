import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authAPI } from "../../services/api";
import toast from "react-hot-toast";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: Reset
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    otpCode: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      await authAPI.forgotPassword(formData.email);
      toast.success("OTP sent to your email!");
      setStep(2);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!formData.otpCode) {
      toast.error("Please enter the OTP");
      return;
    }

    try {
      setLoading(true);
      await authAPI.verifyOtp({
        email: formData.email,
        otpCode: formData.otpCode
      });
      toast.success("OTP verified successfully!");
      setStep(3);
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await authAPI.resetPassword({
        email: formData.email,
        otpCode: formData.otpCode,
        newPassword: formData.newPassword,
        confirmPassword: formData.confirmPassword
      });
      toast.success("Password reset successful! Please login.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8FAFC] to-[#E2E8F0] px-4 py-12">
      <div className="w-full max-w-md">
        {/* Progress Bar */}
        <div className="flex justify-between mb-8 px-2 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#C8D9E6] -translate-y-1/2 z-0"></div>
          <div
            className="absolute top-1/2 left-0 h-0.5 bg-[#2F4156] -translate-y-1/2 z-0 transition-all duration-500"
            style={{ width: `${((step - 1) / 2) * 100}%` }}
          ></div>
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`w-8 h-8 rounded-full flex items-center justify-center z-10 font-semibold transition-all duration-300 ${step >= num ? "bg-[#2F4156] text-white" : "bg-white text-[#567C8D] border-2 border-[#C8D9E6]"
                }`}
            >
              {num}
            </div>
          ))}
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-[#E2E8F0] relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 -m-8 w-32 h-32 bg-[#2F4156]/5 rounded-full blur-3xl"></div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#2F4156] tracking-tight">
              {step === 1 && "Forgot Password"}
              {step === 2 && "Verify OTP"}
              {step === 3 && "Reset Password"}
            </h2>
            <p className="text-sm text-[#567C8D] mt-2 font-medium">
              {step === 1 && "Enter your email to receive a recovery OTP"}
              {step === 2 && `We've sent a 6-digit code to ${formData.email}`}
              {step === 3 && "Create a strong new password for your account"}
            </p>
          </div>

          {step === 1 && (
            <form onSubmit={handleForgotPassword} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#2F4156] ml-1">Email Address</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#567C8D] group-focus-within:text-[#2F4156] transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                  <input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com"
                    className="w-full rounded-xl border border-[#C8D9E6] pl-11 pr-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#2F4156]/20 focus:border-[#2F4156]"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2F4156] text-white rounded-xl py-3.5 font-bold hover:bg-[#1E2B3A] shadow-lg shadow-[#2F4156]/20 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Sending...</span>
                  </div>
                ) : "Send OTP"}
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-2 text-center">
                <label className="text-sm font-semibold text-[#2F4156]">Verification Code</label>
                <input
                  name="otpCode"
                  type="text"
                  required
                  maxLength="6"
                  value={formData.otpCode}
                  onChange={handleInputChange}
                  placeholder="000000"
                  className="w-full text-center tracking-[1em] text-2xl font-bold rounded-xl border border-[#C8D9E6] px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-[#2F4156]/20 focus:border-[#2F4156]"
                />
              </div>
              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#2F4156] text-white rounded-xl py-3.5 font-bold hover:bg-[#1E2B3A] shadow-lg shadow-[#2F4156]/20 active:scale-[0.98] transition-all"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-sm font-medium text-[#567C8D] hover:text-[#2F4156] transition-colors"
                >
                  Change Email Address
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#2F4156] ml-1">New Password</label>
                  <input
                    name="newPassword"
                    type="password"
                    required
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-[#C8D9E6] px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#2F4156]/20 focus:border-[#2F4156]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#2F4156] ml-1">Confirm New Password</label>
                  <input
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="w-full rounded-xl border border-[#C8D9E6] px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#2F4156]/20 focus:border-[#2F4156]"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#2F4156] text-white rounded-xl py-3.5 font-bold hover:bg-[#1E2B3A] shadow-lg shadow-[#2F4156]/20 active:scale-[0.98] transition-all"
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          )}

          <div className="mt-8 pt-6 border-t border-[#F1F5F9] text-center">
            <span className="text-sm text-[#567C8D]">Remembered your password? </span>
            <button
              onClick={() => navigate("/login")}
              className="text-sm font-bold text-[#2F4156] hover:underline hover:text-[#1E2B3A] transition-all"
            >
              Log in instead
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
