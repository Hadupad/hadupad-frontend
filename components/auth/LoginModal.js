"use client";

import { useState, useRef } from "react";
import { X } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

export default function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();

  const modalRef = useRef();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // await login({ email, password });
      let response = await axios.post(`${API_URL}/login`, {
        email: email,
        password: password,
      });
      onClose();
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError("Invalid email or password.");
      } else {
        setError(err.message || "Login failed");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="bg-white w-[90%] max-w-md rounded-xl shadow-xl p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute right-4 text-gray-600 hover:text-black"
        >
          <X size={24} />
        </button>

        <h2 className="text-lg font-semibold text-center mb-1">Log in</h2>

        <div className="-mx-4 mt-4 mb-6">
          <hr className="border-t border-gray-100" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DC4731]"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DC4731] pr-10"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-sm text-gray-600"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {error && (
            <div
              className="p-3 text-sm text-red-800 rounded-lg bg-red-50"
              role="alert"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2 rounded-lg text-white flex justify-center ${
              isLoading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#DC4731] hover:bg-[#c03d29]"
            }`}
          >
            {isLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Log in"
            )}
          </button>
        </form>

        <div className="text-center mt-4 text-sm">
          Don't have an account?{" "}
          <button className="underline text-[#DC4731] hover:text-[#b33220]">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
