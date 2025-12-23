import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Img from "../../assets/login-img.png";

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

      const response = await fetch("#", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          rememberMe,  
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      toast.success("Login successful");
      setTimeout(() => navigate("/dashboard"), 1200);

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5EFE8] px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden md:flex">

       
        <div className="hidden md:block md:w-1/2 bg-[#C8D9E6]">
          <img
            src={Img}
            alt="Student Login"
            className="h-full w-full object-cover"
          />
        </div>

      
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">

          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-[#2F4156]">
              CareerX
            </h2>
            <p className="text-sm text-[#567C8D] mt-2">
              Login using your registered Email ID
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">

           
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

           
            <div>
              <label className="block text-sm font-medium text-[#2F4156] mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-[#C8D9E6] bg-[#F5EFE8]
                px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#567C8D]"
              />
            </div>

           
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-[#567C8D] cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-[#2F4156]"
                />
                Remember me
              </label>

              <span
  onClick={() => navigate("/forgot-password")}
  className="text-[#2F4156] cursor-pointer hover:underline"
>
  Forgot password?
</span>

            </div>

            
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#2F4156] py-2.5
              text-white font-medium hover:bg-[#567C8D]
              transition duration-200 disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Sign in"}
            </button>
          </form>

          <p className="text-center text-sm text-[#567C8D] mt-6">
            Don’t have an account?{" "}
            <span   onClick={() => navigate("/register")} className="font-medium text-[#2F4156] cursor-pointer hover:underline">
              Sign up
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}
