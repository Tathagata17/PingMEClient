import { EyeIcon, EyeOff } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // import useNavigate

const AuthPage = () => {
  const [PasswordVisibility, setPasswordVisibility] = useState(false);

  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");

  const navigate = useNavigate(); // initialize navigate

  const handleVisibility = () => setPasswordVisibility(!PasswordVisibility);

  const handleOnsubmit = async (e) => {
    e.preventDefault(); // stop page reload

    const newUser = { name, email, phone, password };

    try {
      const response = await axios.post(
        "http://localhost:8081/api/auth/register",
        newUser,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen font-sans">
      {/* Left Side */}
      <div className="md:w-[55%] w-full bg-[#93C572] flex items-center justify-center">
        <div className="text-center text-[#FFFDD0] p-12 md:p-16">
          <h1 className="text-5xl font-extrabold mb-4">Welcome to Ping Me</h1>
          <p className="text-lg md:text-xl">
            Create your account and start chatting with friends instantly!
          </p>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="md:w-[45%] w-full flex items-center justify-center bg-gray-100">
        <div className="w-4/5 max-w-md p-10 md:p-16 bg-white rounded-3xl shadow-xl">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Sign Up
          </h2>

          <form className="space-y-6" onSubmit={handleOnsubmit}>
            <input
              type="text"
              placeholder="Your Name"
              id="name"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#93C572]"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              id="email"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#93C572]"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />

            <input
              type="tel"
              placeholder="Phone Number"
              id="phone"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#93C572]"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
            />

            <div className="relative mt-1">
              <input
                type={PasswordVisibility ? "text" : "password"}
                placeholder="Password"
                id="password"
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#93C572] pr-10"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
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
              id="subBtn"
              className="w-full px-4 py-3 bg-[#93C572] text-[#FFFDD0] font-semibold rounded-lg hover:bg-green-700 transition-all"
            >
              Sign Up
            </button>
          </form>

          <div className="text-sm text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#93C572] font-medium hover:underline transition-colors"
            >
              Login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
