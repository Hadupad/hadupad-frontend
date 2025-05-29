"use client";

import { useState } from "react";
import { X, Mail, Facebook, Apple } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";

export default function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { login } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Replace with your actual login API call
      await login({ email, password });
      onClose();
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-white w-[90%] max-w-md rounded-xl shadow-xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4">
          <X size={24} />
        </button>
        
        <h2 className="text-xl font-semibold text-center mb-4">Log in</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          
          {error && <p className="text-red-500 text-sm">{error}</p>}
          
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#DC4731] text-white p-2 rounded hover:bg-[#c03d29]"
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}