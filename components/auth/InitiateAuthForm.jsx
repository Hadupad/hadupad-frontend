'use client';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import LoadingIndicator from '../LoadingIndicator';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook, FaApple } from 'react-icons/fa';
import { Mail } from 'lucide-react';
import { initiateRegistration } from '@/redux/slices/initiateUserSlice';

export default function InitiateAuthForm({ onContinue, userType }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.initiate);

  const validatePhoneNumber = (phone) => {
    if (!phone) return 'Please enter a phone number';
    if (!/^\d{10,11}$/.test(phone)) return 'Phone number must be 10 or 11 digits';
    return '';
  };

  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value.replace(/\D/g, ''); // Allow only digits
    if (newPhoneNumber.length <= 11) { // Prevent exceeding 11 digits
      setPhoneNumber(newPhoneNumber);
    }
  };

  const handleContinue = async () => {
    const validationError = validatePhoneNumber(phoneNumber);
    if (validationError) {
      toast.error(validationError, {
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
      const result = await dispatch(
        initiateRegistration({ phoneNumber, userType })
      ).unwrap();
      console.log('InitiateAuthForm result:', result); // Debug log
      if (!result.userId) {
        console.error('InitiateAuthForm: No userId in response', result);
        throw new Error('User ID not received from server.');
      }
      const toastId = toast.success('OTP sent successfully!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
        className: 'rounded-xl animate__animated animate__slideInRight',
        style: { animationDuration: '0.3s' },
        onOpen: () => {
          setTimeout(() => {
            toast.update(toastId, {
              className: 'rounded-xl animate__animated animate__slideInDown',
              style: { animationDuration: '0.5s' },
            });
          }, 300);
        },
      });
      onContinue(phoneNumber, result.userId);
    } catch (err) {
      console.error('InitiateAuthForm error:', err); // Debug log
      toast.error(err.message || 'Failed to initiate registration. Please try again.', {
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

  const socialLogins = [
    { name: 'Facebook', icon: <FaFacebook className="text-2xl text-blue-600" /> },
    { name: 'Google', icon: <FcGoogle className="text-2xl" /> },
    { name: 'Apple', icon: <FaApple className="text-2xl" /> },
    { name: 'Email', icon: <Mail size={22} className="text-gray-600" /> },
  ];

  return (
    <div className="p-6 sm:p-8">
      <h2 className="text-2xl font-bold mb-4 hidden sm:block">Welcome to Hadupad</h2>

      <div className="mb-4 border border-gray-300 rounded-lg">
        <div className="p-2 border-b border-gray-300">
          <label htmlFor="country" className="block text-xs text-gray-500">
            Country/Region
          </label>
          <select id="country" className="w-full bg-transparent focus:outline-none font-medium">
            <option value="NG">Nigeria (+234)</option>
          </select>
        </div>
        <input
          type="tel"
          placeholder="Phone number"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          maxLength="11"
          pattern="[0-9]*"
          className="w-full p-3 bg-transparent focus:outline-none"
        />
      </div>

      <p className="text-xs text-gray-500 mb-4">
        We'll call or text you to confirm your number. Standard message and data rates apply.{' '}
        <a href="#" className="font-bold underline">
          Privacy Policy
        </a>
      </p>

      <button
        onClick={handleContinue}
        disabled={loading || (phoneNumber.length !== 10 && phoneNumber.length !== 11)}
        className={`w-full bg-[#DC4731] text-white py-3 rounded-lg font-bold hover:bg-[#b93a29] disabled:bg-gray-300 flex justify-center items-center transition`}
      >
        {loading ? <LoadingIndicator /> : 'Continue'}
      </button>

      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="mx-4 text-xs text-gray-500">or</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <div className="space-y-3">
        {socialLogins.map((social) => (
          <button
            key={social.name}
            className="w-full flex items-center border border-gray-400 rounded-lg p-3 hover:bg-gray-100 transition"
            onClick={() => toast.info(`Continue with ${social.name} (Not implemented)`, {
              position: 'top-right',
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              theme: 'colored',
              className: 'rounded-xl animate__animated animate__slideInDown animate__faster',
              style: { animationDuration: '0.5s' },
            })}
          >
            {social.icon}
            <span className="flex-1 text-center font-medium">Continue with {social.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}