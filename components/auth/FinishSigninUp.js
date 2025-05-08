// import React from 'react';

// const FinishSigninUp = () => {
//   return (
//     <div className="relative w-full h-screen overflow-hidden">
//       {/* Background image with blur overlay */}
//       <div
//         className="absolute inset-0 bg-cover bg-center blur-sm brightness-75"
//         style={{ backgroundImage: "url('/path-to-your-background-image.jpg')" }}
//       />

//       {/* Navigation bar */}
//       <header className="absolute top-0 left-0 w-full flex justify-between items-center px-6 py-4 z-10">
//         <div className="text-2xl font-bold text-white">🏠</div>
//         <nav className="space-x-6 text-white font-medium">
//           <a href="#">Home</a>
//           <a href="#">Properties</a>
//           <a href="#">About Us</a>
//           <a href="#">Contact</a>
//           <a href="#">FAQs</a>
//           <button className="bg-white text-red-600 font-semibold px-4 py-1 rounded-full ml-4">
//             Register
//           </button>
//         </nav>
//       </header>

//       {/* Sign up modal */}
//       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white p-6 rounded-lg shadow-xl z-20">
//         <h2 className="text-center font-semibold text-gray-700 mb-4">Finish signing up</h2>
//         <form className="space-y-4">
//           <input className="w-full border rounded p-2" placeholder="First name" />
//           <input className="w-full border rounded p-2" placeholder="Last name" />
//           <input className="w-full border rounded p-2" placeholder="Birthdate" type="date" />
//           <input className="w-full border rounded p-2" placeholder="Email address" type="email" />
//           <input className="w-full border rounded p-2" placeholder="Password" type="password" />
//           <p className="text-xs text-gray-500">
//             By clicking Agree and continue, I agree to the <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
//           </p>
//           <button className="w-full bg-gray-300 text-white py-2 rounded cursor-not-allowed">
//             Agree and continue
//           </button>
//         </form>
//       </div>

//       {/* Search bar */}
//       <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-4xl bg-white shadow-lg rounded-full px-4 py-3 flex flex-wrap gap-4 justify-between items-center z-10">
//         <input className="flex-1 min-w-[120px] p-2 border rounded" placeholder="Where" />
//         <input className="flex-1 min-w-[100px] p-2 border rounded" placeholder="Budget" />
//         <input className="flex-1 min-w-[100px] p-2 border rounded" placeholder="Bedrooms" />
//         <input className="flex-1 min-w-[100px] p-2 border rounded" placeholder="Guests" />
//         <button className="bg-red-500 text-white px-4 py-2 rounded-full">
//           🔍
//         </button>
//       </div>
//     </div>
//   );
// };

// export default FinishSigninUp;

"use client";

import { useState } from "react";
import { ChevronLeft, X } from "lucide-react";

const FinishSigninUp = ({ isOpen, onClose, onBack, phoneNumber, verificationCode }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthdate: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userData = {
        ...formData,
        phoneNumber,
        verificationCode
      };
      console.log("Final submission:", userData);
      onClose();
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
        {/* Back button (left) */}
        <button 
          onClick={onBack} 
          className="absolute top-4 left-4 text-gray-600 hover:text-black"
        >
          <ChevronLeft size={24} />
        </button>
        
        {/* Close button (right) */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-gray-600 hover:text-black"
        >
          <X size={24} />
        </button>

        <h2 className="text-center text-lg font-semibold mb-6">Finish signing up</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* First Name */}
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

          {/* Last Name */}
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

          {/* Birthdate */}
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
              To sign up, you need to be at least 18. Your birthday won't be shared with other people.
            </p>
          </div>

          {/* Email */}
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

          {/* Password */}
          <div className="relative">
            <input 
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-sm outline-none pr-16"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
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

          {/* Terms and Policies */}
          <p className="text-xs text-gray-600 mt-2">
            By selecting Agree and continue, I agree to the{" "}
            <a href="#" className="text-[#DC4731] underline">Terms of Service</a>,{" "}
            <a href="#" className="text-[#DC4731] underline">Payments Terms of Service</a> and{" "}
            <a href="#" className="text-[#DC4731] underline">Nondiscrimination Policy</a> and acknowledge the{" "}
            <a href="#" className="text-[#DC4731] underline">Privacy Policy</a>.
          </p>

          {/* Submit Button */}
          <button 
            type="submit" 
            className={`w-full py-3 mt-2 rounded-xl text-white font-semibold transition ${
              isLoading ? "bg-[#dc4731]/70" : "bg-[#DC4731] hover:bg-[#c03d29]"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Agree and continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FinishSigninUp;