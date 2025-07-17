"use client";

import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

const IdentityVerification = () => {
  const [nin, setNin] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleVerify = () => {
    if (nin.length === 10) {
      setIsSuccess(true);
      setError(null);

      // Optional: Reset input after 2 seconds
      setTimeout(() => {
        setNin("");
        setIsSuccess(false);
      }, 2000);
    } else {
      setError("NIN must be exactly 10 digits.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-md">
        {isSuccess ? (
          <div className="text-center py-10">
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-xl font-bold mb-2">Registration Successful!</h2>
            <p className="text-gray-600">Your account is ready. Welcome!</p>
          </div>
        ) : (
          <>
            <h2 className="text-center text-lg font-semibold mb-4">
              Step 2 of 2
            </h2>
            <p className="text-center text-xl font-bold mb-2">
              Verify your Identity
            </p>
            <p className="text-center text-sm text-gray-600 mb-6">
              Enter your NIN number (10 digits)
            </p>

            <input
              type="text"
              placeholder="NIN Number"
              value={nin}
              maxLength={10}
              onChange={(e) => {
                const digitsOnly = e.target.value.replace(/\D/g, "");
                setNin(digitsOnly);
              }}
              className="w-full px-4 py-3 mb-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#DC4731]"
            />

            {error && (
              <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
            )}

            <button
              onClick={handleVerify}
              disabled={nin.length !== 10}
              className={`w-full py-3 rounded-xl text-white font-semibold transition ${
                nin.length === 10
                  ? "bg-[#DC4731] hover:bg-[#c03d29]"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              Verify
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default IdentityVerification;
