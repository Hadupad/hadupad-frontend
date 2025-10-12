'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { CheckCircle2, Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import { resetPassword, resetResetPasswordState } from '@/redux/slices/resetPasswordSlice';

const ResetPassword = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const { loading = false, error = null, resetStatus = null } = useSelector((state) => {
    const resetPasswordState = state.resetPassword || {};
    return resetPasswordState;
  });

  const [newPassword, setNewPassword] = useState(''); // Changed from password to newPassword
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // Extract token from URL query
  const token = searchParams.get('token'); // Changed from resetToken to token

  useEffect(() => {
    const validate = () => {
      if (newPassword) {
        if (newPassword.length < 8) return 'Password must be at least 8 characters long';
        if (!/(?=.*[a-z])/.test(newPassword)) return 'Password must contain a lowercase letter';
        if (!/(?=.*[A-Z])/.test(newPassword)) return 'Password must contain an uppercase letter';
        if (!/(?=.*\d)/.test(newPassword)) return 'Password must contain a number';
      }
      return '';
    };
    setPasswordError(validate());
  }, [newPassword]);

  useEffect(() => {
    if (error) {
      const errorMessage =
        error.includes('token required')
          ? 'Reset token is missing or invalid. Please check your reset link.'
          : error.includes('Token expired')
          ? 'This password reset link has expired. Please request a new one.'
          : error || 'Failed to reset password. Please try again.';
      toast.error(errorMessage, {
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
      toast.success('Password reset successfully!');
      setTimeout(() => {
        router.push('/');
        dispatch(resetResetPasswordState());
      }, 2000);
    }
  }, [error, resetStatus, router, dispatch]);

  // Check for missing token on mount
  useEffect(() => {
    if (!token) {
      toast.error('No reset token provided. Please check your reset link.', {
        position: 'top-right',
        autoClose: 3000,
        theme: 'colored',
      });
      setTimeout(() => router.push('/forgot-password'), 3000);
    }
  }, [token, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordError || !newPassword || !token) {
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

    console.log('Submitting reset with:', { token, newPassword }); // Debug payload
    await dispatch(resetPassword({ token, newPassword })).unwrap();
  };

  const isSubmitDisabled = loading || !!passwordError || !password || !confirmPassword;

  return (
    <div className="relative min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="flex items-center">
          <Image src="/images/logo/icon.png" alt="Hadupad Logo" width={120} height={120} />
          <span className="ml-8 font-bold text-9xl text-gray-300 select-none">Hadupad</span>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md p-8 space-y-6 bg-white/80 rounded-2xl shadow-xl backdrop-blur-sm">
        {resetStatus ? (
          <div className="text-center py-10">
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-xl font-bold mb-2">Reset Password Successful!</h2>
            <p className="text-gray-600">Redirecting to home...</p>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-semibold text-center mb-2">Reset Your Password</h2>
            <p className="text-sm text-center mb-6 text-gray-600">Enter your new password</p>
            <hr className="border-t border-gray-100 -mx-4 mt-4 mb-5" />

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  id="newPassword" // Changed from password to newPassword
                  name="newPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 pt-5 pb-2 text-sm pr-12 focus:outline-none focus:ring-2 focus:ring-[#DC4731]"
                  placeholder=" "
                  required
                />
                <label
                  htmlFor="newPassword"
                  className="absolute left-4 top-2 text-xs text-gray-600 pointer-events-none transition-all duration-200"
                >
                  New Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-sm text-[#DC4731]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
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
                disabled={loading || passwordError || !newPassword}
                className={`w-full py-3 rounded-lg text-white font-medium ${
                  loading || passwordError || !newPassword
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-[#DC4731] hover:bg-[#c03d29]'
                }`}
              >
                {loading ? 'Processing...' : 'Reset Password'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;