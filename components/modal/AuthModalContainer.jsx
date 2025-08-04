"use client";

import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import OtpModal from "../auth/OtpModal";
import ProfilePhotoForm from "../auth/ProfilePhotoForm";
import HostVerificationForm from "../auth/HostVerificationForm";
import InitiateAuthForm from "../auth/InitiateAuthForm";
import SignupForm from "../auth/SignupForm";
import GuestCompletionModal from "../auth/GuestCompletionModal";
import { ChevronLeft } from 'lucide-react';

export default function AuthModalContainer({ isOpen, onClose, userType }) {
  const [step, setStep] = useState("initiate"); // 'initiate', 'otp', 'signup', 'profile', 'verification'
  const [userData, setUserData] = useState({});
  const [phoneNumber, setPhoneNumber] = useState("");
  const { user: initiateUser } = useSelector((state) => state.initiate);

  const handleInitiateSuccess = (phone) => {
    setPhoneNumber(phone);
    setStep("otp");
  };

  const handleSignupSuccess = (newUserData) => {
    setUserData({ ...userData, ...newUserData });
    if (userType === "host") {
      setStep("profile");
    } else {
      setStep("complete");
    }
  };

  
  const handleGuestProfileComplete = () => {
    onClose();
    // Optionally, trigger login modal here if using context or parent callback
    if (typeof window !== 'undefined') {
      // Dispatch a custom event to signal login modal should open
      window.dispatchEvent(new CustomEvent('openLoginModal'));
    }
  };

  const handleVerifySuccess = (data) => {
    console.log("OTP verification success:", data);
  };

  const handleOtpVerified = () => {
    // After OTP, both user types go to the main signup form
    setStep("signup");
  };

  const handleProfileSuccess = (data) => {
    console.log("Profile setup complete:", data);
    setStep('verification'); // Host flow continues to verification
  };

  const handleVerificationSuccess = () => {
    console.log("Verification complete.");
    onClose(); // Final step for host, close modal
  };

  const handleBack = () => {
    switch (step) {
      case 'otp':
        setStep('initiate');
        break;
      case 'profile':
        setStep('otp');
        break;
      case 'verification':
        setStep('profile');
        break;
      case 'signup':
        setStep('otp');
        break;
      default:
        break;
    }
  }

  const getStepTitle = () => {
    switch (step) {
      case 'initiate':
        return 'Log in or sign up';
      case 'otp':
        return 'Confirm your number';
      case 'signup':
        return 'Finish signing up';
      case 'profile':
      case 'guestProfile':
        return 'Add a profile photo';
      case 'verification':
        return 'Confirm your identity';
      case 'complete':
        return 'Welcome to Hadupad';
      default:
        return 'Welcome';
    }
  };

  const renderStep = () => {
    switch (step) {
      case "initiate":
        return <InitiateAuthForm onContinue={handleInitiateSuccess} />;
      case "otp":
        return (
          <OtpModal
            onVerifySuccess={handleOtpVerified}
            onBack={handleBack}
            phoneNumber={phoneNumber}
            isOpen={isOpen}
          />
        );
      case "signup":
        return (
          <SignupForm
            onSignupSuccess={handleSignupSuccess}
            onBack={handleBack}
            userType={userType}
          />
        );
      case "profile": // Host only
        return (
          <ProfilePhotoForm
            onProfileSuccess={handleProfileSuccess}
            onSkip={handleProfileSuccess}
            userId={userData.id}
          />
        );
      case "guestProfile": // Guest profile upload step
        return (
          <ProfilePhotoForm
            onProfileSuccess={handleGuestProfileComplete}
            onSkip={handleGuestProfileComplete}
            userId={userData.id}
          />
        );
      case "verification": // Host only
        return (
          <HostVerificationForm 
            onVerificationSuccess={handleVerificationSuccess} 
            onBack={handleBack} 
            userId={userData.id}
          />
        );
      case "complete": // Guest only
        return (
          <GuestCompletionModal
            onContinue={() => setStep("guestProfile")}
            onSkip={() => handleGuestProfileComplete()}
          />
        )
      default:
        return null;
    }
  };

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      const timer = setTimeout(() => {
        setStep("signup");
        setUserData({});
        setPhoneNumber("");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
        <div className="relative bg-white w-full h-full sm:h-auto sm:max-h-[90vh] sm:w-full sm:max-w-md sm:rounded-lg sm:shadow-xl overflow-y-auto">
            <div className="sticky top-0 bg-white z-10 sm:hidden p-4 border-b flex items-center">
        <button onClick={handleBack} className="text-gray-600 hover:text-black">
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-lg font-semibold text-center flex-1">{getStepTitle()}</h2>
      </div>
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-600 hover:text-black hidden sm:block">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
            {renderStep()}
        </div>
    </div>
  );
}
