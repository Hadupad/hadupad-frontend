'use client';

import { useState, useRef, useEffect } from "react";
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
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.login);
  const modalRef = useRef();

  // Reset login state when modal opens
  useEffect(() => {
    if (isOpen) {
      dispatch(resetLoginState());
      setEmail("");
      setPassword("");
      setIsLoggingIn(false);
    }
  }, [isOpen, dispatch]);

  // Handle error notifications
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

  // Handle success notification and refetch user profile
  useEffect(() => {
    if (user && isLoggingIn) {
      dispatch(getUserProfile()); // Refetch user profile
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
      }, 800); // Match LoadingIndicator animation duration
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
    const credentials = { email, password };
    try {
      await dispatch(login(credentials)).unwrap();
    } catch (err) {
      setIsLoggingIn(false);
    }
  };

  if (!isOpen) return null;

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
        className="bg-white w-[90%] max-w-md rounded-xl shadow-xl p-6 relative"
      >
        <button
          onClick={onClose}
          className="absolute right-4 text-gray-600 hover:text-black"
        >
          <X size={24} />
        </button>

        {user && !isLoggingIn ? (
          <div className="text-center py-10">
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-xl font-bold mb-2">Login Successful!</h2>
            <p className="text-gray-600">Redirecting you shortly...</p>
          </div>
        ) : (
          <>
            <h2 className="text-lg font-semibold text-center mb-1">Log in</h2>

            <div className="-mx-4 mt-4 mb-6">
              <hr className="border-t border-gray-100" />
            </div>

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
              <button className="w-full flex items-center justify-center border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition">
                <FcGoogle className="mr-2 text-xl" />
                Continue with Google
              </button>
              <button className="w-full flex items-center justify-center border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition text-blue-600">
                <FaFacebook className="mr-2 text-xl" />
                Continue with Facebook
              </button>
              <button className="w-full flex items-center justify-center border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition text-black">
                <FaApple className="mr-2 text-xl" />
                Continue with Apple
              </button>
            </div>

            <div className="text-center mt-4 text-sm">
              Don't have an account?{" "}
              <button className="underline text-[#DC4731] hover:text-[#b33220]">
                Sign up
              </button>
            </div>
          </>
        )}
        {isLoggingIn && <LoadingIndicator />}
      </div>
    </div>
  );
}