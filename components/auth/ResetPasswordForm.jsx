'use client';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import LoadingIndicator from '../LoadingIndicator';

export default function ResetPasswordForm({ onBack, onComplete, resetToken }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [passwordStrengthError, setPasswordStrengthError] = useState('');

  // Validate password strength as user types
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

  // Validate that passwords match
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
        toast.error(errorToShow, {
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
      return;
    }

    setLoading(true);

    try {
      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Password reset successfully!', {
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

      onComplete();
    } catch (err) {
      toast.error(err.message || 'Failed to reset password. Please try again.', {
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
    } finally {
      setLoading(false);
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
        <h2 className="text-lg font-semibold ml-2">Reset Password</h2>
      </div>

      <div className="mb-6">
        <p className="text-gray-600 text-sm">
          Enter your new password below. Make sure it's strong and secure.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
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
            type={showConfirmPassword ? "text" : "password"}
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
          <button
            type="button"
            onClick={onBack}
            className="text-sm text-gray-600 hover:text-black"
          >
            Remember your password? <span className="font-semibold text-[#DC4731]">Back to Login</span>
          </button>
        </div>
      </form>
    </div>
  );
}
