"use client";
import { X, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

const IdentityVerification = ({ isOpen, onClose, NINIdentityVerification }) => {
  const [nin, setNin] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleVerifyNiN = async () => {
    if (!nin) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      await NINIdentityVerification(nin);
      setIsSuccess(true);
      
      // Auto-close after 2 seconds
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Reset state when modal reopens
  useEffect(() => {
    if (isOpen) {
      setNin("");
      setIsSuccess(false);
      setError(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-2xl p-8 relative">
        <button
          onClick={onClose}
          className="absolute left-4 text-gray-600 hover:text-black"
        >
          <X size={24} />
        </button>

        {isSuccess ? (
          <div className="text-center">
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-xl font-bold mb-2">Verification Successful!</h2>
            <p className="text-gray-600">Your identity has been verified.</p>
          </div>
        ) : (
          <>
            <h2 className="text-center text-lg font-semibold mb-4">Step 2 of 2</h2>
            <p className="text-center text-xl font-bold mb-2">
              Verify your Identity 
            </p>
            <p className="text-center text-sm text-gray-600 mb-6">
              Enter your NIN number for verification
            </p>

            <input
              type="text"
              placeholder="NIN Number"
              value={nin}
              className="w-full px-4 py-3 mb-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#DC4731]"
              onChange={(e) => setNin(e.target.value)}
            />

            {error && (
              <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
            )}

            <button
              onClick={handleVerifyNiN}
              disabled={isLoading || !nin}
              className={`w-full py-3 rounded-xl text-white font-semibold ${
                isLoading || !nin
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-[#DC4731] hover:bg-[#c03d29]"
              } transition`}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default IdentityVerification;// // components/VerificationDialog.jsx


// "use client";
// import { X } from "lucide-react";
// import { useState } from "react";
// const IdentityVerification = ({ isOpen, onClose, NINIdentityVerification }) => {
//     const [nin, setNin] = useState()
//     const handleVerifyNiN = () => {
//      if (!nin) return;
//      NINIdentityVerification(nin)
//   };
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
//       <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-2xl p-8 relative">
//         <button
//           onClick={onClose}
//           className="absolute left-4 text-gray-600 hover:text-black"
//         >
//           <X size={24} />
//         </button>

//         <h2 className="text-center text-lg font-semibold mb-4">Step 2 of 2</h2>

//         <p className="text-center text-xl font-bold mb-2">
//           Verify your Identity 
//         </p>
//         <p className="text-center text-sm text-gray-600 mb-6">
//           Enter your NIN number for verification
//         </p>

//         <input
//           type="text"
//           placeholder="NIN Number"
//           className="w-full px-4 py-3 mb-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#DC4731]"
//           onChange={(e) => setNin(e.target.value)}
//         />

//         <button
//           onClick={handleVerifyNiN}
//           className="w-full py-3 rounded-xl text-white font-semibold bg-[#DC4731] hover:bg-[#c03d29] transition"
//         >
//           Verify
//         </button>
//       </div>
//     </div>
//   );
// };

// export default IdentityVerification;


