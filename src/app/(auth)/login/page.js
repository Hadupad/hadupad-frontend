"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    // e.preventDefault();
    // if (!email.trim()) return;

    // // Directly navigate to the OTP page
    // router.push("/login-otp");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-sm p-6 relative">
        <button
          onClick={() => router.back()}
          className="absolute left-4 text-gray-600 hover:text-black cursor-pointer"
        >
          <X size={24} />
        </button>

        <h2 className="text-xl font-semibold text-center mb-6">
          Welcome back, Faith
        </h2>

        <hr className="border-t border-gray-100 -mx-4 mt-4 mb-10" />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <input
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`peer w-full border border-gray-300 rounded-lg px-4 pt-5 pb-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#DC4731] focus:border-transparent`}
              placeholder=" "
              required
            />
            <label
              htmlFor="email"
              className="absolute left-4 top-2 text-gray-500 text-xs transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400 peer-focus:top-2 peer-focus:text-xs peer-focus:text-[#DC4731]"
            >
              Email address or Phone number
            </label>
          </div>

          <button
            type="submit"
            disabled={!email.trim()}
            className={`w-full py-3 rounded-lg text-white font-medium ${
              email.trim()
                ? "bg-[#DC4731] hover:bg-[#c03d29]"
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
