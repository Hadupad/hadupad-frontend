"use client";

import { useEffect, useRef, useState } from "react"; 
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function OtpVerificationPage() {
  const router = useRouter();
  const firstInputRef = useRef(null);
  const [code, setCode] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [phoneNumber] = useState("+2348123456789"); // Default or fetch from context

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value !== "" && index < 3) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (code[index] === "") {
        const prevInput = document.getElementById(`code-${index - 1}`);
        if (prevInput) prevInput.focus();
      } else {
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
      }
    }
  };

 const handleContinue = async () => {
   const fullCode = code.join("");
   if (fullCode.length === 4) {
     setIsLoading(true);
     // Simulate API call
     setTimeout(() => {
       setIsLoading(false);
       router.push("/register/guest-finish-signup"); // Redirect here
     }, 1000);
   }
 };


  const handleResendCode = () => {
    setCountdown(30);
    setCanResend(false);
    alert("OTP resent!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow-sm p-6 relative">
        <button
          onClick={() => router.back()}
          className="absolute left-4 text-gray-600 hover:text-black"
        >
          <ChevronLeft size={24} />
        </button>

        <h2 className="text-xl font-semibold text-center mb-1">
          Verify your phone number
        </h2>

        <div className="-mx-4 mt-4 mb-6">
          <hr className="border-t border-gray-100" />
        </div>

        <p className="text-sm text-center mb-6 text-gray-600">
          4-digit code sent to <strong>{phoneNumber}</strong>
        </p>

        <div className="flex justify-center gap-3 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={index === 0 ? firstInputRef : null}
              className="w-12 h-12 text-xl text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DC4731]"
            />
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={code.some((c) => c === "") || isLoading}
          className={`w-full py-3 rounded-lg text-white flex justify-center ${
            code.every((c) => c !== "") && !isLoading
              ? "bg-[#DC4731] hover:bg-[#c03d29]"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {isLoading ? "Verifying..." : "Continue"}
        </button>

        <div className="text-center mt-6 text-sm">
          Didn&apos;t get a text?{" "}
          <button
            onClick={handleResendCode}
            disabled={!canResend}
            className={`font-medium ${
              canResend
                ? "text-[#DC4731] underline hover:text-[#b33220]"
                : "text-gray-400"
            }`}
          >
            {canResend ? "Send again" : `Resend in ${countdown}s`}
          </button>
        </div>

        <div className="text-center mt-3 text-sm">
          <button className="underline text-gray-600 hover:text-black">
            Call me instead
          </button>
        </div>
      </div>
    </div>
  );
}
