"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, X } from "lucide-react";

const FinishSigninUp = ({ isOpen, onClose, onBack, onComplete, phoneNumber, verificationCode }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthdate: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Validate form whenever formData changes
  useEffect(() => {
    const isValid = (
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.birthdate !== '' &&
      formData.email.trim() !== '' &&
      formData.password.length >= 6
    );
    setIsFormValid(isValid);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    setIsLoading(true);
    try {
      const userData = {
        ...formData,
        phoneNumber,
        verificationCode
      };
      console.log("Final submission:", userData);
      // Here you would typically send this to your backend
      // await api.registerUser(userData);
      onComplete(userData);
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-2xl p-6 relative">
        <button onClick={onBack} className="absolute  left-4 text-gray-600 hover:text-black">
          <ChevronLeft size={24} />
        </button>
        <button onClick={onClose} className="absolute  right-4 text-gray-600 hover:text-black">
          <X size={24} />
        </button>

        <h2 className="text-center text-lg font-semibold mb-6">Finish signing up</h2>

        <div className="-mx-8 mt-4 mb-10">
          <hr className="border-t border-gray-100" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input 
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none"
              placeholder="First name"
              required
            />
          </div>

          <div>
            <input 
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none"
              placeholder="Last name"
              required
            />
            <p className="text-xs text-neutral-500 mt-1">Make sure it matches the name on your government ID.</p>
          </div>

          <div>
            <input 
              name="birthdate"
              value={formData.birthdate}
              onChange={handleChange}
              className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none"
              type="date"
              required
            />
            <p className="text-xs text-neutral-500 mt-1">
              To sign up, you need to be at least 18. Your birthday won't be shared with others.
            </p>
          </div>

          <div>
            <input 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none"
              type="email"
              placeholder="Email address"
              required
            />
            <p className="text-xs text-neutral-500 mt-1">
              We'll email your confirmation and receipts.
            </p>
          </div>

          <div className="relative">
            <input 
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none pr-16"
              type={showPassword ? "text" : "password"}
              placeholder="Password (min 6 characters)"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#DC4731] font-medium"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <p className="text-xs text-gray-600 mt-2">
            By selecting Agree and continue, I agree to the{" "}
            <a href="#" className="text-[#DC4731] underline">Terms of Service</a>,{" "}
            <a href="#" className="text-[#DC4731] underline">Payments Terms of Service</a>, and{" "}
            <a href="#" className="text-[#DC4731] underline">Nondiscrimination Policy</a>, and acknowledge the{" "}
            <a href="#" className="text-[#DC4731] underline">Privacy Policy</a>.
          </p>

          <button 
            type="submit" 
            className={`w-full py-3 mt-2 rounded-xl text-white font-semibold transition ${
              !isFormValid || isLoading 
                ? "bg-gray-300 cursor-not-allowed" 
                : "bg-[#DC4731] hover:bg-[#c03d29]"
            }`}
            disabled={!isFormValid || isLoading}
          >
            {isLoading ? "Loading..." : "Agree and continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FinishSigninUp;