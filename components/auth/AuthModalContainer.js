"use client";

import { useState, useEffect } from "react";
import GuestSignupModal from "./GuestSignupModal";
import PhoneVerificationModal from "./PhoneVerificationModal";
import FinishSigninUp from "./FinishSigninUp";
import WelcomePage from "./WelcomePage";
import ProfilePhotoDialog from "./ProfilePhotoDialog";
import IdentityVerification from "./IdentityVerification";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

export default function AuthModalContainer({ isOpen, onClose }) {
  const [step, setStep] = useState("signup");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [userData, setUserData] = useState(null); // Added state for userData
  const [user_Id, setUserId] = useState("");
  const [user_otp, setOtp] = useState("");
  const [error, setError] = useState(null); // Add error state
  const { login } = useAuth();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const handlePhoneSubmit = async (number) => {
    setPhoneNumber(number);
    if (!number) return;

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/register/initiate`, {
        phoneNumber: number,
        userType: "host",
      });
      console.log("API response:", response.data);
      const { userId, otp } = response.data;
      setUserId(userId);
      setOtp(otp);
      setStep("verify");
    } catch (error) {
      console.log("API error:", error.response?.data || error.message);
      setError(error.response?.data?.error || error.message); // Set error state

    }
  };

  if (user_otp) {
    console.log("your otp is: " + user_otp);
  }
  if (user_Id) {
    localStorage.setItem("userId", user_Id);
  }
  if (step === "photoUpload") {
    console.log("Rendering upload dialog");
  }

  const handleVerificationComplete = async (code) => {
    const userId = localStorage.getItem("userId");
    setVerificationCode(code);
    if (!code) return;
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/verify-otp`, {
        userId: userId,
        otp: code,
      });

      if (response.status === 200) {
        setStep("finish");
      } else {
        console.warn("Verification code does not match.");
        // Optionally show an error to the user here

        setError("Verification code does not match."); // Set error for non-200 responses

      }
    } catch (err) {
      console.error("Verification failed:", err);
      setError(err.response?.data?.error || "Invalid verification code"); // Set error from catch
    }
  };

  const handleSignupComplete = (data) => {
    setUserData(data); // Store the user data
    login(data); // Save to auth context
    setStep("welcome");
  };

  const handlePhotoUploadPage = () => {
    setStep("photoUpload");
  };
  const handlePhotoUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("profilePicture", file);
      const userId = localStorage.getItem("userId");
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/profile-picture/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setStep("VerifyIdentity");
      console.log("Profile photo uploaded successfully");
      // Optionally update user state/UI
    } catch (error) {
      console.error("Failed to upload photo:", error);
    }
  };

  const handleVerifyIdentity = async (identificationNumber) => {
    const userId = localStorage.getItem("userId");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/host-verification/${userId}`,
        {
          identificationNumber: identificationNumber,
        }
      );

      if (response.status === 200) {
        return response.data; // Return success
      } else {
        throw new Error(response.data.message || "Verification failed");
      }
    } catch (err) {
      throw err; // Re-throw the error to be caught in the component
    }
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
          error={error} // Pass error to GuestSignupModal
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
          userData={userData} // Now properly passing the userData
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
      {step === "VerifyIdentity" && (
        <IdentityVerification
          isOpen={true}
          onClose={onClose}
          NINIdentityVerification={handleVerifyIdentity}
        />
      )}
    </>
  );
}
