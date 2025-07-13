"use client";

import { useState, useEffect } from "react";
import GuestSignupModal from "./GuestSignupModal";
import PhoneVerificationModal from "./PhoneVerificationModal";
import FinishSigninUp from "./FinishSigninUp";
import WelcomePage from "./WelcomePage";
import ProfilePhotoDialog from "./ProfilePhotoDialog";
import IdentityVerification from "./IdentityVerification";
// import useAuth from "../../hooks/useAuth";

export default function AuthModalContainer({ isOpen, onClose, userType }) {
  const [step, setStep] = useState("signup");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [userData, setUserData] = useState(null);
  const [user_Id, setUserId] = useState("");
  const [user_otp, setOtp] = useState("");
  const [error, setError] = useState(null);
  const clearError = () => setError(null);


  const handlePhoneSubmit = async (number) => {
    setPhoneNumber(number);
    if (!number) return;
    setError(null);

    // Simulate success response
    const mockUserId = "12345";
    const mockOtp = "0000";
    setUserId(mockUserId);
    setOtp(mockOtp);
    setStep("verify");
  };

  const handleVerificationComplete = async (code) => {
    setVerificationCode(code);
    if (!code) return;

    // Simulate OTP verification
    if (code === user_otp) {
      setStep("finish");
    } else {
      setError("Verification code does not match.");
    }
  };

  const handleSignupComplete = (data) => {
    setUserData(data);
    login(data); // Still using auth context
    setStep("welcome");
  };

  const handlePhotoUploadPage = () => {
    setStep("photoUpload");
  };

  const handlePhotoUpload = async (file) => {
    setStep("VerifyIdentity");
  };

  const handleVerifyIdentity = async (identificationNumber) => {
    return { success: true };
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

  if (!isOpen) return null;

  return (
    <>
      {step === "signup" && (
        <GuestSignupModal
          isOpen={true}
          onClose={onClose}
          onPhoneSubmit={handlePhoneSubmit}
          error={error}
          clearError={clearError}
        />
      )}
      {step === "verify" && (
        <PhoneVerificationModal
          isOpen={true}
          onClose={onClose}
          phoneNumber={phoneNumber}
          onVerificationComplete={handleVerificationComplete}
          onBack={handleBack}
          error={error}
          devOtp={user_otp}
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
          profilePhotoDialog={handlePhotoUploadPage}
        />
      )}
      {step === "photoUpload" && (
        <ProfilePhotoDialog
          isOpen={true}
          onClose={onClose}
          onPhotoSelect={handlePhotoUpload}
        />
      )}
      {step === "VerifyIdentity" && userType === "host" && (
        <IdentityVerification
          isOpen={true}
          onClose={onClose}
          NINIdentityVerification={handleVerifyIdentity}
        />
      )}
    </>
  );
}
