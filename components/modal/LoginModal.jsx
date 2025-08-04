'use client';

import { useState, useRef, useEffect } from "react";
import OtpVerificationModal from './OtpVerificationModal';
import { useDispatch, useSelector } from 'react-redux';
import { X, CheckCircle2 } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaApple } from "react-icons/fa";
import { login, resetLoginState } from "@/redux/slices/loginSlice";
import { getUserProfile } from '@/redux/slices/profileSlice';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingIndicator from './../LoadingIndicator';

export default function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.login);
  const modalRef = useRef();

  useEffect(() => {
    if (isOpen) {
      dispatch(resetLoginState());
      setEmail("");
      setPassword("");
      setIsLoggingIn(false);
    }
  }, [isOpen, dispatch]);

  useEffect(() => {
    if (error) {
      setIsLoggingIn(false);
      toast.error(
        error === 'Failed to login: Invalid email or password' ? (
          <div>
            Invalid email or password. Please{' '}
            <a href="/signup" className="text-[#DC4731] underline hover:text-[#c03d29]">
              sign up
            </a>{' '}
            if you don't have an account.
          </div>
        ) : (
          error || 'An error occurred during login.'
        ),
        {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          className: 'bg-red-500 text-white rounded-lg shadow-lg p-4 font-semibold',
          bodyClassName: 'flex items-center',
        }
      );
    }
  }, [error]);

  useEffect(() => {
    if (user && isLoggingIn) {
      dispatch(getUserProfile());
      setTimeout(() => {
        setIsLoggingIn(false);
        toast.success('Login successful! Redirecting...', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          className: 'bg-green-500 text-white rounded-lg shadow-lg p-4 font-semibold',
          bodyClassName: 'flex items-center',
        });
        onClose();
        setEmail("");
        setPassword("");
      }, 800);
    }
  }, [user, isLoggingIn, dispatch, onClose]);

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      return 'Email is required';
    }
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    if (emailError) {
      toast.error(emailError, {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        className: 'bg-red-500 text-white rounded-lg shadow-lg p-4 font-semibold',
        bodyClassName: 'flex items-center',
      });
      return;
    }

    if (!password.trim()) {
      toast.error('Password is required', {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        className: 'bg-red-500 text-white rounded-lg shadow-lg p-4 font-semibold',
        bodyClassName: 'flex items-center',
      });
      return;
    }

    setIsLoggingIn(true);

    setTimeout(() => {
      setIsLoggingIn(false);


      const simulatedUser = {
        id: '123',
        email: email,
        userType: 'guest',
        phoneNumber: '+1234567890',
      };

      if (simulatedUser.userType === 'host') {

        setShowOtpModal(true);
      } else {

        toast.success('Login successful! Redirecting...');
        onClose();
      }
    }, 1000);
  };

  if (!isOpen) return null;

  if (showOtpModal) {
    return (
      <OtpVerificationModal
        isOpen={true}
        onClose={() => {
          setShowOtpModal(false);
          onClose();
        }}
        onBack={() => setShowOtpModal(false)}
        onVerificationComplete={(code) => {
          toast.success('Host verified successfully!');
          setShowOtpModal(false);
          onClose();
        }}
        phoneNumber="your phone number"
      />
    );
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      onClick={handleOverlayClick}
    >
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
      <div
        ref={modalRef}
        className="bg-white w-full h-full sm:h-auto sm:rounded-xl sm:shadow-lg sm:max-w-md sm:m-4 flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b sm:border-none">
            <h2 className="text-lg font-semibold text-center flex-grow">Log in</h2>
            <button
                onClick={onClose}
                className="text-gray-600 hover:text-black p-2 -mr-2"
            >
                <X size={24} />
            </button>
        </div>

        {user && !isLoggingIn ? (
          <div className="text-center py-10 px-6">
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-xl font-bold mb-2">Login Successful!</h2>
            <p className="text-gray-600">Redirecting you shortly...</p>
          </div>
        ) : (
          <div className="p-6 flex-grow overflow-y-auto">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DC4731]"
                required
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DC4731] pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-sm text-gray-600"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading || isLoggingIn}
                className={`w-full py-2 rounded-lg text-white flex justify-center ${
                  loading || isLoggingIn
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-[#DC4731] hover:bg-[#c03d29]"
                }`}
              >
                {loading || isLoggingIn ? "Logging in..." : "Log in"}
              </button>
            </form>

            <div className="flex items-center my-4">
              <hr className="flex-grow border-t border-gray-200" />
              <span className="mx-3 text-sm text-gray-400">OR</span>
              <hr className="flex-grow border-t border-gray-200" />
            </div>

            <div className="space-y-3 mb-4">
              {/* Google Button */}
              <button className="w-full flex items-center border border-gray-300 rounded-lg p-3 hover:bg-gray-100 transition">
                <FcGoogle className="text-2xl" />
                <span className="flex-1 text-center font-medium">Continue with Google</span>
              </button>
              {/* Facebook Button */}
              <button className="w-full flex items-center border border-gray-300 rounded-lg p-3 hover:bg-gray-100 transition text-blue-600">
                <FaFacebook className="text-2xl" />
                <span className="flex-1 text-center font-medium">Continue with Facebook</span>
              </button>
              {/* Apple Button */}
              <button className="w-full flex items-center border border-gray-300 rounded-lg p-3 hover:bg-gray-100 transition text-black">
                <FaApple className="text-2xl" />
                <span className="flex-1 text-center font-medium">Continue with Apple</span>
              </button>
            </div>

            <div className="text-center mt-4 text-sm">
              Don't have an account?{" "}
              <button className="underline text-[#DC4731] hover:text-[#b33220]">
                Sign up
              </button>
            </div>
          </div>
        )}
        {isLoggingIn && <LoadingIndicator />}
      </div>
    </div>
  );
}