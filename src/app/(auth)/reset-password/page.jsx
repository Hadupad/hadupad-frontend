'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import { resetPassword, resetResetPasswordState } from '@/redux/slices/resetPasswordSlice';

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const { loading = false, error = null, resetStatus = null } = useSelector((state) => {
    const resetPasswordState = state.resetPassword || {};
    console.log('ResetPassword State:', resetPasswordState); // Debug state
    return resetPasswordState;
  });

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Extract resetToken from URL query
  const resetToken = searchParams.get('token');

  // Validate password
  useEffect(() => {
    const validate = () => {
      if (password) {
        if (password.length < 8) return 'Password must be at least 8 characters long';
        if (!/(?=.*[a-z])/.test(password)) return 'Password must contain a lowercase letter';
        if (!/(?=.*[A-Z])/.test(password)) return 'Password must contain an uppercase letter';
        if (!/(?=.*\d)/.test(password)) return 'Password must contain a number';
      }
      return '';
    };
    setPasswordError(validate());
  }, [password]);

  // Handle API errors and success
  useEffect(() => {
    if (error) {
      toast.error(error || 'Failed to reset password. Please try again.', {
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
      dispatch(resetResetPasswordState());
    }
    if (resetStatus) {
      toast.success('Password reset successfully!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        className: 'rounded-xl animate__animated animate__slideInRight',
        style: { animationDuration: '0.3s' },
      });
      setTimeout(() => {
        router.push('/');
        dispatch(resetResetPasswordState());
      }, 2000);
    }
  }, [error, resetStatus, router, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordError || !password || !resetToken) {
      toast.error(passwordError || 'Please enter a valid password and ensure the reset token is provided', {
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

    console.log('Submitting reset with:', { resetToken, password }); // Debug payload
    await dispatch(resetPassword({ resetToken, password })).unwrap();
  };

  return (
    <div className="relative min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Watermark Layer */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="flex items-center opacity-5">
          <Image
            src="/images/logo/icon.png"
            alt="Hadupad Logo"
            width={120}
            height={120}
          />
          <span className="ml-8 font-bold text-9xl text-gray-300 select-none">
            Hadupad
          </span>
        </div>
      </div>

      {/* Form Layer with Blur */}
      <div className="relative z-10 w-full max-w-md p-8 space-y-6 bg-white/80 rounded-2xl shadow-xl backdrop-blur-sm">
        {resetStatus ? (
          <div className="text-center py-10">
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-xl font-bold mb-2">Reset Password Successful!</h2>
            <p className="text-gray-600">Redirecting to home...</p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-center mb-2">
              Reset Your Password
            </h2>
            <p className="text-sm text-center mb-6 text-gray-600">
              Enter your new password
            </p>
            <hr className="border-t border-gray-100 -mx-4 mt-4 mb-5" />

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 pt-5 pb-2 text-sm pr-12 focus:outline-none focus:ring-2 focus:ring-[#DC4731]"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="password"
                  className="absolute left-4 top-2 text-xs text-gray-600 pointer-events-none transition-all duration-200"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-sm text-[#DC4731]"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
              {passwordError && (
                <p className="text-red-500 text-sm mt-1">{passwordError}</p>
              )}
              <div className="text-xs text-gray-500 space-y-1">
                <p>Password must contain:</p>
                <ul className="list-disc list-inside pl-2">
                  <li>At least 8 characters</li>
                  <li>One uppercase letter</li>
                  <li>One lowercase letter</li>
                  <li>One number</li>
                </ul>
              </div>
              <button
                type="submit"
                disabled={loading || passwordError || !password}
                className={`w-full py-3 rounded-lg text-white font-medium ${
                  loading || passwordError || !password
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-[#DC4731] hover:bg-[#c03d29]'
                }`}
              >
                {loading ? 'Processing...' : 'Continue'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;