"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, X } from "lucide-react";
import axios from "axios";

export default function PhoneVerificationModal({
  isOpen,
  onClose,
  onBack,
  phoneNumber = "",
  onVerificationComplete,
  error, 
}) {
  const modalRef = useRef();
  const firstInputRef = useRef(null);
  const [code, setCode] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleOverlayClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) onClose();
  };

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    if (value === "") {
      const newCode = [...code];
      newCode[index] = "";
      setCode(newCode);
      return;
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    const nextInput = document.getElementById(`code-${index + 1}`);
    if (nextInput) nextInput.focus();
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
      try {
        console.log("Verifying code:", fullCode);
        if (typeof onVerificationComplete === "function") {
          await onVerificationComplete(fullCode);
        }
      } catch (error) {
        console.error("Verification failed:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleResendCode = async () => {
    if (!phoneNumber) return;

    try {
      setIsLoading(true);
      setCountdown(30);
      setCanResend(false);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register/initiate`, {
        phoneNumber: phoneNumber,
        userType: "user",
      });

      console.log("OTP resent:", response.data);
      console.log("OTP is:" + response.data.otp);
    } catch (error) {
      console.error("Resend failed:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

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
          onClick={onBack}
          className="absolute left-4 text-gray-600 hover:text-black"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={onClose}
          className="absolute right-4 text-gray-600 hover:text-black"
        >
          <X size={24} />
        </button>

        <h2 className="text-lg font-semibold text-center mb-1">
          We sent a code
        </h2>

        <div className="-mx-4 mt-4 mb-10">
          <hr className="border-t border-gray-100" />
        </div>

        <h2 className="text-lg font-semibold text-center mb-1">
          Confirm your phone number
        </h2>

        <p className="text-sm text-center mb-4 text-gray-600">
          4-digit code sent to <strong>{phoneNumber}</strong>
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
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={index === 0 ? firstInputRef : null}
              className="w-12 h-12 text-xl text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DC4731]"
            />
          ))}

        </div>
          {/* Add error display right below the OTP inputs */}
           {error && (
          <div 
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" 
            role="alert"
          >
            {error}
          </div>
        )}


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
          ) : (
            "Continue"
          )}
        </button>
        <div className="text-center mt-4 text-sm">
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
        <div className="text-center mt-2 text-sm">
          <button className="underline text-gray-600 hover:text-black">
            Call me instead
          </button>
        </div>
      </div>
    </div>
  );
}
