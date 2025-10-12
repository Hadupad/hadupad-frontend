'use client';

import { useState } from 'react';
import BottomNav from '../BottomNav';
import SaveExitButton from '../SaveExitButton';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateAddress } from '@/redux/slices/addressSlice';

export default function FullAddressForm({ onNext, onBack, handleSaveExit }) {
  const [formData, setFormData] = useState({
    country: '',
    streetAddress: '',
    aptSuiteNumber: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const dispatch = useDispatch();
  const { property } = useSelector((state) => state.property);
  const { loading, error } = useSelector((state) => state.address);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleNext = () => {
    // Validate required fields
    const { country, streetAddress, city, state, zipCode } = formData;
    if (!country || !streetAddress || !city || !state || !zipCode) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!property?.id) {
      toast.error('Property ID not found. Please start over.');
      return;
    }

    dispatch(updateAddress({
      propertyId: property.id,
      data: formData,
    }))
      .unwrap()
      .then(() => {
        toast.success('Address updated successfully');
        onNext();
      })
      .catch((err) => {
        toast.error(err || 'Failed to update address');
      });
  };

  return (
    <>
      {/* <SaveExitButton onClick={handleSaveExit} /> */}

      <div className="w-full max-w-xl mx-auto space-y-3 text-center">
        <h2 className="text-2xl font-bold mt-1 mb-2">Please confirm your address</h2>
        <p className="text-sm text-gray-600 text-center">
          Your address is only shared after reservations have been made
        </p>

        <div className="w-full max-w-xl space-y-4">
          {/* Country/Region Select */}
          <div className="relative w-full">
            <select
              id="country"
              value={formData.country}
              onChange={handleInputChange}
              className="peer w-full border rounded-md px-4 pt-6 pb-2 text-sm font-semibold text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="" disabled hidden>Select a country</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Ghana">Ghana</option>
              <option value="Kenya">Kenya</option>
            </select>
            <label
              htmlFor="country"
              className="absolute left-4 top-2 text-gray-500 text-xs transition-all
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
                peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-500"
            >
              Country/Region
            </label>
          </div>

          {/* Street Address */}
          <div className="relative w-full">
            <input
              type="text"
              id="streetAddress"
              value={formData.streetAddress}
              onChange={handleInputChange}
              placeholder=" "
              className="peer w-full border rounded-md px-4 pt-6 pb-2 text-sm font-semibold placeholder-transparent focus:outline-none focus:ring-2 focus:ring-black"
            />
            <label
              htmlFor="streetAddress"
              className="absolute left-4 top-2 text-gray-500 text-xs transition-all
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
                peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-500"
            >
              Street address
            </label>
          </div>

          {/* Apt or Suite */}
          <div className="relative w-full">
            <input
              type="text"
              id="aptSuiteNumber"
              value={formData.aptSuiteNumber}
              onChange={handleInputChange}
              placeholder=" "
              className="peer w-full border rounded-md px-4 pt-6 pb-2 text-sm font-semibold placeholder-transparent focus:outline-none focus:ring-2 focus:ring-black"
            />
            <label
              htmlFor="aptSuiteNumber"
              className="absolute left-4 top-2 text-gray-500 text-xs transition-all
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
                peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-500"
            >
              Apt or suite number
            </label>
          </div>

          {/* City */}
          <div className="relative w-full">
            <input
              type="text"
              id="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder=" "
              className="peer w-full border rounded-md px-4 pt-6 pb-2 text-sm font-semibold placeholder-transparent focus:outline-none focus:ring-2 focus:ring-black"
            />
            <label
              htmlFor="city"
              className="absolute left-4 top-2 text-gray-500 text-xs transition-all
                peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
                peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-500"
            >
              City
            </label>
          </div>

          {/* State and Zip Code */}
          <div className="flex gap-2">
            {/* State */}
            <div className="relative w-1/2">
              <input
                type="text"
                id="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder=" "
                className="peer w-full border rounded-md px-4 pt-6 pb-2 text-sm font-semibold placeholder-transparent focus:outline-none focus:ring-2 focus:ring-black"
              />
              <label
                htmlFor="state"
                className="absolute left-4 top-2 text-gray-500 text-xs transition-all
                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
                  peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-500"
              >
                State
              </label>
            </div>

            {/* Zip Code */}
            <div className="relative w-1/2">
              <input
                type="text"
                id="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                placeholder=" "
                className="peer w-full border rounded-md px-4 pt-6 pb-2 text-sm font-semibold placeholder-transparent focus:outline-none focus:ring-2 focus:ring-black"
              />
              <label
                htmlFor="zipCode"
                className="absolute left-4 top-2 text-gray-500 text-xs transition-all
                  peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-400
                  peer-focus:top-2 peer-focus:text-xs peer-focus:text-gray-500"
              >
                Zip code
              </label>
            </div>
          </div>
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