'use client'
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import OtpModal from "../auth/OtpModal";
import ProfilePhotoForm from "../auth/ProfilePhotoForm";
import HostVerificationForm from "../auth/HostVerificationForm";
import InitiateAuthForm from "../auth/InitiateAuthForm";
import SignupForm from "../auth/SignupForm";
import GuestCompletionModal from "../auth/GuestCompletionModal";
import { ChevronLeft } from 'lucide-react';
import { toast } from 'react-toastify';

export default function AuthModalContainer({ isOpen, onClose, userType }) {
  const [step, setStep] = useState("initiate");
  const [userData, setUserData] = useState({});
  const [phoneNumber, setPhoneNumber] = useState("");
  const { user: initiateUser } = useSelector((state) => state.initiate);
  const router = useRouter();

  console.log('AuthModalContainer - User Type:', userType);
  console.log('AuthModalContainer - User Data:', userData);

  const handleInitiateSuccess = (phone, userId) => {
    console.log('handleInitiateSuccess:', { phone, userId });
    setPhoneNumber(phone);
    setUserData({ ...userData, userId });
    setStep("otp");
  };

  const handleSignupSuccess = (newUserData) => {
    console.log('handleSignupSuccess:', newUserData);
    setUserData({ ...userData, ...newUserData });
    if (userType === "host") {
      setStep("profile");
    } else {
      setStep("complete");
    }
  };

  const handleGuestProfileComplete = () => {
    console.log('handleGuestProfileComplete');
    toast.success('Account created successfully!');
    onClose();
    router.push('/guest'); // Redirect to guest dashboard
  };

  const handleVerifySuccess = () => {
    console.log('handleOtpVerified - Proceeding to signup');
    setStep("signup");
  };

  const handleProfileSuccess = (data) => {
    console.log('handleProfileSuccess:', data);
    setUserData({ ...userData, photoUrl: data.photoUrl });
    if (userType === "host") {
      setStep('verification');
    } else {
      setStep('complete');
    }
  };

  const handleVerificationSuccess = () => {
    console.log('handleVerificationSuccess');
    toast.success('Host account created successfully!');
    onClose();
    router.push('/host'); // Redirect to host dashboard
  };

  const handleBack = () => {
    console.log('handleBack - Current step:', step);
    switch (step) {
      case 'otp':
        setStep('initiate');
        break;
      case 'signup':
        setStep('otp');
        break;
      case 'profile':
        setStep('signup');
        break;
      case 'verification':
        setStep('profile');
        break;
      case 'complete':
        setStep('signup');
        break;
      default:
        break;
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 'initiate':
        return 'Log in or sign up';
      case 'otp':
        return 'Confirm your number';
      case 'signup':
        return 'Finish signing up';
      case 'profile':
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
    console.log('renderStep - Current step:', step, 'userId:', userData.userId);
    switch (step) {
      case "initiate":
        return <InitiateAuthForm userType={userType} onContinue={handleInitiateSuccess} />;
      case "otp":
        return (
          <OtpModal
            onVerifySuccess={handleVerifySuccess}
            onBack={handleBack}
            phoneNumber={phoneNumber}
            userId={userData.userId}
            userType={userType}
            isOpen={isOpen}
          />
        );
      case "signup":
        return (
          <SignupForm
            onSignupSuccess={handleSignupSuccess}
            onBack={handleBack}
            userType={userType}
            userId={userData.userId}
          />
        );
      case "profile":
        return (
          <ProfilePhotoForm
            onProfileSuccess={handleProfileSuccess}
            onSkip={() => handleProfileSuccess({ photoUrl: null })}
            userId={userData.userId}
          />
        );
      case "verification":
        return (
          <HostVerificationForm
            onVerificationSuccess={handleVerificationSuccess}
            onBack={handleBack}
            userId={userData.userId}
          />
        );
      case "complete":
        return (
          <GuestCompletionModal
            onContinue={() => setStep("profile")}
            onSkip={handleGuestProfileComplete}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStep("initiate");
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