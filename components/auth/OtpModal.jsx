'use client'
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import LoadingIndicator from "../LoadingIndicator";
import { resetVerifyOtpState, verifyOtp } from "@/redux/slices/verifyOtpSlice";
import { initiateRegistration } from '@/redux/slices/initiateUserSlice';

export default function OtpModal({ onVerifySuccess, onBack, phoneNumber = "", userId, userType, isOpen, title = "Enter OTP", subtitle = "Please enter the 4-digit code sent to your phone." }) {
  
  const [code, setCode] = useState(Array(4).fill(""));
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef([]);
  const dispatch = useDispatch();
  const { result, loading, error } = useSelector((state) => state.verifyOtp);

  useEffect(() => {
    if (!isOpen) {
      dispatch(resetVerifyOtpState());
      return;
    }
    setCode(Array(4).fill(""));
    setTimer(60);
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
    console.log('OtpModal props:', { userId, userType, phoneNumber });
  }, [isOpen, dispatch, userId, userType, phoneNumber]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  useEffect(() => {
    if (result) {
      console.log('OtpModal verifyOtp result:', result); // Debug log
      toast.success("OTP verified successfully!");
      onVerifySuccess(code.join(""));
      dispatch(resetVerifyOtpState());
    }
    if (error) {
      console.error('OtpModal verifyOtp error:', error); // Debug log
      toast.error(error);
      dispatch(resetVerifyOtpState());
    }
  }, [result, error, dispatch, onVerifySuccess, code]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    const fullCode = code.join("");
    if (fullCode.length !== 4) {
      toast.error("Please enter a 4-digit OTP");
      return;
    }
    if (!userId) {
      console.error('OtpModal handleContinue: userId missing'); // Debug log
      toast.error("User ID is missing. Please try registering again.");
      onBack();
      return;
    }
    console.log('OtpModal dispatching verifyOtp with:', { userId, otp: fullCode }); // Debug log
    dispatch(verifyOtp({ userId, otp: fullCode }));
  };

  const handleResend = async () => {
    if (!userId || !userType) {
      console.error('OtpModal handleResend: userId or userType missing', { userId, userType }); // Debug log
      toast.error("User ID or user type is missing. Please try registering again.");
      onBack();
      return;
    }
    try {
      const result = await dispatch(initiateRegistration({ phoneNumber, userType })).unwrap();
      console.log('OtpModal resend OTP result:', result); // Debug log
      toast.success("OTP resent!");
      setTimer(60);
    } catch (err) {
      console.error('OtpModal resend OTP error:', err); // Debug log
      toast.error(err.message || "Failed to resend OTP.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md mx-4">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{title}</h2>
          <p className="text-gray-600 text-sm sm:text-base mb-6">
            {subtitle} <span className="font-semibold">{phoneNumber}</span>
          </p>
          <form onSubmit={handleContinue} className="w-full">
            <div className="flex justify-center gap-3 sm:gap-4 mb-6">
              {code.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  className="w-12 h-12 sm:w-14 sm:h-14 text-lg sm:text-lg text-center border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all duration-200 bg-gray-50"
                  placeholder="-"
                />
              ))}
            </div>
            <button
              type="submit"
              disabled={loading || code.join("").length !== 4}
              className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold text-base sm:text-lg hover:bg-red-700 disabled:bg-red-300 transition-all duration-200 flex items-center justify-center"
            >
              {loading ? <LoadingIndicator /> : "Verify OTP"}
            </button>
          </form>
          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm sm:text-base">
              Didn't get a code?{' '}
              <button
                onClick={handleResend}
                disabled={timer > 0 || loading}
                className="font-semibold text-red-600 hover:text-red-800 disabled:text-gray-400 transition"
              >
                Resend OTP
              </button>
              {timer > 0 && <span className="text-gray-500"> ({timer}s)</span>}
            </p>
            <button
              onClick={onBack}
              className="mt-3 text-sm sm:text-base font-semibold text-red-600 hover:text-red-800 transition"
            >
              Change phone number
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}