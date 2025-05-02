// "use client";

// import { useEffect, useRef, useState } from "react";
// import { X, Facebook, Mail, Apple } from "lucide-react";
// import { FcGoogle } from "react-icons/fc";

// export default function GuestSignupModal({ isOpen, onClose, onPhoneSubmit }) {
//   const modalRef = useRef();
//   const [countryCode, setCountryCode] = useState("+234");
//   const [phone, setPhone] = useState("");
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const handleEsc = (event) => {
//       if (event.key === "Escape") onClose();
//     };
//     window.addEventListener("keydown", handleEsc);
//     return () => window.removeEventListener("keydown", handleEsc);
//   }, [onClose]);

//   const handleOverlayClick = (event) => {
//     if (modalRef.current && !modalRef.current.contains(event.target)) onClose();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formattedNumber = `${countryCode} ${phone}`;
    
//     if (phone.trim() && typeof onPhoneSubmit === 'function') {
//       setIsLoading(true);
//       try {
//         await onPhoneSubmit(formattedNumber);
//       } catch (error) {
//         console.error("Error submitting phone:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={handleOverlayClick}>
//       <div ref={modalRef} className="bg-white w-[90%] max-w-md rounded-xl shadow-xl p-6 relative">
        // <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-black">
        //   <X size={24} />
        // </button>

        // <h2 className="text-xl font-semibold text-center mb-4">Welcome to Hadupad</h2>

        // <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        //   <div>
        //     <label className="text-sm mb-1 block">Country/Region</label>
        //     <select
        //       className="w-full border rounded-lg p-2"
        //       onChange={(e) => setCountryCode(e.target.value)}
        //       value={countryCode}
        //     >
        //       <option value="+234">Nigeria (+234)</option>
        //       <option value="+1">United States (+1)</option>
        //       <option value="+44">United Kingdom (+44)</option>
        //     </select>
        //   </div>

        //   <div>
        //     <label className="text-sm mb-1 block">Phone number</label>
        //     <input
        //       type="tel"
        //       placeholder="Enter your phone number"
        //       value={phone}
        //       onChange={(e) => setPhone(e.target.value)}
        //       className="w-full border rounded-lg p-2"
        //       required
        //     />
        //   </div>

        //   <p className="text-xs text-gray-500">
        //     We'll call or text you to confirm your number. Standard message and data rates apply.
        //     <a href="#" className="text-[#DC4731] ml-1 underline">Privacy Policy</a>
        //   </p>

        //   <button 
        //     type="submit" 
        //     className="bg-[#DC4731] text-white py-2 rounded-lg hover:bg-[#c03d29] transition flex justify-center"
        //     disabled={isLoading}
        //   >
        //     {isLoading ? (
        //       <span className="loading loading-spinner"></span>
        //     ) : "Continue"}
        //   </button>

        //   <div className="flex items-center my-2">
        //     <hr className="flex-grow border-gray-300" />
        //     <span className="mx-2 text-sm text-gray-400">or</span>
        //     <hr className="flex-grow border-gray-300" />
        //   </div>

        //   <button type="button" className="border rounded-lg py-2 flex items-center justify-start gap-2 hover:bg-gray-100 pl-4">
        //     <Mail size={20} className="text-gray-600" />
        //     <span className="text-center w-full">Continue with Email</span>
        //   </button>

        //   <button type="button" className="border rounded-lg py-2 flex items-center justify-start gap-2 hover:bg-gray-100 pl-4">
        //     <Facebook size={20} className="text-blue-600" />
        //     <span className="text-center w-full">Continue with Facebook</span>
        //   </button>

        //   <button type="button" className="border rounded-lg py-2 flex items-center justify-start gap-2 hover:bg-gray-100 pl-4">
        //     <FcGoogle size={20} />
        //     <span className="text-center w-full">Continue with Google</span>
        //   </button>

        //   <button type="button" className="border rounded-lg py-2 flex items-center justify-start gap-2 hover:bg-gray-100 pl-4">
        //     <Apple size={20} />
        //     <span className="text-center w-full">Continue with Apple</span>
        //   </button>
        // </form>
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useState } from "react";
import { X, Facebook, Mail, Apple } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function GuestSignupModal({ isOpen, onClose, onPhoneSubmit }) {
  const modalRef = useRef();
  const [countryCode, setCountryCode] = useState("+234");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleOverlayClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone.trim() || typeof onPhoneSubmit !== "function") return;
    
    setIsLoading(true);
    try {
      const formattedNumber = `${countryCode} ${phone}`;
      await onPhoneSubmit(formattedNumber);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={handleOverlayClick}>
      <div ref={modalRef} className="bg-white w-[90%] max-w-md rounded-xl shadow-xl p-6 relative">
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-black">
          <X size={24} />
        </button>

        <h2 className="text-xl font-semibold text-center mb-4">Welcome to Hadupad</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm mb-1 block">Country/Region</label>
            <select
              className="w-full border rounded-lg p-2"
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
            We'll call or text you to confirm your number. Standard message and data rates apply.
            <a href="#" className="text-[#DC4731] ml-1 underline">Privacy Policy</a>
          </p>

          <button 
            type="submit" 
            className="bg-[#DC4731] text-white py-2 rounded-lg hover:bg-[#c03d29] transition flex justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner"></span>
            ) : "Continue"}
          </button>

          <div className="flex items-center my-2">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-sm text-gray-400">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <button type="button" className="border rounded-lg py-2 flex items-center justify-start gap-2 hover:bg-gray-100 pl-4">
            <Mail size={20} className="text-gray-600" />
            <span className="text-center w-full">Continue with Email</span>
          </button>

          <button type="button" className="border rounded-lg py-2 flex items-center justify-start gap-2 hover:bg-gray-100 pl-4">
            <Facebook size={20} className="text-blue-600" />
            <span className="text-center w-full">Continue with Facebook</span>
          </button>

          <button type="button" className="border rounded-lg py-2 flex items-center justify-start gap-2 hover:bg-gray-100 pl-4">
            <FcGoogle size={20} />
            <span className="text-center w-full">Continue with Google</span>
          </button>

          <button type="button" className="border rounded-lg py-2 flex items-center justify-start gap-2 hover:bg-gray-100 pl-4">
            <Apple size={20} />
            <span className="text-center w-full">Continue with Apple</span>
          </button>
       </form>
      </div>
    </div>
  );
}