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

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const resetToken = searchParams.get('token');

  useEffect(() => {
    const validate = () => {
      if (password) {
        if (password.length < 8) return 'Password must be at least 8 characters long.';
        if (!/(?=.*[a-z])/.test(password)) return 'Password must contain a lowercase letter.';
        if (!/(?=.*[A-Z])/.test(password)) return 'Password must contain an uppercase letter.';
        if (!/(?=.*\d)/.test(password)) return 'Password must contain a number.';
      }
      if (confirmPassword && password !== confirmPassword) {
        return 'Passwords do not match.';
      }
      return '';
    };
    setPasswordError(validate());
  }, [password, confirmPassword]);

  useEffect(() => {
    if (error) {
      toast.error(error || 'Failed to reset password. Please try again.');
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordError || !password || !confirmPassword || !resetToken) {
      toast.error(passwordError || 'Please fill out all fields correctly.');
      return;
    }
    await dispatch(resetPassword({ resetToken, password })).unwrap();
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
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DC4731] pr-10"
                  placeholder="New Password"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3 text-gray-600">
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DC4731] pr-10"
                  placeholder="Confirm New Password"
                  required
                />
                <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-3 text-gray-600">
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
              
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
                disabled={isSubmitDisabled}
                className={`w-full py-3 rounded-lg text-white font-medium transition-colors ${
                  isSubmitDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#DC4731] hover:bg-[#c03d29]'
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