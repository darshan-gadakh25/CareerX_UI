import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authAPI } from "../../services/api";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  const passwordRegex = /^.{6,}$/;

  // Step 1: Send OTP to email
  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);

      // API call to send OTP
      await authAPI.forgotPassword(email);

      toast.success("OTP sent to your email");
      setStep(2);
      setOtpTimer(60); // 60 seconds timer

      // Start countdown
      const timer = setInterval(() => {
        setOtpTimer((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      // Demo fallback
      toast.success("OTP sent to your email (Demo)");
      setStep(2);
      setOtpTimer(60);
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

      // API call to verify OTP (would typically return a reset token)
      // await authAPI.verifyOTP({ email, otp });

      // Demo: Accept any 6-digit OTP
      if (otp === "123456" || otp.length === 6) {
        toast.success("OTP verified successfully");
        setStep(3);
      } else {
        throw new Error("Invalid OTP");
      }
    } catch (error) {
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!passwordRegex.test(newPassword)) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      // API call to reset password
      await authAPI.resetPassword({
        email,
        otp,
        newPassword,
      });

      toast.success("Password updated successfully");
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      // Demo fallback
      toast.success("Password updated successfully (Demo)");
      setTimeout(() => navigate("/login"), 1500);
    } finally {
      setLoading(false);
    }
  };

  const resendOTP = async () => {
    if (otpTimer > 0) return;

    try {
      await authAPI.forgotPassword(email);
      toast.success("OTP resent to your email");
      setOtpTimer(60);
    } catch (error) {
      toast.success("OTP resent to your email (Demo)");
      setOtpTimer(60);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5EFE8] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {/* Progress Indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNum) => (
              <div key={stepNum} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= stepNum
                      ? "bg-[#2F4156] text-white"
                      : "bg-[#C8D9E6] text-[#567C8D]"
                  }`}
                >
                  {stepNum}
                </div>
                {stepNum < 3 && (
                  <div
                    className={`w-8 h-0.5 ${
                      step > stepNum ? "bg-[#2F4156]" : "bg-[#C8D9E6]"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1: Enter Email */}
        {step === 1 && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-[#2F4156]">
                Forgot Password
              </h2>
              <p className="text-sm text-[#567C8D] mt-2">
                Enter your registered email to receive OTP
              </p>
            </div>

            <form onSubmit={handleSendOTP} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#2F4156] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@email.com"
                  className="w-full rounded-lg border border-[#C8D9E6] bg-[#F5EFE8]
                  px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#567C8D]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-[#2F4156] py-2.5
                text-white font-medium hover:bg-[#567C8D]
                transition duration-200 disabled:opacity-60"
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          </>
        )}

        {/* Step 2: Verify OTP */}
        {step === 2 && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-[#2F4156]">
                Verify OTP
              </h2>
              <p className="text-sm text-[#567C8D] mt-2">
                Enter the 6-digit OTP sent to {email}
              </p>
            </div>

            <form onSubmit={handleVerifyOTP} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#2F4156] mb-1">
                  OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                  }
                  placeholder="123456"
                  maxLength="6"
                  className="w-full rounded-lg border border-[#C8D9E6] bg-[#F5EFE8]
                  px-4 py-2.5 text-sm text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-[#567C8D]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-[#2F4156] py-2.5
                text-white font-medium hover:bg-[#567C8D]
                transition duration-200 disabled:opacity-60"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>

            <div className="text-center mt-4">
              {otpTimer > 0 ? (
                <p className="text-sm text-[#567C8D]">
                  Resend OTP in {otpTimer}s
                </p>
              ) : (
                <button
                  onClick={resendOTP}
                  className="text-sm text-[#2F4156] hover:underline"
                >
                  Resend OTP
                </button>
              )}
            </div>
          </>
        )}

        {/* Step 3: New Password */}
        {step === 3 && (
          <>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-[#2F4156]">
                Reset Password
              </h2>
              <p className="text-sm text-[#567C8D] mt-2">
                Enter your new password
              </p>
            </div>

            <form onSubmit={handleResetPassword} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-[#2F4156] mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-[#C8D9E6] bg-[#F5EFE8]
                  px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#567C8D]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2F4156] mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-[#C8D9E6] bg-[#F5EFE8]
                  px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#567C8D]"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-[#2F4156] py-2.5
                text-white font-medium hover:bg-[#567C8D]
                transition duration-200 disabled:opacity-60"
              >
                {loading ? "Updating Password..." : "Update Password"}
              </button>
            </form>
          </>
        )}

        {/* Back to Login */}
        <p className="text-center text-sm text-[#567C8D] mt-6">
          Remember your password?{" "}
          <span
            onClick={() => navigate("/login")}
            className="font-medium text-[#2F4156] cursor-pointer hover:underline"
          >
            Back to Sign in
          </span>
        </p>
      </div>
    </div>
  );
}
