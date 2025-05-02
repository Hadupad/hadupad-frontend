// "use client";

// import { useState } from "react";
// import { X } from "lucide-react";

// interface PhoneVerificationModalProps {
//   onClose: () => void;
//   phoneNumber: string;
// }

// export default function PhoneVerificationModal({ 
//   onClose, 
//   phoneNumber 
// }: PhoneVerificationModalProps) {
//   const [code, setCode] = useState(["", "", "", ""]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
//     const value = e.target.value.replace(/\D/, "");
//     if (!value) return;

//     const newCode = [...code];
//     newCode[index] = value;
//     setCode(newCode);

//     // Focus next input
//     if (value && index < 3) {
//       const nextInput = document.getElementById(`code-${index + 1}`);
//       if (nextInput) nextInput.focus();
//     }
//   };

//   const handleContinue = () => {
//     const fullCode = code.join("");
//     if (fullCode.length === 4) {
//       console.log("Verification code submitted:", fullCode);
//       // Handle verification logic here
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
//       <div className="bg-white w-[90%] max-w-md rounded-xl shadow-xl p-6 relative">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-600 hover:text-black"
//           aria-label="Close modal"
//         >
//           <X size={24} />
//         </button>

//         <h2 className="text-lg font-semibold text-center mb-1">We sent a code</h2>
//         <p className="text-sm text-center mb-4 text-gray-600">
//           Enter the 4-digit code sent to <strong>{phoneNumber}</strong>
//         </p>

//         <div className="flex justify-center gap-3 mb-4">
//           {code.map((digit, index) => (
//             <input
//               key={index}
//               id={`code-${index}`}
//               type="text"
//               inputMode="numeric"
//               maxLength={1}
//               value={digit}
//               onChange={(e) => handleChange(e, index)}
//               className="w-12 h-12 text-xl text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DC4731]"
//             />
//           ))}
//         </div>

//         <button
//           onClick={handleContinue}
//           disabled={code.some(c => c === "")}
//           className={`w-full py-2 rounded-lg text-white ${
//             code.every(c => c !== "")
//               ? "bg-[#DC4731] hover:bg-[#c03d29]"
//               : "bg-gray-300 cursor-not-allowed"
//           }`}
//         >
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

export default function PhoneVerificationModal({ onClose, phoneNumber = "" }) {
  const modalRef = useRef();
  const [code, setCode] = useState(["", "", "", ""]);

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

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    if (!value) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    const nextInput = document.getElementById(`code-${index + 1}`);
    if (nextInput) nextInput.focus();
  };

  const handleContinue = () => {
    const fullCode = code.join("");
    if (fullCode.length === 4) {
      console.log("Entered Code:", fullCode);
      // Handle verification logic here
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={handleOverlayClick}>
      <div ref={modalRef} className="bg-white w-[90%] max-w-md rounded-xl shadow-xl p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-black">
          <X size={24} />
        </button>

        <h2 className="text-lg font-semibold text-center mb-1">We sent a code</h2>
        <p className="text-sm text-center mb-4 text-gray-600">
          Enter the 4-digit code sent to <strong>{phoneNumber}</strong>
        </p>

        <div className="flex justify-center gap-3 mb-4">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              className="w-12 h-12 text-xl text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DC4731]"
            />
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={code.some((c) => c === "")}
          className={`w-full py-2 rounded-lg text-white ${
            code.every((c) => c !== "")
              ? "bg-[#DC4731] hover:bg-[#c03d29]"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Continue
        </button>

        <div className="text-center mt-4 text-sm">
          Didn’t get a text?{" "}
          <button className="text-[#DC4731] font-medium underline hover:text-[#b33220]">Send again</button>
        </div>
        <div className="text-center mt-2 text-sm">
          <button className="underline text-gray-600 hover:text-black">Call me instead</button>
        </div>
      </div>
    </div>
  );
}
