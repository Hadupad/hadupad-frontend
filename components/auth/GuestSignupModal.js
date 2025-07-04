"use client";

import { useEffect, useRef, useState } from "react";
import { X, Facebook, Mail, Apple } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

export default function GuestSignupModal({
  isOpen,
  onClose,
  onPhoneSubmit,
  error,
  clearError,
}) {
  const modalRef = useRef();
  const [countryCode, setCountryCode] = useState("+234");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleOverlayClick = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!phone.trim() || typeof onPhoneSubmit !== "function") return;

    setIsLoading(true);
    try {
      const formattedNumber = `${countryCode}${phone}`;
      await onPhoneSubmit(formattedNumber);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="bg-white w-[90%] max-w-md rounded-xl shadow-xl p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-gray-600 hover:text-black"
        >
          <X size={18} />
        </button>

        <h2 className="text-xl font-semibold text-center">
          Login or signup
        </h2>

          <div className="mt-4 mb-2">
          <hr className="border-t border-gray-100" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="my-2">
            <label className="text-sm mb-1 block">Country/Region</label>
            <select
              className="w-full border rounded-lg py-2 pl-3 pr-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_0.75rem] appearance-none"
              onChange={(e) => setCountryCode(e.target.value)}
              value={countryCode}
            >
              <option value="+234">Nigeria (+234)</option>
              <option value="+1">United States (+1)</option>
              <option value="+44">United Kingdom (+44)</option>
            </select>
          </div>
          <div>
            <label className="text-sm mb-1 block">Phone number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (error && typeof clearError === "function") {
      clearError(); // ✅ Clear the error when typing new input
    }
              }}
              className="w-full border rounded-lg p-2"
              required
            />
          </div>

          <p className="text-xs text-gray-500">
            We&apos;ll call or text you to confirm your number. Standard message
            and data rates apply.
            <a href="#" className="text-[#DC4731] ml-1 underline">
              Privacy Policy
            </a>
          </p>

          {error && (
            <div
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            className="bg-[#DC4731] text-white py-2 rounded-lg hover:bg-[#c03d29] transition flex justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-[#DC4731]"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              "Continue"
            )}
          </button>

          <div className="flex items-center my-2">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-sm text-gray-400">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <button
            type="button"
            className="border rounded-lg py-2 flex items-center justify-start gap-2 hover:bg-gray-100 pl-4"
          >
            <Mail size={20} className="text-gray-600" />
            <span className="text-center w-full">Continue with Email</span>
          </button>

          <button
            type="button"
            className="border rounded-lg py-2 flex items-center justify-start gap-2 hover:bg-gray-100 pl-4"
          >
            <Facebook size={20} className="text-blue-600" />
            <span className="text-center w-full">Continue with Facebook</span>
          </button>

          <button
            type="button"
            className="border rounded-lg py-2 flex items-center justify-start gap-2 hover:bg-gray-100 pl-4"
          >
            <FcGoogle size={20} />
            <span className="text-center w-full">Continue with Google</span>
          </button>

          <button
            type="button"
            className="border rounded-lg py-2 flex items-center justify-start gap-2 hover:bg-gray-100 pl-4 mb-4"
          >
            <Apple size={20} />
            <span className="text-center w-full">Continue with Apple</span>
          </button>
        </form>
      </div>
    </div>
  );
}
