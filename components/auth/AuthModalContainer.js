"use client";

import { useState, useEffect } from "react";
import GuestSignupModal from "./GuestSignupModal";
import PhoneVerificationModal from "./PhoneVerificationModal";
import FinishSigninUp from "./FinishSigninUp";
import WelcomePage from "./WelcomePage";

export default function AuthModalContainer({ isOpen, onClose }) {
  const [step, setStep] = useState("signup");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStep("signup");
        setPhoneNumber("");
        setVerificationCode("");
        setUserData(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handlePhoneSubmit = (number) => {
    setPhoneNumber(number);
    setStep("verify");
  };

  const handleVerificationComplete = (code) => {
    setVerificationCode(code);
    setStep("finish");
  };

  const handleSignupComplete = (data) => {
    setUserData(data);
    setStep("welcome");
  };

  const handleBack = () => {
    if (step === "verify") {
      setStep("signup");
    } else if (step === "finish") {
      setStep("verify");
    } else if (step === "welcome") {
      setStep("finish");
    }
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
          onVerificationComplete={handleVerificationComplete}
          onBack={handleBack}
        />
      )}
      {step === "finish" && (
        <FinishSigninUp
          isOpen={true}
          onClose={onClose}
          onBack={handleBack}
          onComplete={handleSignupComplete}
          phoneNumber={phoneNumber}
          verificationCode={verificationCode}
        />
      )}
      {step === "welcome" && (
        <WelcomePage
          isOpen={true}
          onClose={onClose}
          onBack={handleBack}
          userData={userData}
        />
      )}
    </>
  );
}