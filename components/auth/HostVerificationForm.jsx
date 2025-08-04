'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import LoadingIndicator from '../LoadingIndicator';

export default function HostVerificationForm({ onVerificationSuccess, onBack, userId }) {
  const [nin, setNin] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const validateNin = (nin) => {
    if (!nin) return 'Please enter an NIN number';
    if (!/^\d{11}$/.test(nin)) return 'NIN must be 11 digits';
    return '';
  };

  const handleNinChange = (e) => {
    const newNin = e.target.value;
    setNin(newNin);
    setError(validateNin(newNin));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateNin(nin);
    if (validationError) {
      setError(validationError);
      return;
    }
    if (!userId) {
      toast.error('User ID is missing.');
      return;
    }
    setLoading(true);
    // Simulate verification process
    setTimeout(() => {
      toast.success('Identity verified successfully!');
      setLoading(false);
      onVerificationSuccess();
    }, 1500);
  };

  return (
    <div className="p-6 sm:p-8">
      <p className="text-center text-gray-600 mb-6 sm:hidden">We need to confirm your identity before you can start hosting.</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nin" className="block text-sm font-medium text-gray-700 mb-1">NIN (National Identification Number)</label>
          <input
            type="text"
            id="nin"
            value={nin}
            onChange={handleNinChange}
            className={`w-full p-3 border rounded-lg ${error ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Enter your 11-digit NIN"
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>
        <button
          type="submit"
          disabled={loading || !!error || !nin}
          className={`w-full py-3 rounded-lg text-white font-semibold transition ${loading || !!error || !nin ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'}`}
        >
          {loading ? <LoadingIndicator /> : 'Verify identity'}
        </button>
      </form>
    </div>
  );
}
