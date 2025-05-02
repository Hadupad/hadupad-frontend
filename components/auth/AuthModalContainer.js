// "use client";

// import { useState } from "react";
// import GuestSignupModal from "./GuestSignupModal";
// import PhoneVerificationModal from "./PhoneVerificationModal";

// export default function AuthModalContainer() {
//   const [modalState, setModalState] = useState<{
//     isOpen: boolean;
//     step: "signup" | "verify" | null;
//     phoneNumber: string;
//   }>({
//     isOpen: false,
//     step: null,
//     phoneNumber: "",
//   });

//   const openSignup = () => {
//     setModalState({
//       isOpen: true,
//       step: "signup",
//       phoneNumber: "",
//     });
//   };

//   const handlePhoneSubmit = (phoneNumber: string) => {
//     setModalState(prev => ({
//       ...prev,
//       step: "verify",
//       phoneNumber,
//     }));
//   };

//   const handleClose = () => {
//     setModalState({
//       isOpen: false,
//       step: null,
//       phoneNumber: "",
//     });
//   };

//   return (
//     <>
//       <button
//         onClick={openSignup}
//         className="bg-[#DC4731] text-white px-4 py-2 rounded-lg"
//       >
//         Register as Guest
//       </button>

//       {modalState.isOpen && modalState.step === "signup" && (
//         <GuestSignupModal
//           onClose={handleClose}
//           onPhoneSubmit={handlePhoneSubmit}
//         />
//       )}

//       {modalState.isOpen && modalState.step === "verify" && (
//         <PhoneVerificationModal
//           onClose={handleClose}
//           phoneNumber={modalState.phoneNumber}
//         />
//       )}
//     </>
//   );
// }
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
