'use client';
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { toast, ToastContainer, Slide } from 'react-toastify';
import { X, CheckCircle2 } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaApple } from 'react-icons/fa';
import { login, resetLoginState } from '@/redux/slices/loginSlice';
import { getUserProfile } from '@/redux/slices/profileSlice';
import OtpVerificationModal from './OtpVerificationModal';
import ForgotPasswordForm from '../auth/ForgotPasswordForm';
import ResetPasswordForm from '../auth/ResetPasswordForm';
import LoadingIndicator from '../LoadingIndicator';
import 'react-toastify/dist/ReactToastify.css';

export default function LoginModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [currentView, setCurrentView] = useState('login'); // 'login', 'forgot-password', 'reset-password'
  const [resetEmail, setResetEmail] = useState('');
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.login);
  const modalRef = useRef();

  useEffect(() => {
    if (isOpen) {
      dispatch(resetLoginState());
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, dispatch]);

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setCurrentView('login');
      setResetEmail('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (error) {
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
    if (user) {
      dispatch(getUserProfile());
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
      setTimeout(() => {
        onClose();
        setEmail("");
        setPassword("");
      }, 800);
    }
  }, [user, dispatch, onClose]);

  const handleOverlayClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    if (emailError) {
      toast.error(emailError);
      return;
    }

    if (!password.trim()) {
      toast.error('Password is required');
      return;
    }

    try {
      const result = await dispatch(login({ email, password })).unwrap();
      if (result.userType === 'host') {
        setShowOtpModal(true);
      }
    } catch (err) {
      // Error is handled by useEffect
    }
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
        onVerificationComplete={() => {
          toast.success('Host verified successfully!');
          setShowOtpModal(false);
          onClose();
        }}
        phoneNumber={user?.phoneNumber || 'your phone number'}
        userId={user?.id}
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
        className="bg-white w-full h-full sm:h-auto sm:max-h-[90vh] sm:rounded-xl sm:shadow-lg sm:max-w-md sm:m-4 flex flex-col overflow-y-auto scrollbar-hide"
      >
        <div className="flex items-center justify-between p-4 border-b sm:border-none">
          <h2 className="text-lg font-semibold text-center flex-grow">
            {currentView === 'forgot-password' ? 'Forgot Password' : 
             currentView === 'reset-password' ? 'Reset Password' : 'Log in'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-black p-2 -mr-2"
          >
            <X size={24} />
          </button>
        </div>

        {user && !loading ? (
          <div className="text-center py-10 px-6">
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-xl font-bold mb-2">Login Successful!</h2>
            <p className="text-gray-600">Redirecting you shortly...</p>
          </div>
        ) : currentView === 'forgot-password' ? (
          <ForgotPasswordForm
            onBack={() => setCurrentView('login')}
            onContinue={(email) => {
              setResetEmail(email);
              setCurrentView('reset-password');
            }}
          />
        ) : currentView === 'reset-password' ? (
          <ResetPasswordForm
            onBack={() => setCurrentView('forgot-password')}
            onComplete={() => {
              setCurrentView('login');
              toast.success('Password reset successfully! You can now log in with your new password.');
            }}
            resetToken="dummy-token" // In real implementation, this would come from URL params
          />
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
                disabled={loading}
                className={`w-full py-2 rounded-lg text-white flex justify-center ${
                  loading ? "bg-gray-300 cursor-not-allowed" : "bg-[#DC4731] hover:bg-[#c03d29]"
                }`}
              >
                {loading ? <LoadingIndicator /> : "Log in"}
              </button>
            </form>
            <div className="text-center mt-4">
              <button
                className="text-sm text-[#DC4731] hover:text-[#b33220] underline"
                onClick={() => setCurrentView('forgot-password')}
              >
                Forgot Password?
              </button>
            </div>
            <div className="flex items-center my-4">
              <hr className="flex-grow border-t border-gray-200" />
              <span className="mx-3 text-sm text-gray-400">OR</span>
              <hr className="flex-grow border-t border-gray-200" />
            </div>
            <div className="space-y-3 mb-4">
              <button
                className="w-full flex items-center border border-gray-300 rounded-lg p-3 hover:bg-gray-100 transition"
                onClick={() => toast.info('Google login not implemented')}
              >
                <FcGoogle className="text-2xl" />
                <span className="flex-1 text-center font-medium">Continue with Google</span>
              </button>
              <button
                className="w-full flex items-center border border-gray-300 rounded-lg p-3 hover:bg-gray-100 transition text-blue-600"
                onClick={() => toast.info('Facebook login not implemented')}
              >
                <FaFacebook className="text-2xl" />
                <span className="flex-1 text-center font-medium">Continue with Facebook</span>
              </button>
              <button
                className="w-full flex items-center border border-gray-300 rounded-lg p-3 hover:bg-gray-100 transition text-black"
                onClick={() => toast.info('Apple login not implemented')}
              >
                <FaApple className="text-2xl" />
                <span className="flex-1 text-center font-medium">Continue with Apple</span>
              </button>
            </div>
            <div className="text-center mt-4 text-sm">
              Don't have an account?{" "}
              <button
                className="underline text-[#DC4731] hover:text-[#b33220]"
                onClick={() => {
                  onClose();
                  if (typeof window !== 'undefined') {
                    window.dispatchEvent(new CustomEvent('openSignupModal'));
                  }
                }}
              >
                Sign up
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}