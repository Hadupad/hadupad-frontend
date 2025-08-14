'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { ArrowLeft } from 'lucide-react';
import { forgotPassword } from '@/redux/slices/forgotPasswordSlice';
import LoadingIndicator from '../LoadingIndicator';

export default function ForgotPasswordForm({ onBack, onContinue }) {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { loading = false, error = null } = useSelector((state) => {
    const forgotPasswordState = state.forgotPassword || {};
    console.log('ForgotPassword State:', forgotPasswordState); // Debug state
    return forgotPasswordState;
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) return 'Email is required';
    if (!emailRegex.test(email)) return 'Please enter a valid email address';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();
    const emailError = validateEmail(normalizedEmail);
    if (emailError) {
      toast.error(emailError, {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        className: 'rounded-xl animate__animated animate__slideInDown animate__faster',
        style: { animationDuration: '0.5s' },
      });
      return;
    }

    try {
      console.log('Dispatching forgotPassword with:', { email: normalizedEmail }); // Debug dispatch
      await dispatch(forgotPassword({ email: normalizedEmail })).unwrap();
      
      toast.success('Password reset link sent to your email!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        className: 'rounded-xl animate__animated animate__slideInRight',
        style: { animationDuration: '0.3s' },
      });

      onContinue(normalizedEmail);
    } catch (err) {
      console.log('API Error:', err); // Debug API error
      toast.error(err.message || 'Failed to send reset link. Please try again.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        className: 'rounded-xl animate__animated animate__slideInDown animate__faster',
        style: { animationDuration: '0.5s' },
      });
    }
  };

  return (
    <div className="p-6 flex-grow overflow-y-auto">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="text-gray-600 hover:text-black p-2 -ml-2"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-lg font-semibold ml-2">Forgot Password</h2>
      </div>

      <div className="mb-6">
        <p className="text-gray-600 text-sm">
          Enter your email address and we'll send you a link to reset your password.
        </p>
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
        
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-medium flex justify-center ${
            loading ? "bg-gray-300 cursor-not-allowed" : "bg-[#DC4731] hover:bg-[#c03d29]"
          }`}
        >
          {loading ? <LoadingIndicator /> : "Send Reset Link"}
        </button>
      </form>

      <div className="text-center mt-6 text-sm">
        Remember your password?{" "}
        <button
          className="underline text-[#DC4731] hover:text-[#b33220]"
          onClick={onBack}
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}