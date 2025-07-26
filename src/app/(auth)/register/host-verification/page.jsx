'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { verifyHostUserIdentity, resetHostVerificationState } from '../../../../redux/slices/hostVerificationSlice';
import { CheckCircle2, X } from 'lucide-react';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Function to extract userId from persist:root string
const getUserIdFromPersistRoot = () => {
  try {
    const persistRootString = localStorage.getItem('persist:root');
    if (!persistRootString) return null;
    const persistRoot = JSON.parse(persistRootString);
    const initiate = JSON.parse(persistRoot.initiate);
    return initiate.user?.userId || null;
  } catch (error) {
    console.error('Error parsing persist:root:', error);
    return null;
  }
};

const IdentityVerification = ({ onBack, userId: propUserId }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.hostVerification);
  // Fallback to Redux state, localStorage, or persist:root for userId
  const reduxUserId = useSelector((state) => state.guestSignup?.user?.id || state.initiate?.user?.id);
  const localStorageUserId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null;
  const userId = propUserId || reduxUserId || localStorageUserId || getUserIdFromPersistRoot();

  const [nin, setNin] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [ninError, setNinError] = useState(null);

  const toastOptions = {
    position: 'top-right',
    autoClose: 4000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    className: 'bg-red-500 text-white rounded-lg shadow-lg p-4 font-semibold',
    bodyClassName: 'flex items-center',
  };

  useEffect(() => {
    dispatch(resetHostVerificationState()); // Reset state on mount

    // Show toast if userId is missing
    if (!userId) {
      toast.error('User ID is missing. Please complete the signup process first.', {
        ...toastOptions,
      });
    }

    return () => {
      dispatch(resetHostVerificationState()); // Reset state on unmount
    };
  }, [dispatch, userId]);

  useEffect(() => {
    if (success) {
      setIsSuccess(true);
      toast.success('Identity verified successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        className: 'bg-green-500 text-white rounded-lg shadow-lg p-4 font-semibold',
        bodyClassName: 'flex items-center',
      });
      // Clear userId from localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('userId');
      }
      setTimeout(() => {
        router.push('/host');
      }, 2000);
    }
  }, [success, router]);

  const validateNin = (nin) => {
    if (!nin) {
      return 'Please enter an NIN number';
    }
    if (nin.length !== 11 || !/^\d{11}$/.test(nin)) {
      return 'NIN must be exactly 11 digits';
    }
    return '';
  };

  const handleVerify = async () => {
    const validationError = validateNin(nin);
    setNinError(validationError);
    if (validationError) {
      toast.error(validationError, { ...toastOptions });
      return;
    }
    if (!userId) {
      toast.error('User ID is required to verify identity.', { ...toastOptions });
      return;
    }

    try {
      await dispatch(verifyHostUserIdentity({ userId, identificationNumber: nin })).unwrap();
    } catch (err) {
      console.error('Verification error details:', err);
      toast.error(err.message || 'An error occurred during identity verification.', {
        ...toastOptions,
      });
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
      <ToastContainer
        position='top-right'
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
      <div className='w-full max-w-md bg-white p-8 rounded-2xl shadow-md relative'>
        <button
          onClick={onBack}
          className='absolute left-4 top-4 text-gray-600 hover:text-black focus:outline-none focus:ring-2 focus:ring-[#DC4731] rounded cursor-pointer'
        >
          <X size={24} />
        </button>

        {isSuccess ? (
          <div className='text-center py-10'>
            <CheckCircle2 className='mx-auto h-16 w-16 text-green-500 mb-4' />
            <h2 className='text-xl font-bold mb-2'>Registration Successful!</h2>
            <p className='text-gray-600'>Redirecting you to your host dashboard...</p>
          </div>
        ) : (
          <>
            <p className='text-center text-xl font-bold mb-2'>Verify your Identity</p>
            <p className='text-center text-sm text-gray-600 mb-6'>
              Enter your NIN number (11 digits)
            </p>

            <input
              type='text'
              placeholder='NIN Number'
              value={nin}
              maxLength={11}
              onChange={(e) => {
                const digitsOnly = e.target.value.replace(/\D/g, '');
                setNin(digitsOnly);
              }}
              className={`w-full px-4 py-3 mb-4 rounded-xl border ${
                ninError ? 'border-red-500' : 'border-gray-300'
              } focus:outline-none focus:ring-2 focus:ring-[#DC4731]`}
            />

            {ninError && (
              <p className='text-red-500 text-sm mb-4 text-center'>{ninError}</p>
            )}
            {error && (
              <p className='text-red-500 text-sm mb-4 text-center'>{error}</p>
            )}

            <button
              onClick={handleVerify}
              disabled={loading || !!ninError || !userId}
              className={`w-full py-3 rounded-xl text-white font-semibold transition ${
                loading || ninError || !userId
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-[#DC4731] hover:bg-[#c03d29]'
              }`}
            >
              {loading ? 'Verifying...' : 'Verify'}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default IdentityVerification;