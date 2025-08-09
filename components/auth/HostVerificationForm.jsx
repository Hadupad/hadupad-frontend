'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import LoadingIndicator from '../LoadingIndicator';
import { verifyHostUserIdentity, resetHostVerificationState } from '@/redux/slices/hostVerificationSlice';

export default function HostVerificationForm({ onVerificationSuccess, onBack, userId }) {
  const [nin, setNin] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const { loading, error: reduxError, success } = useSelector((state) => state.hostVerification);

  const validateNin = (nin) => {
    if (!nin) return 'Please enter an NIN number';
    if (!/^\d{11}$/.test(nin)) return 'NIN must be exactly 11 digits';
    return '';
  };

  const handleNinChange = (e) => {
    const newNin = e.target.value.replace(/\D/g, ''); // Allow only digits
    if (newNin.length <= 11) { // Prevent exceeding 11 digits
      setNin(newNin);
      setError(validateNin(newNin));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateNin(nin);
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }
    if (!userId) {
      toast.error('User ID is missing.');
      onBack();
      return;
    }

    try {
      await dispatch(verifyHostUserIdentity({ userId, identificationNumber: nin })).unwrap();
      toast.success('Identity verified successfully!');
      dispatch(resetHostVerificationState());
      onVerificationSuccess();
    } catch (err) {
      toast.error(err || 'Failed to verify identity.');
    }
  };

  return (
    <div className="p-6 sm:p-8">
      <p className="text-center text-gray-600 mb-6 sm:hidden">
        We need to confirm your identity before you can start hosting.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nin" className="block text-sm font-medium text-gray-700 mb-1">
            NIN (National Identification Number)
          </label>
          <input
            type="number"
            id="nin"
            value={nin}
            onChange={handleNinChange}
            maxLength="11"
            pattern="[0-9]*"
            className={`w-full p-3 border rounded-lg ${error || reduxError ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter your 11-digit NIN"
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          {reduxError && <p className="text-red-500 text-xs mt-1">{reduxError}</p>}
        </div>
        <button
          type="submit"
          disabled={loading || nin.length !== 11}
          className={`w-full py-3 rounded-lg text-white font-semibold transition ${
            loading || nin.length !== 11 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#DC4731] hover:bg-[#b93a29]'
          }`}
        >
          {loading ? <LoadingIndicator /> : 'Verify identity'}
        </button>
      </form>
    </div>
  );
}