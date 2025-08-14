'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordStrengthError, setPasswordStrengthError] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();
  const resetToken = searchParams.get('token');

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
    setPasswordStrengthError(validate());
  }, [password]);

  useEffect(() => {
    if (confirmPassword && password !== confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  }, [password, confirmPassword]);

  const isSubmitDisabled = !!passwordStrengthError || !!passwordError || !password || !confirmPassword || loading;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitDisabled) {
      const errorToShow = passwordStrengthError || passwordError;
      if (errorToShow) {
        toast.error(errorToShow);
      }
      return;
    }

    setLoading(true);

    try {
      // Here you would typically make an API call with the password and resetToken
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Password reset successfully!');
      router.push('/login');
    } catch (err) {
      toast.error(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-50">
      <div
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
        // style={{ opacity: 0.05 }}
      >
        <div className="flex items-center">
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

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md p-8 space-y-6 bg-white/80 rounded-2xl shadow-xl backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-center">Reset Password</h2>
          <p className="text-center text-gray-600">Enter your new password below.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DC4731] pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-600 hover:text-gray-800"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#DC4731] pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-gray-600 hover:text-gray-800"
              >
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {(passwordError || passwordStrengthError) && (
              <p className="text-red-500 text-sm mt-1">
                {passwordError || passwordStrengthError}
              </p>
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

            <div className="space-y-2 pt-2">
              <button
                type="submit"
                disabled={isSubmitDisabled}
                className={`w-full py-3 rounded-lg text-white font-semibold flex justify-center transition-colors ${isSubmitDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#DC4731] hover:bg-[#c03d29]'}`}
              >
                {loading ? <LoadingIndicator /> : 'Reset Password'}
              </button>
            </div>

            <div className="text-center pt-2">
              <Link href="/" className="text-sm text-gray-600 hover:text-black">
                Changed your mind? <span className="font-semibold text-[#DC4731]">Back to Home</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
