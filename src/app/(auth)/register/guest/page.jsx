'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { initiateRegistration, resetInitiateState } from '../../../../redux/slices/initiateUserSlice';
import { Facebook, Mail, Apple, ChevronLeft } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SignupCard({ onSuccess }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.initiate);
  const [countryCode, setCountryCode] = useState('+234');
  const [phone, setPhone] = useState('');
  const [phoneError, setPhoneError] = useState(''); // New state for live error

  useEffect(() => {
    dispatch(resetInitiateState()); // Reset state on mount
  }, [dispatch]);

  const validatePhoneNumber = (phone, countryCode) => {
    const cleanedPhone = phone.replace(/\D/g, '');
    const phoneRegex = /^[0-9]{7,15}$/;
    if (!phone.trim()) {
      return 'Phone number is required';
    }
    if (!phoneRegex.test(cleanedPhone)) {
      return 'Please enter a valid phone number (7-15 digits)';
    }
    if (countryCode === '+234' && cleanedPhone.length !== 10) {
      return 'Nigerian phone numbers must be 10 digits long';
    }
    if (countryCode === '+1' && cleanedPhone.length !== 10) {
      return 'US phone numbers must be 10 digits long';
    }
    if (countryCode === '+44' && cleanedPhone.length !== 10) {
      return 'UK phone numbers must be 10 digits long';
    }
    return '';
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    const error = validatePhoneNumber(value, countryCode);
    setPhoneError(error); // Set error message live
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validatePhoneNumber(phone, countryCode);
    if (validationError) {
      toast.error(validationError, {
        position: 'top-right',
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        className: 'bg-red-500 text-white rounded-lg shadow-lg p-4 font-semibold',
        bodyClassName: 'flex items-center',
      });
      return;
    }

    const fullPhone = `${countryCode}${phone.replace(/\D/g, '')}`;
    const userType = 'user';
    console.log('Dispatching initiateRegistration:', { fullPhone, userType });

    try {
      const result = await dispatch(
        initiateRegistration({ phoneNumber: fullPhone, userType })
      ).unwrap();
      toast.success('Registration initiated! Redirecting to OTP verification...', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        className: 'bg-green-500 text-white rounded-lg shadow-lg p-4 font-semibold',
        bodyClassName: 'flex items-center',
      });
      onSuccess?.(fullPhone);
      router.push(`/register/guest-otp?phone=${encodeURIComponent(fullPhone)}`);
    } catch (err) {
      console.error('Registration error:', err);
      if (err === 'Failed to initiate registration: User with this phone number already exists') {
        setPhone('');
        setPhoneError(''); // Clear error on duplicate
        toast.error(
          <div>
            This phone number is already registered. Please{' '}
            <a href="/login" className="text-[#DC4731] underline hover:text-[#c03d29]">
              try logging in
            </a>{' '}
            or use a different number.
          </div>,
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
      } else {
        toast.error(err || 'An error occurred during registration.', {
          position: 'top-right',
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          className: 'bg-red-500 text-white rounded-lg shadow-lg p-4 font-semibold',
          bodyClassName: 'flex items-center',
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
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
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
        <div className="flex items-center mb-4 mt-2">
          <button
            onClick={() => router.push('/')}
            aria-label="Go back"
            className="text-gray-600 hover:text-black focus:outline-none focus:ring-2 focus:ring-[#DC4731] rounded cursor-pointer"
          >
            <ChevronLeft size={24} />
          </button>
          <h2 className="text-xl font-semibold text-center flex-grow">
            Signup
          </h2>
        </div>

        <hr className="border-t border-gray-100 -mx-4 mt-4 mb-10" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-sm mb-1 block">Country/Region</label>
            <select
              className="w-full border rounded-lg py-2 pl-3 pr-10 appearance-none"
              onChange={(e) => {
                setCountryCode(e.target.value);
                setPhone('');
                setPhoneError(''); // Clear error when country code changes
              }}
              value={countryCode}
            >
              <option value="+234">Nigeria (+234)</option>
              <option value="+1">United States (+1)</option>
              <option value="+44">United Kingdom (+44)</option>
            </select>
          </div>

          <div>
            <label className="text-sm mb-1 block">Phone number</label>
            <input
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              onChange={handlePhoneChange}
              className={`w-full border rounded-lg p-2 ${phoneError ? 'border-red-500' : ''}`}
              required
            />
            {phoneError && (
              <p className="text-red-500 text-xs mt-1">{phoneError}</p>
            )}
          </div>

          <p className="text-xs text-gray-500">
            We'll call or text you to confirm your number.
            <a href="#" className="text-[#DC4731] ml-1 underline">
              Privacy Policy
            </a>
          </p>

          <button
            type="submit"
            className="bg-[#DC4731] text-white py-2 rounded-lg hover:bg-[#c03d29] transition flex justify-center"
            disabled={loading || !!phoneError} // Disable button if there's an error
          >
            {loading ? (
              <span className="animate-pulse">Loading...</span>
            ) : (
              'Continue'
            )}
          </button>

          <div className="flex items-center my-2">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-sm text-gray-400">or</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <button
            type="button"
            className="border rounded-lg py-2 flex items-center justify-start gap-2 hover:bg-gray-100 pl-4"
          >
            <Mail size={20} className="text-gray-600" />
            <span className="text-center w-full">Continue with Email</span>
          </button>

          <button
            type="button"
            className="border rounded-lg py-2 flex items-center justify-start gap-2 hover:bg-gray-100 pl-4"
          >
            <Facebook size={20} className="text-blue-600" />
            <span className="text-center w-full">Continue with Facebook</span>
          </button>

          <button
            type="button"
            className="border rounded-lg py-2 flex items-center justify-start gap-2 hover:bg-gray-100 pl-4"
          >
            <FcGoogle size={20} />
            <span className="text-center w-full">Continue with Google</span>
          </button>

          <button
            type="button"
            className="border rounded-lg py-2 flex items-center justify-start gap-2 hover:bg-gray-100 pl-4"
          >
            <Apple size={20} />
            <span className="text-center w-full">Continue with Apple</span>
          </button>
        </form>
      </div>
    </div>
  );
}

const GuestSignupPage = () => {
  const router = useRouter();

  const handleSuccess = (phone) => {
    console.log(`Registration initiated for phone: ${phone}. Redirecting...`);
    // The SignupCard component already handles the redirection,
    // so this function can be used for any additional logic if needed.
  };

  return <SignupCard onSuccess={handleSuccess} />;
};

export default GuestSignupPage;