'use client';

import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { MdEdit } from 'react-icons/md';
import BottomNav from '../BottomNav';
import SaveExitButton from '../SaveExitButton';
import { updatePricingAsync } from '@/redux/slices/pricingSlice';

export default function PriceSettings({ onBack, onNext, handleSaveExit }) {
  const { property } = useSelector((state) => state.property);
  const pricing = useSelector((state) => state.pricing) || {
    pricePerNight: null,
    discountPercent: 0,
    serviceFee: 0,
    cleaningFee: 0,
    cautionFee: 0,
    loading: false,
    error: null,
  };
  const { pricePerNight: savedPricePerNight, discountPercent: savedDiscountPercent, serviceFee: savedServiceFee, cleaningFee: savedCleaningFee, cautionFee: savedCautionFee, loading } = pricing;
  const [pricePerNight, setPricePerNight] = useState(savedPricePerNight?.toString() || '');
  const [serviceFee, setServiceFee] = useState(savedServiceFee?.toString() || '');
  const [cleaningFee, setCleaningFee] = useState(savedCleaningFee?.toString() || '');
  const [cautionFee, setCautionFee] = useState(savedCautionFee?.toString() || '');
  const [priceError, setPriceError] = useState('');
  const [serviceFeeError, setServiceFeeError] = useState('');
  const [cleaningFeeError, setCleaningFeeError] = useState('');
  const [cautionFeeError, setCautionFeeError] = useState('');
  const priceInputRef = useRef(null);
  const dispatch = useDispatch();

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setPricePerNight(value);
      setPriceError('');
    } else {
      setPriceError('Invalid number');
    }
  };

  const handleServiceFeeChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setServiceFee(value);
      setServiceFeeError('');
    } else {
      setServiceFeeError('Invalid number');
    }
  };

  const handleCleaningFeeChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setCleaningFee(value);
      setCleaningFeeError('');
    } else {
      setCleaningFeeError('Invalid number');
    }
  };

  const handleCautionFeeChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setCautionFee(value);
      setCautionFeeError('');
    } else {
      setCautionFeeError('Invalid number');
    }
  };

  const handlePriceBlur = () => {
    if (pricePerNight !== '' && !isNaN(Number(pricePerNight))) {
      setPricePerNight(Number(pricePerNight).toFixed(2));
    }
  };

  const handleServiceFeeBlur = () => {
    if (serviceFee !== '' && !isNaN(Number(serviceFee))) {
      setServiceFee(Number(serviceFee).toFixed(2));
    }
  };

  const handleCleaningFeeBlur = () => {
    if (cleaningFee !== '' && !isNaN(Number(cleaningFee))) {
      setCleaningFee(Number(cleaningFee).toFixed(2));
    }
  };

  const handleCautionFeeBlur = () => {
    if (cautionFee !== '' && !isNaN(Number(cautionFee))) {
      setCautionFee(Number(cautionFee).toFixed(2));
    }
  };

  const handleEditClick = () => {
    priceInputRef.current?.focus();
  };

  const handleNext = () => {
    if (!property?.id) {
      toast.error('Property ID not found.');
      return;
    }

    const price = Number(pricePerNight);
    const service = Number(serviceFee);
    const cleaning = Number(cleaningFee);
    const caution = Number(cautionFee);
    const discount = Number(savedDiscountPercent);

    if (isNaN(price) || price <= 0) {
      toast.error('Enter a valid price per night.');
      return;
    }

    if (isNaN(service) || service < 0) {
      toast.error('Enter a valid service fee.');
      return;
    }

    if (isNaN(cleaning) || cleaning < 0) {
      toast.error('Enter a valid cleaning fee.');
      return;
    }

    if (isNaN(caution) || caution < 0) {
      toast.error('Enter a valid caution fee.');
      return;
    }

    dispatch(
      updatePricingAsync({
        propertyId: property.id,
        data: {
          pricePerNight: price,
          discountPercent: discount,
          serviceFee: service,
          cleaningFee: cleaning,
          cautionFee: caution,
        },
      })
    )
      .unwrap()
      .then(() => {
        toast.success('Pricing updated');
        onNext();
      })
      .catch((err) => {
        toast.error(err.message || 'Failed to update pricing');
      });
  };

  const basePrice = pricePerNight !== '' && !isNaN(Number(pricePerNight))
    ? Number(pricePerNight) * (1 - Number(savedDiscountPercent) / 100)
    : 0;
  const caution = cautionFee !== '' && !isNaN(Number(cautionFee)) ? Number(cautionFee) : 0;
  const service = serviceFee !== '' && !isNaN(Number(serviceFee)) ? Number(serviceFee) : 0;
  const cleaning = cleaningFee !== '' && !isNaN(Number(cleaningFee)) ? Number(cleaningFee) : 0;
  const guestPrice = basePrice + service + cleaning + caution;
  const youEarn = basePrice;

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <h2 className="text-xl font-semibold text-center">Set Pricing Details</h2>
        <p className="text-gray-400 text-xs text-center mb-4">Adjust anytime</p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Price/Night (₦)</label>
            <div className="flex items-center mt-1">
              <span className="text-lg font-semibold">₦</span>
              <input
                type="text"
                value={pricePerNight}
                onChange={handlePriceChange}
                onBlur={handlePriceBlur}
                className="text-lg font-semibold pl-2 bg-transparent border-b border-gray-300 focus:outline-none w-24"
                placeholder="0.00"
                ref={priceInputRef}
              />
              <MdEdit className="ml-2 text-gray-700 cursor-pointer" onClick={handleEditClick} />
            </div>
            {priceError && <p className="text-red-500 text-xs mt-1">{priceError}</p>}
          </div>

          <div>
            <label className="text-sm font-medium">Service Fee (₦)</label>
            <input
              type="text"
              value={serviceFee}
              onChange={handleServiceFeeChange}
              onBlur={handleServiceFeeBlur}
              className="text-lg font-semibold mt-1 bg-transparent border-b border-gray-300 focus:outline-none w-24"
              placeholder="0.00"
            />
            {serviceFeeError && <p className="text-red-500 text-xs mt-1">{serviceFeeError}</p>}
          </div>

          <div>
            <label className="text-sm font-medium">Cleaning Fee (₦)</label>
            <input
              type="text"
              value={cleaningFee}
              onChange={handleCleaningFeeChange}
              onBlur={handleCleaningFeeBlur}
              className="text-lg font-semibold mt-1 bg-transparent border-b border-gray-300 focus:outline-none w-24"
              placeholder="0.00"
            />
            {cleaningFeeError && <p className="text-red-500 text-xs mt-1">{cleaningFeeError}</p>}
          </div>

          <div>
            <label className="text-sm font-medium">Caution Fee (₦)</label>
            <input
              type="text"
              value={cautionFee}
              onChange={handleCautionFeeChange}
              onBlur={handleCautionFeeBlur}
              className="text-lg font-semibold mt-1 bg-transparent border-b border-gray-300 focus:outline-none w-24"
              placeholder="0.00"
            />
            {cautionFeeError && <p className="text-red-500 text-xs mt-1">{cautionFeeError}</p>}
          </div>

          <div className="col-span-2">
            <label className="text-sm font-medium">Discount (%)</label>
            <p className="text-lg font-semibold mt-1">{savedDiscountPercent}%</p>
          </div>
        </div>

        {pricePerNight !== '' && !isNaN(Number(pricePerNight)) ? (
          <div className="mt-4 border border-gray-300 rounded-md p-3">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Base Price</span>
                <span>₦{Number(pricePerNight).toLocaleString()}</span>
              </div>
              {Number(savedDiscountPercent) > 0 && (
                <div className="flex justify-between text-sm">
                  <span>Discount ({savedDiscountPercent}%)</span>
                  <span>-₦{(Number(pricePerNight) * (Number(savedDiscountPercent) / 100)).toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span>Service Fee</span>
                <span>₦{service.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Cleaning Fee</span>
                <span>₦{cleaning.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Caution Fee</span>
                <span>₦{caution.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold border-t pt-2">
                <span>Guest Total</span>
                <span>₦{guestPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold">
                <span>You Earn</span>
                <span>₦{youEarn.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-red-500 text-xs mt-4 text-center">Enter a price per night.</p>
        )}
      </div>

      <div className="mt-6 w-full max-w-md">
       <BottomNav
  onBack={onBack}
  onNext={handleNext}
  nextLabel="Continue"
  loading={loading}
/>
      </div>
    </div>
  );
}