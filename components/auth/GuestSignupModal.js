"use client";

import { useEffect, useRef, useState } from "react";
import { X, Facebook, Mail, Apple } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import useGoogleScript from "../../hooks/useGoogleScript"; // ✅ Adjust path if needed

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
  const googleLoaded = useGoogleScript(); // ✅ Hook to check if Google API is loaded\
  const [appleLoaded, setAppleLoaded] = useState(false);


  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
  if (typeof window !== "undefined" && !document.getElementById("apple-signin")) {
    const script = document.createElement("script");
    script.src = "https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js";
    script.id = "apple-signin";
    script.onload = () => {
      setAppleLoaded(true);
    };
    script.onerror = () => {
      console.error("❌ Failed to load Apple Sign-In SDK");
    };
    document.body.appendChild(script);
  } else if (window.AppleID) {
    setAppleLoaded(true); // In case it's already loaded
  }
}, []);


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

  const handleGoogleSignIn = () => {
    if (!googleLoaded || typeof window.google === "undefined") {
      console.error("Google API not loaded yet");
      return;
    }

    const client = window.google.accounts.oauth2.initTokenClient({
client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      scope: "openid email profile",
      callback: (tokenResponse) => {
        console.log("✅ Google Token Response:", tokenResponse);

        fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        })
          .then((res) => res.json())
          .then((userInfo) => {
            console.log("✅ Google User Info:", userInfo);
            // ✅ Send userInfo to your backend here if needed
          })
          .catch((err) => console.error("❌ Failed to fetch user info", err));
      },
    });

    client.requestAccessToken();
  };

  const handleAppleSignIn = () => {
  if (!appleLoaded || typeof window.AppleID === "undefined") {
    console.error("Apple SDK not loaded");
    return;
  }

  window.AppleID.auth.init({
    clientId: "YOUR_APPLE_CLIENT_ID",
    scope: "name email",
    redirectURI: "https://yourdomain.com/callback", // Must match your Apple config
    usePopup: true,
  });

  window.AppleID.auth
    .signIn()
    .then((response) => {
      console.log("✅ Apple Sign-In Response:", response);
    })
    .catch((error) => {
      console.error("❌ Apple Sign-In Failed:", error);
    });
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

        <h2 className="text-xl font-semibold text-center">Login or signup</h2>

        <div className="mt-4 mb-2">
          <hr className="border-t border-gray-100" />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="my-2">
            <label className="text-sm mb-1 block">Country/Region</label>
            <select
              className="w-full border rounded-lg py-2 pl-3 pr-10 appearance-none"
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
                  clearError();
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
              className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
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
              <span className="animate-pulse">Loading...</span>
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
            // onClick={handleEmailLogin}
            className="border rounded-lg py-2 flex items-center justify-start gap-2 hover:bg-gray-100 pl-4"
          >
            <Mail size={20} className="text-gray-600" />
            <span className="text-center w-full">Continue with Email</span>
          </button>

          <button
            type="button"
            // onClick={handleFacebookLogin}
            className="border rounded-lg py-2 flex items-center justify-start gap-2 hover:bg-gray-100 pl-4"
          >
            <Facebook size={20} className="text-blue-600" />
            <span className="text-center w-full">Continue with Facebook</span>
          </button>

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="border rounded-lg py-2 flex items-center justify-start gap-2 hover:bg-gray-100 pl-4"
          >
            <FcGoogle size={20} />
            <span className="text-center w-full">Continue with Google</span>
          </button>

          <button
            type="button"
            onClick={handleAppleSignIn}
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
