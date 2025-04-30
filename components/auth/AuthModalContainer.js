"use client";

import { useState } from "react";
import GuestSignupModal from "./GuestSignupModal";
import PhoneVerificationModal from "./PhoneVerificationModal";

export default function AuthModalContainer() {
  const [step, setStep] = useState("signup"); // 'signup' or 'verify'
  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneSubmit = (number) => {
    setPhoneNumber(number);
    setStep("verify");
  };

  const handleClose = () => {
    setStep(""); // close everything
  };

  return (
    <>
      {step === "signup" && (
        <GuestSignupModal onClose={handleClose} onPhoneSubmit={handlePhoneSubmit} />
      )}
      {step === "verify" && (
        <PhoneVerificationModal onClose={handleClose} phoneNumber={phoneNumber} />
      )}
    </>
  );
}
