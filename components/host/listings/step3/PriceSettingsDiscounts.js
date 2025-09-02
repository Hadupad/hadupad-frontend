'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { MdEdit } from 'react-icons/md';
import BottomNav from '../BottomNav';
import SaveExitButton from '../SaveExitButton';
import { updatePricingAsync } from '@/redux/slices/pricingSlice';

export default function PriceSettingsDiscounts({ onBack, onNext, handleSaveExit }) {
  const { property } = useSelector((state) => state.property);
  const pricing = useSelector((state) => state.pricing) || {
    pricePerNight: null,
    discountPercent: 0,
    loading: false,
    error: null,
  };
  const { pricePerNight: savedPricePerNight, discountPercent: savedDiscountPercent, loading, error } = pricing;
  const [discountPercent, setDiscountPercent] = useState(savedDiscountPercent || 0);
  const dispatch = useDispatch();

  const handleDiscountChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]*$/.test(value)) {
      setDiscountPercent(value === '' ? '' : Number(value));
    }
  };

  const handleNext = () => {
    if (!property?.id) {
      toast.error('Property ID not found. Please start over.');
      return;
    }

    if (!savedPricePerNight) {
      toast.error('Price per night must be set before adding discounts.');
      return;
    }

    if (discountPercent === '' || discountPercent < 0 || discountPercent > 100) {
      toast.error('Please enter a valid discount percentage (0-100).');
      return;
    }

    dispatch(
      updatePricingAsync({
        propertyId: property.id,
        data: { pricePerNight: savedPricePerNight, discountPercent: Number(discountPercent) },
      })
    )
      .unwrap()
      .then(() => {
        toast.success('Discount updated successfully');
        onNext();
      })
      .catch((err) => {
        const errorMessage = typeof err === 'string' ? err : err.error || err.message || 'Failed to update discount';
        toast.error(errorMessage);
      });
  };

  // Calculate guest price (base price after discount)
  const guestPrice = savedPricePerNight ? savedPricePerNight * (1 - discountPercent / 100) : 0;
  const cautionFee = 10000; // Hardcoded as per original component

  return (
    <>
      {/* <SaveExitButton onClick={handleSaveExit} /> */}

      <div className="flex flex-col items-center justify-between -mt-15">
        {/* Top Section */}
        <div className="flex flex-col items-center mt-6">
          <h2 className="text-2xl font-semibold leading-snug text-center">Add Discounts</h2>
          <p className="text-gray-400 text-sm mt-1">You can change it anytime</p>

          {/* Discount Input */}
          <div className="flex items-baseline mt-10">
            <span className="text-[86.85px] font-semibold leading-none">%</span>
            <input
              type="text"
              value={discountPercent}
              onChange={handleDiscountChange}
              className="text-[86.85px] font-semibold leading-none pl-4 bg-transparent border-none focus:outline-none w-[150px]"
              placeholder="0"
            />
            <div className="relative w-6 h-6 ml-2 mt-2">
              <div className="absolute w-full h-full border border-gray-300 rounded-full flex items-center justify-center">
                <MdEdit className="text-gray-700 text-xs" />
              </div>
            </div>
          </div>

          {/* Price Breakdown Boxes */}
          {savedPricePerNight && (
            <div className="flex flex-col items-center gap-4 mt-6">
              <div className="border border-black/50 rounded-md divide-y divide-black/10 w-[230px]">
                <div className="p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-black">Base Price</p>
                    <p className="text-sm text-black">₦{savedPricePerNight.toLocaleString()}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-black">Caution Fee</p>
                    <p className="text-sm text-black">₦{cautionFee.toLocaleString()}</p>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-black">Discount ({discountPercent}%)</p>
                      <p className="text-sm text-black">
                        -₦{(savedPricePerNight * (discountPercent / 100)).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-black">Guest prices before taxes</p>
                    <p className="text-sm text-black">₦{guestPrice.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="mb-2">
          <BottomNav onBack={onBack} onNext={handleNext} nextLabel="Continue" nextDisabled={loading} />
        </div>
      </div>
    </>
  );
}