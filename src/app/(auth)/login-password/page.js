"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";


const LoginWithPassword = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      // Simulated password submission
      await new Promise((res) => setTimeout(res, 1000));
      setIsSuccess(true);

      // Wait and redirect
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-sm p-6">
        {isSuccess ? (
          <div className="text-center py-10">
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-xl font-bold mb-2">Login Successful!</h2>
            <p className="text-gray-600">Welcome, Faith</p>
          </div>
        ) : (
          <>
           

            <h2 className="text-xl font-semibold text-center mb-6">
              Welcome back, Faith
            </h2>

            <hr className="border-t border-gray-100 -mx-4 mt-4 mb-10" />

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 pt-5 pb-2 text-sm pr-12 focus:outline-none focus:ring-2 focus:ring-[#DC4731]"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="password"
                  className="absolute left-4 top-2 text-xs text-gray-600 pointer-events-none transition-all duration-200"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-sm text-[#DC4731]"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-lg text-white font-medium ${
                  !isLoading
                    ? "bg-[#DC4731] hover:bg-[#c03d29]"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
              >
                {isLoading ? "Processing..." : "Continue"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginWithPassword;
