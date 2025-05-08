// "use client";

// import { useEffect, useRef, useState } from "react";
// import { X } from "lucide-react";

// export default function PhoneVerificationModal({ isOpen, onClose, phoneNumber = "" }) {
//   const modalRef = useRef();
//   const [code, setCode] = useState(["", "", "", ""]);
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

//   const handleChange = (e, index) => {
//     const value = e.target.value.replace(/\D/, "");
//     if (!value) return;

//     const newCode = [...code];
//     newCode[index] = value;
//     setCode(newCode);

//     const nextInput = document.getElementById(`code-${index + 1}`);
//     if (nextInput) nextInput.focus();
//   };

//   const handleContinue = async () => {
//     const fullCode = code.join("");
//     if (fullCode.length === 4) {
//       setIsLoading(true);
//       try {
//         // Your verification logic here
//         console.log("Verifying code:", fullCode);
//         onClose();
//       } catch (error) {
//         console.error("Verification failed:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={handleOverlayClick}>
//       {/* Modal content remains the same as your original */}
//       <div ref={modalRef} className="bg-white w-[90%] max-w-md rounded-xl shadow-xl p-6 relative">
//         <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-black">
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
//           disabled={code.some((c) => c === "") || isLoading}
//           className={`w-full py-2 rounded-lg text-white flex justify-center ${
//             code.every((c) => c !== "") && !isLoading
//               ? "bg-[#DC4731] hover:bg-[#c03d29]"
//               : "bg-gray-300 cursor-not-allowed"
//           }`}
//         >
//           {isLoading ? (
//             <span className="loading loading-spinner"></span>
//           ) : "Continue"}
//         </button>

//         <div className="text-center mt-4 text-sm">
//           Didn't get a text?{" "}
//           <button className="text-[#DC4731] font-medium underline hover:text-[#b33220]">Send again</button>
//         </div>
//         <div className="text-center mt-2 text-sm">
//           <button className="underline text-gray-600 hover:text-black">Call me instead</button>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, X } from "lucide-react";

export default function PhoneVerificationModal({ 
  isOpen, 
  onClose, 
  onBack,
  phoneNumber = "", 
  onVerificationComplete 
}) {
  const modalRef = useRef();
  const [code, setCode] = useState(["", "", "", ""]);
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

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    if (!value) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    const nextInput = document.getElementById(`code-${index + 1}`);
    if (nextInput) nextInput.focus();
  };

  const handleContinue = async () => {
    const fullCode = code.join("");
    if (fullCode.length === 4) {
      setIsLoading(true);
      try {
        console.log("Verifying code:", fullCode);
        if (typeof onVerificationComplete === "function") {
          onVerificationComplete(fullCode);
        }
      } catch (error) {
        console.error("Verification failed:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={handleOverlayClick}>
      <div ref={modalRef} className="bg-white w-[90%] max-w-md rounded-xl shadow-xl p-6 relative">
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
          disabled={code.some((c) => c === "") || isLoading}
          className={`w-full py-2 rounded-lg text-white flex justify-center ${
            code.every((c) => c !== "") && !isLoading
              ? "bg-[#DC4731] hover:bg-[#c03d29]"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {isLoading ? (
            <span className="loading loading-spinner"></span>
          ) : "Continue"}
        </button>

        <div className="text-center mt-4 text-sm">
          Didn't get a text?{" "}
          <button className="text-[#DC4731] font-medium underline hover:text-[#b33220]">Send again</button>
        </div>
        <div className="text-center mt-2 text-sm">
          <button className="underline text-gray-600 hover:text-black">Call me instead</button>
        </div>
      </div>
    </div>
  );
}