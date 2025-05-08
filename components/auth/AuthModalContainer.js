// "use client";

// import { useState, useEffect } from "react";
// import GuestSignupModal from "./GuestSignupModal";
// import PhoneVerificationModal from "./PhoneVerificationModal";

// export default function AuthModalContainer({ isOpen, onClose }) {
//   const [step, setStep] = useState("signup");
//   const [phoneNumber, setPhoneNumber] = useState("");

//   // Reset the flow when modal closes
//   useEffect(() => {
//     if (!isOpen) {
//       const timer = setTimeout(() => {
//         setStep("signup");
//         setPhoneNumber("");
//       }, 300);
//       return () => clearTimeout(timer);
//     }
//   }, [isOpen]);

//   const handlePhoneSubmit = (number) => {
//     setPhoneNumber(number);
//     setStep("verify");
//   };

//   if (!isOpen) return null;

//   return (
//     <>
//       {step === "signup" && (
//         <GuestSignupModal 
//           isOpen={true}
//           onClose={onClose}
//           onPhoneSubmit={handlePhoneSubmit}
//         />
//       )}
//       {step === "verify" && (
//         <PhoneVerificationModal 
//           isOpen={true}
//           onClose={onClose}
//           phoneNumber={phoneNumber}
//         />
//       )}
//     </>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import GuestSignupModal from "./GuestSignupModal";
import PhoneVerificationModal from "./PhoneVerificationModal";
import FinishSigninUp from "./FinishSigninUp";

export default function AuthModalContainer({ isOpen, onClose }) {
  const [step, setStep] = useState("signup");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStep("signup");
        setPhoneNumber("");
        setVerificationCode("");
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

  const handleBack = () => {
    if (step === "verify") {
      setStep("signup");
    } else if (step === "finish") {
      setStep("verify");
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
          phoneNumber={phoneNumber}
          verificationCode={verificationCode}
        />
      )}
    </>
  );
}