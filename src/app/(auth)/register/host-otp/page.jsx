'use client';

import { useEffect, useRef, useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  verifyOtp,
  resetVerifyOtpState,
} from "../../../../redux/slices/verifyOtpSlice";
import { initiateRegistration } from "../../../../redux/slices/initiateUserSlice";
import SuccessModal from "../../../../reusable/SuccessModal"; 
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function OtpVerificationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const { user, error: initiateError } = useSelector((state) => state.initiate);
  const {
    loading,
    error: verifyError,
    result,
  } = useSelector((state) => state.verifyOtp);
  const firstInputRef = useRef(null);
  const [code, setCode] = useState(["", "", "", ""]);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [phoneNumber] = useState(searchParams.get("phone"));
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
    return () => {
      dispatch(resetVerifyOtpState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  useEffect(() => {
    if (result) {
      setShowSuccessModal(true);
    }
  }, [result]);

  useEffect(() => {
    if (verifyError) {
      toast.error(getFriendlyErrorMessage(verifyError), {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        className: 'bg-red-500 text-white rounded-lg shadow-lg p-4 font-semibold',
        bodyClassName: 'flex items-center',
      });
    }
    if (initiateError) {
      const errorMessage =
        initiateError === 'Failed to initiate registration: User with this phone number already exists'
          ? (
              <div>
                This phone number is already registered. Please{' '}
                <a href="/login" className="text-[#DC4731] underline hover:text-[#c03d29]">
                  try logging in
                </a>{' '}
                or use a different number.
              </div>
            )
          : getFriendlyErrorMessage(initiateError);
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        className: 'bg-red-500 text-white rounded-lg shadow-lg p-4 font-semibold',
        bodyClassName: 'flex items-center',
      });
    }
  }, [verifyError, initiateError]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value !== "" && index < 3) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (code[index] === "") {
        const prevInput = document.getElementById(`code-${index - 1}`);
        if (prevInput) prevInput.focus();
      } else {
        const newCode = [...code];
        newCode[index] = "";
        setCode(newCode);
      }
    }
  };

  const handleContinue = async () => {
    const fullCode = code.join("");
    if (fullCode.length !== 4 || !user?.userId) return;

    try {
      await dispatch(
        verifyOtp({ userId: user.userId, otp: fullCode })
      ).unwrap();
    } catch (err) {
      console.error("OTP verification error:", err);
    }
  };

  const handleResendCode = async () => {
    setCountdown(30);
    setCanResend(false);
    try {
      await dispatch(
        initiateRegistration({ phoneNumber, userType: "user" })
      ).unwrap();
      toast.success('OTP resent successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        className: 'bg-green-500 text-white rounded-lg shadow-lg p-4 font-semibold',
        bodyClassName: 'flex items-center',
      });
    } catch (err) {
      console.error("Resend OTP error:", err);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    router.push("/register/host-signup");
  };

  const getFriendlyErrorMessage = (error) => {
    if (error.includes("OTP has expired")) {
      return "The OTP has expired. Please request a new one.";
    }
    return error || "An error occurred.";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        transition={Slide}
      />
      <div className="bg-white w-full max-w-md rounded-xl shadow-sm p-6 relative">
        <button
          onClick={() => router.back()}
          className="absolute left-4 text-gray-600 hover:text-black"
        >
          <ChevronLeft size={24} />
        </button>

        <h2 className="text-xl font-semibold text-center mb-1">
          Verify your phone number
        </h2>

        <div className="-mx-4 mt-4 mb-6">
          <hr className="border-t border-gray-100" />
        </div>

        <p className="text-sm text-center mb-6 text-gray-600">
          4-digit code sent to <strong>{phoneNumber}</strong>
        </p>

        <div className="flex justify-center gap-3 mb-6">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`code-${index}`}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={index === 0 ? firstInputRef : null}
              className="w-12 h-12 text-xl text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DC4731]"
            />
          ))}
        </div>

        <button
          onClick={handleContinue}
          disabled={code.some((c) => c === "") || loading || !user?.userId}
          className={`w-full py-3 rounded-lg text-white flex justify-center ${
            code.every((c) => c !== "") && !loading && user?.userId
              ? "bg-[#DC4731] hover:bg-[#c03d29]"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {loading ? "Verifying..." : "Continue"}
        </button>

        <div className="text-center mt-6 text-sm">
          Didn't get a text? {" "}
          <button
            onClick={handleResendCode}
            disabled={!canResend}
            className={`font-medium ${
              canResend
                ? "text-[#DC4731] underline hover:text-[#b33220]"
                : "text-gray-400"
            }`}
          >
            {canResend ? "Send again" : `Resend in ${countdown}s`}
          </button>
        </div>

        {/* <div className="text-center mt-3 text-sm">
          <button className="underline text-gray-600 hover:text-black">
            Call me instead
          </button>
        </div> */}

        <SuccessModal
          isOpen={showSuccessModal}
          onClose={handleModalClose}
          message="OTP Verified Successfully!"
        />
      </div>
    </div>
  );
}