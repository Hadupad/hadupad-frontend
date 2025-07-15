"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Facebook, Mail, Apple, ChevronLeft } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function SignupCard({ onSuccess }) {
  const router = useRouter();
  const [countryCode, setCountryCode] = useState("+234");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone.trim()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      const fullPhone = `${countryCode}${phone}`;
      onSuccess?.(fullPhone);
    }, 1000); // mock API delay
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
        <div className="flex items-center mb-4 mt-2">
          <button
            onClick={() => router.back()}
            aria-label="Go back"
            className="text-gray-600 hover:text-black focus:outline-none focus:ring-2 focus:ring-[#DC4731] rounded cursor-pointer"
          >
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-xl font-semibold text-center flex-grow">
            Signup
          </h2>
        </div>

        <hr className="border-t border-gray-100 -mx-4 mt-4 mb-10" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm mb-1 block">Country/Region</label>
            <select
              className="w-full border rounded-lg py-2 pl-3 pr-10 appearance-none"
              onChange={(e) => setCountryCode(e.target.value)}
              value={countryCode}
            >
              <option value="+234">Nigeria (+234)</option>
              <option value="+1">United States (+1)</option>
              <option value="+44">United Kingdom (+44)</option>
            </select>
          </div>

          <div>
            <label className="text-sm mb-1 block">Phone number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <p className="text-xs text-gray-500">
            We&apos;ll call or text you to confirm your number.
            <a href="#" className="text-[#DC4731] ml-1 underline">
              Privacy Policy
            </a>
          </p>

          <button
            type="submit"
            className="bg-[#DC4731] text-white py-2 rounded-lg hover:bg-[#c03d29] transition flex justify-center"
            disabled={loading}
          >
            {loading ? (
              <span className="animate-pulse">Loading...</span>
            ) : (
              "Continue"
            )}
          </button>

          <div className="flex items-center my-2">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-sm text-gray-400">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <button
            type="button"
            className="border rounded-lg py-2 flex items-center justify-start gap-2 hover:bg-gray-100 pl-4"
          >
            <Mail size={20} className="text-gray-600" />
            <span className="text-center w-full">Continue with Email</span>
          </button>

          <button
            type="button"
            className="border rounded-lg py-2 flex items-center justify-start gap-2 hover:bg-gray-100 pl-4"
          >
            <Facebook size={20} className="text-blue-600" />
            <span className="text-center w-full">Continue with Facebook</span>
          </button>

          <button
            type="button"
            className="border rounded-lg py-2 flex items-center justify-start gap-2 hover:bg-gray-100 pl-4"
          >
            <FcGoogle size={20} />
            <span className="text-center w-full">Continue with Google</span>
          </button>

          <button
            type="button"
            className="border rounded-lg py-2 flex items-center justify-start gap-2 hover:bg-gray-100 pl-4"
          >
            <Apple size={20} />
            <span className="text-center w-full">Continue with Apple</span>
          </button>
        </form>
      </div>
    </div>
  );
}
