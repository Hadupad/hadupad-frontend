// "use client";

// import { useState } from "react";
// import SignupCard from "../../../../components/auth/SignupCard";
// import OtpVerification from "../../../../components/auth/OtpVerification";
// import FinishSigninUp from "../../../../components/auth/FinishSigninUp";

// export default function RegisterPage() {
//   const [step, setStep] = useState("signup"); // 'signup', 'otp', or 'finish'
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [otpCode, setOtpCode] = useState("");

//   const handleSignupSuccess = (number) => {
//     setPhoneNumber(number);
//     setStep("otp");
//   };

//   const handleOtpVerificationComplete = (code) => {
//     setOtpCode(code);
//     setStep("finish");
//   };

//   const handleBackToSignup = () => setStep("signup");
//   const handleBackToOtp = () => setStep("otp");

//   return (
//     <>
//       {step === "signup" && <SignupCard onSuccess={handleSignupSuccess} />}

//       {step === "otp" && (
//         <OtpVerification
//           isOpen={true}
//           onClose={handleBackToSignup}
//           onBack={handleBackToSignup}
//           phoneNumber={phoneNumber}
//           onVerificationComplete={handleOtpVerificationComplete}
//           devOtp="1234"
//         />
//       )}

//       {step === "finish" && (
//         <FinishSigninUp phoneNumber={phoneNumber} verificationCode={otpCode} />
//       )}
//     </>
//   );
// }


"use client";

import { useState } from "react";
import SignupCard from "../../../../components/auth/SignupCard";
import OtpVerification from "../../../../components/auth/OtpVerification";
import FinishSigninUp from "../../../../components/auth/FinishSigninUp";
import ProfilePhoto from "../../../../components/auth/ProfilePhoto"; // 👈 Make sure this exists

export default function RegisterPage() {
  const [step, setStep] = useState("signup");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [userData, setUserData] = useState({});

  const handleSignupSuccess = (number) => {
    setPhoneNumber(number);
    setStep("otp");
  };

  const handleOtpVerificationComplete = (code) => {
    setOtpCode(code);
    setStep("finish");
  };

  const handleFinishSignup = (data) => {
    setUserData(data); // Save form data
    setStep("photo"); // 👈 move to photo step
  };

  const handleBackToSignup = () => setStep("signup");
  const handleBackToOtp = () => setStep("otp");

  return (
    <>
      {step === "signup" && <SignupCard onSuccess={handleSignupSuccess} />}

      {step === "otp" && (
        <OtpVerification
          isOpen={true}
          onClose={handleBackToSignup}
          onBack={handleBackToSignup}
          phoneNumber={phoneNumber}
          onVerificationComplete={handleOtpVerificationComplete}
          devOtp="1234"
        />
      )}

      {step === "finish" && (
        <FinishSigninUp
          phoneNumber={phoneNumber}
          verificationCode={otpCode}
          onComplete={handleFinishSignup} // 👈 receives the form data
        />
      )}

      {step === "photo" && (
        <ProfilePhoto user={userData} /> // 👈 Display your photo upload component
      )}

      {step === "identity" && (
        <IdentityVerificationCard
          onComplete={handleIdentityComplete}
          onBack={() => setStep("photo")}
        />
      )}
    </>
  );
}
