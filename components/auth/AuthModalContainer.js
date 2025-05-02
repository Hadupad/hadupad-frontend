"use client";

import { useState, useEffect } from "react";
import GuestSignupModal from "./GuestSignupModal";
import PhoneVerificationModal from "./PhoneVerificationModal";

export default function AuthModalContainer({ isOpen, onClose }) {
  const [step, setStep] = useState("signup");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Reset the flow when modal closes
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStep("signup");
        setPhoneNumber("");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handlePhoneSubmit = (number) => {
    setPhoneNumber(number);
    setStep("verify");
  };

  if (!isOpen) return null;

  return (
    <>
      {step === "signup" && (
        <GuestSignupModal 
          isOpen={true}
          onClose={onClose}
          onPhoneSubmit={handlePhoneSubmit}
        />
      )}
      {step === "verify" && (
        <PhoneVerificationModal 
          isOpen={true}
          onClose={onClose}
          phoneNumber={phoneNumber}
        />
      )}
    </>
  );
}