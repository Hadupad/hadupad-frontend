
'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { MdEdit } from 'react-icons/md';
import BottomNav from '../BottomNav';
import SaveExitButton from '../SaveExitButton';
import { updatePricingAsync } from '@/redux/slices/pricingSlice';

export default function PriceSettings({ onBack, onNext, handleSaveExit }) {
  const { property } = useSelector((state) => state.property);
  const pricing = useSelector((state) => state.pricing) || {
    pricePerNight: 50000, // Default to ₦50,000
    discountPercent: 0,
    loading: false,
    error: null,
  };
  const { pricePerNight: savedPricePerNight, discountPercent: savedDiscountPercent, loading, error } = pricing;
  const [pricePerNight, setPricePerNight] = useState(savedPricePerNight || 50000);
  const [discountPercent, setDiscountPercent] = useState(savedDiscountPercent || 0);
  const dispatch = useDispatch();

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]*$/.test(value)) {
      setPricePerNight(value === '' ? '' : Number(value));
    }
  };

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

    if (pricePerNight === '' || pricePerNight <= 0) {
      toast.error('Please enter a valid price per night (greater than 0).');
      return;
    }

    if (discountPercent === '' || discountPercent < 0 || discountPercent > 100) {
      toast.error('Please enter a valid discount percentage (0-100).');
      return;
    }

    dispatch(
      updatePricingAsync({
        propertyId: property.id,
        data: { pricePerNight: Number(pricePerNight), discountPercent: Number(discountPercent) },
      })
    )
      .unwrap()
      .then(() => {
        toast.success('Pricing updated successfully');
        onNext();
      })
      .catch((err) => {
        const errorMessage = typeof err === 'string' ? err : err.error || err.message || 'Failed to update pricing';
        toast.error(errorMessage);
      });
  };

  // Calculate guest price (base price after discount)
  const guestPrice = pricePerNight * (1 - discountPercent / 100);
  const cautionFee = 10000; // Hardcoded as per original component
  const youEarn = guestPrice; // Assuming "You earn" is the guest price before taxes

  return (
    <>
      {/* <SaveExitButton onClick={handleSaveExit} /> */}

      <div className="flex flex-col items-center justify-between -mt-15">
        {/* Top Section */}
        <div className="flex flex-col items-center mt-6">
          <h2 className="text-2xl font-semibold leading-snug text-center">
            Now, set your price per night
          </h2>
          <p className="text-gray-400 text-sm mt-1">You can change it anytime</p>

          {/* Price Input */}
          <div className="flex items-baseline mt-10">
            <span className="text-[86.85px] font-semibold leading-none">₦</span>
            <input
              type="text"
              value={pricePerNight}
              onChange={handlePriceChange}
              className="text-[86.85px] font-semibold leading-none pl-4 bg-transparent border-none focus:outline-none w-[200px]"
              placeholder="50000"
            />
            <div className="relative w-6 h-6 ml-2 mt-2">
              <div className="absolute w-full h-full border border-gray-300 rounded-full flex items-center justify-center">
                <MdEdit className="text-gray-700 text-xs" />
              </div>
            </div>
          </div>

          {/* Discount Input */}
          <div className="flex items-baseline mt-4">
            <span className="text-xl font-semibold">Discount (%):</span>
            <input
              type="text"
              value={discountPercent}
              onChange={handleDiscountChange}
              className="text-xl font-semibold pl-4 bg-transparent border-none focus:outline-none w-[100px]"
              placeholder="0"
            />
          </div>

          {/* Price Breakdown Boxes */}
          <div className="flex flex-col items-center gap-4 mt-6">
            <div className="border border-black/50 rounded-md divide-y divide-black/10 w-[230px]">
              <div className="p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-black">Base Price</p>
                  <p className="text-sm text-black">₦{pricePerNight.toLocaleString()}</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-black">Caution Fee</p>
                  <p className="text-sm text-black">₦{cautionFee.toLocaleString()}</p>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-black">Discount ({discountPercent}%)</p>
                    <p className="text-sm text-black">
                      -₦{(pricePerNight * (discountPercent / 100)).toLocaleString()}
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
            <div className="border border-black/10 rounded-md w-[230px] p-4">
              <div className="flex justify-between items-center">
                <p className="text-sm text-black">You earn</p>
                <p className="text-sm text-black">₦{youEarn.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mb-2">
          <BottomNav onBack={onBack} onNext={handleNext} nextLabel="Continue" nextDisabled={loading} />
        </div>
      </div>
    </>
  );
}