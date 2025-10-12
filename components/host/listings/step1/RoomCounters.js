'use client';

import { useState } from 'react';
import BottomNav from '../BottomNav';
import SaveExitButton from '../SaveExitButton';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateBasicDetailsAsync } from '@/redux/slices/basicDetailsSlice';

export default function RoomCounters({ onNext, onBack, handleSaveExit }) {
  const { property } = useSelector((state) => state.property);
  const { basicDetails, loading, error } = useSelector((state) => state.basicDetails);
  const [formData, setFormData] = useState({
    maxGuestCount: basicDetails?.maxGuestCount || 2,
    bedroomCount: basicDetails?.bedroomCount || 2,
    bedCount: basicDetails?.bedCount || 2,
    bathroomCount: basicDetails?.bathroomCount || 2,
    moveToNextStep: true,
  });
  const dispatch = useDispatch();

  const handleCounterChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: Math.max(0, value), 
    }));
  };

  const Counter = ({ label, value, setValue, field }) => (
    <div className="flex justify-between items-center border-b py-4">
      <p className="text-sm">{label}</p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => setValue(field, value - 1)}
          className="border rounded-full w-8 h-8 flex items-center justify-center"
          disabled={value === 0}
        >
          −
        </button>
        <span>{value}</span>
        <button
          onClick={() => setValue(field, value + 1)}
          className="border rounded-full w-8 h-8 flex items-center justify-center"
        >
          +
        </button>
      </div>
    </div>
  );

  const handleNext = () => {
    const { maxGuestCount, bedroomCount, bedCount, bathroomCount } = formData;

    // Validate required fields
    if (
      maxGuestCount === 0 ||
      bedroomCount === 0 ||
      bedCount === 0 ||
      bathroomCount === 0
    ) {
      toast.error('Please provide at least 1 for guests, bedrooms, beds, and bathrooms');
      return;
    }

    if (!property?.id) {
      toast.error('Property ID not found. Please start over.');
      return;
    }

    dispatch(updateBasicDetailsAsync({
      propertyId: property.id,
      data: { ...formData, moveToNextStep: true },
    }))
      .unwrap()
      .then(() => {
        toast.success('Basic details updated successfully');
        onNext();
      })
      .catch((err) => {
        toast.error(err || 'Failed to update basic details');
      });
  };

  return (
    <>
      {/* <SaveExitButton onClick={handleSaveExit} /> */}

      <div className="w-full max-w-md mx-auto">
        <h2 className="text-xl font-bold mt-1 mb-2">
          Share some basic details about your place
        </h2>
        <Counter
          label="Guests"
          value={formData.maxGuestCount}
          setValue={handleCounterChange}
          field="maxGuestCount"
        />
        <Counter
          label="Bedrooms"
          value={formData.bedroomCount}
          setValue={handleCounterChange}
          field="bedroomCount"
        />
        <Counter
          label="Beds"
          value={formData.bedCount}
          setValue={handleCounterChange}
          field="bedCount"
        />
        <Counter
          label="Bathrooms"
          value={formData.bathroomCount}
          setValue={handleCounterChange}
          field="bathroomCount"
        />

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