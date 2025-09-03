import { EyeIcon, EyeOff } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [PasswordVisibility, setPasswordVisibility] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleVisibility = () => setPasswordVisibility(!PasswordVisibility);

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = { phone, password };

    try {
      const response = await axios.post(
        "http://localhost:8081/api/auth/login",
        loginData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log("Login successful:", response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("ME",phone)
      navigate("/chats");
    } catch (error) {
      console.error("Login failed:", error.response?.data || error);
      alert("Invalid phone or password");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen font-sans">
      {/* Left Side */}
      <div className="md:w-[55%] w-full bg-[#93C572] flex items-center justify-center">
        <div className="text-center text-[#FFFDD0] p-12 md:p-16">
          <h1 className="text-5xl font-extrabold mb-4">Welcome Back</h1>
          <p className="text-lg md:text-xl">
            Login to your account and start chatting!
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="md:w-[45%] w-full flex items-center justify-center bg-gray-100">
        <div className="w-4/5 max-w-md p-10 md:p-16 bg-white rounded-3xl shadow-xl">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Login
          </h2>

          <form className="space-y-6" onSubmit={handleLogin}>
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#93C572]"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              id="phone"
            />

            <div className="relative mt-1">
              <input
                type={PasswordVisibility ? "text" : "password"}
                placeholder="Password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#93C572] pr-10"
                value={password}
                id="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={handleVisibility}
              >
                {PasswordVisibility ? <EyeOff /> : <EyeIcon />}
              </span>
            </div>

            <button
              type="submit"
              className="w-full px-4 py-3 bg-[#93C572] text-[#FFFDD0] font-semibold rounded-lg hover:bg-green-700 transition-all"
              id="subBtn"
            >
              Login
            </button>
          </form>

          <div className="text-sm text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-[#93C572] font-medium hover:underline transition-colors"
            >
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
