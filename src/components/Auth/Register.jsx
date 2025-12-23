import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Img from "../../assets/login-img.png";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  const phoneRegex = /^[6-9]\d{9}$/;
  const passwordRegex = /^.{6,}$/;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
    } = formData;

    if (!firstName || !lastName) {
      toast.error("Please enter your full name");
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }

    if (!phoneRegex.test(phone)) {
      toast.error("Enter a valid 10-digit phone number");
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

      const response = await fetch("#", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      toast.success("Registration successful");
      setTimeout(() => navigate("/login"), 1500);

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
            alt="CareerX Register"
            className="h-full w-full object-cover"
          />
        </div>

        
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">

          
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-[#2F4156]">
              CareerX
            </h2>
            <p className="text-sm text-[#567C8D] mt-2">
              Create your CareerX account
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">

           
            <div className="flex gap-3">
              <input
                name="firstName"
                placeholder="First Name"
                onChange={handleChange}
                className="w-1/2 rounded-lg border border-[#C8D9E6] bg-[#F5EFE8]
                px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#567C8D]"
              />
              <input
                name="lastName"
                placeholder="Last Name"
                onChange={handleChange}
                className="w-1/2 rounded-lg border border-[#C8D9E6] bg-[#F5EFE8]
                px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#567C8D]"
              />
            </div>

            
            <input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              className="w-full rounded-lg border border-[#C8D9E6] bg-[#F5EFE8]
              px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#567C8D]"
            />

           
            <input
              name="phone"
              placeholder="Phone Number"
              onChange={handleChange}
              className="w-full rounded-lg border border-[#C8D9E6] bg-[#F5EFE8]
              px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#567C8D]"
            />

            
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              className="w-full rounded-lg border border-[#C8D9E6] bg-[#F5EFE8]
              px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#567C8D]"
            />

            
            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
              className="w-full rounded-lg border border-[#C8D9E6] bg-[#F5EFE8]
              px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#567C8D]"
            />

            
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#2F4156] py-2.5
              text-white font-medium hover:bg-[#567C8D]
              transition duration-200 disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

        
          <p className="text-center text-sm text-[#567C8D] mt-6">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="font-medium text-[#2F4156] cursor-pointer hover:underline"
            >
              Sign in
            </span>
          </p>

        </div>
      </div>
    </div>
  );
}
