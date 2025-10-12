'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { FaRegCalendarCheck } from 'react-icons/fa';
import { BiSolidZap } from 'react-icons/bi';
import BottomNav from '../BottomNav';
import SaveExitButton from '../SaveExitButton';
import { updateBookingSettingsAsync } from '@/redux/slices/bookingSettingsSlice';

export default function BookingSetting({ onNext, onBack, handleSaveExit }) {
  const { property } = useSelector((state) => state.property);
  const { bookingType: savedBookingType, loading, error } = useSelector((state) => state.bookingSettings);
  const [selected, setSelected] = useState(savedBookingType === 'approve' ? 'Approve Bookings' : savedBookingType === 'instant' ? 'Instant Booking' : 'Approve Bookings');

  const options = [
    {
      label: 'Approve Bookings',
      value: 'approve',
      description: 'Review reservation requests and either accept or decline.',
      icon: <FaRegCalendarCheck size={32} />,
    },
    {
      label: 'Instant Booking',
      value: 'instant',
      description: 'Let guests book automatically.',
      icon: <BiSolidZap size={32} />,
    },
  ];

  const handleNext = () => {
    if (!property?.id) {
      toast.error('Property ID not found. Please start over.');
      return;
    }

    const selectedOption = options.find((option) => option.label === selected);
    if (!selectedOption) {
      toast.error('Please select a booking setting.');
      return;
    }

    dispatch(updateBookingSettingsAsync({
      propertyId: property.id,
      data: { bookingType: selectedOption.value },
    }))
      .unwrap()
      .then(() => {
        toast.success('Booking settings updated successfully');
        onNext();
      })
      .catch((err) => {
        const errorMessage = typeof err === 'string' ? err : err.message || 'Failed to update booking settings';
        toast.error(errorMessage);
      });
  };

  const dispatch = useDispatch();

  return (
    <>
      {/* <SaveExitButton onClick={handleSaveExit} /> */}

      <div className="w-full flex flex-col gap-6 items-center">
        <h2 className="text-2xl font-bold mt-1 mb-2">
          Pick your booking setting
        </h2>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        <div className="flex flex-col gap-4 mb-12">
          {options.map((option) => (
            <button
              key={option.label}
              onClick={() => setSelected(option.label)}
              className={`w-[644px] border rounded-xl px-6 py-4 text-left flex justify-between items-center ${
                selected === option.label ? 'border-black' : 'border-gray-300'
              }`}
            >
              <div className="flex flex-col justify-center">
                <p className="font-medium text-lg mb-1">{option.label}</p>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
              <div className="flex items-center justify-center">
                {option.icon}
              </div>
            </button>
          ))}
        </div>

<BottomNav
  onBack={onBack}
  onNext={handleNext}
  nextLabel="Continue"
  loading={loading} // Pass the loading state
/>
      </div>
    </>
  );
}