import { useEffect, useRef, useState } from "react";
import { toast } from 'react-toastify';
import LoadingIndicator from "../LoadingIndicator";


export default function OtpModal({ onVerifySuccess, onBack, phoneNumber = "", isOpen, title = "Enter OTP", subtitle = "Please enter the 4-digit code sent to your phone." }) {
  const [code, setCode] = useState(Array(4).fill(""));
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef([]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setCode(Array(4).fill(""));
    setTimer(60);
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

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

  const handleContinue = async () => {
    const fullCode = code.join("");
    if (fullCode.length !== 4) return;
    setLoading(true);
    setTimeout(() => {
      toast.success("OTP verified successfully!");
      setLoading(false);
      onVerifySuccess(fullCode);
    }, 1000);
  };

  const handleResend = async () => {
    setResendLoading(true);
    setTimeout(() => {
      toast.success("OTP resent!");
      setResendLoading(false);
      setTimer(60);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="p-6 sm:p-8 flex flex-col items-center text-center w-full">
      {/* Desktop-only header */}
      <div className="hidden sm:block w-full mb-6">
        <p className="text-sm font-semibold">We sent a code</p>
        <hr className="my-4" />
        <h2 className="text-2xl font-bold">Confirm your phone number</h2>
        <p className="text-gray-600 mt-2">Enter the 4-digit code sent to {phoneNumber}</p>
      </div>

      {/* Mobile-only subtitle */}
      <p className="text-gray-600 mb-4 sm:hidden">{subtitle}</p>

      <form onSubmit={e => { e.preventDefault(); handleContinue(); }} className="flex flex-col items-center w-full">
        <div className="flex gap-3 justify-center mb-6 sm:mb-8">
          {code.map((digit, i) => (
            <input
              key={i}
              ref={el => inputRefs.current[i] = el}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={e => handleChange(e, i)}
              onKeyDown={e => handleKeyDown(e, i)}
              className="w-14 h-16 sm:w-16 sm:h-20 text-3xl text-center border-2 border-gray-300 rounded-lg focus:outline-none focus:border-black focus:ring-0"
            />
          ))}
        </div>
        <button type="submit" className="w-full bg-[#DC4731] text-white py-3 rounded-lg font-bold mb-3 transition" disabled={loading}>
          {loading ? <LoadingIndicator /> : "Continue"}
        </button>
      </form>

      <div className="text-center mt-4">
        <p className="text-gray-600">
          Didn't get a text?{' '}
          <button onClick={handleResend} disabled={resendLoading || timer > 0} className="font-bold underline hover:text-black disabled:text-gray-400 disabled:no-underline">
            {resendLoading ? 'Sending...' : `Send again${timer > 0 ? '' : ''}`}
          </button>
          {timer > 0 && <span className="text-gray-500"> ({timer}s)</span>}
        </p>
        <div className="hidden sm:block mt-3">
            <button className="font-bold underline hover:text-black">
                Call me instead
            </button>
        </div>
      </div>
    </div>
  );
}
