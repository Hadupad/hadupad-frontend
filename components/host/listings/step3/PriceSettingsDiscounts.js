// 'use client';

// import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { toast } from 'react-toastify';
// import { MdEdit } from 'react-icons/md';
// import BottomNav from '../BottomNav';
// import SaveExitButton from '../SaveExitButton';
// import { updatePricingAsync } from '@/redux/slices/pricingSlice';

// export default function PriceSettingsDiscounts({ onBack, onNext, handleSaveExit }) {
//   const { property } = useSelector((state) => state.property);
//   const pricing = useSelector((state) => state.pricing) || {
//     pricePerNight: null,
//     discountPercent: 0,
//     serviceFee: null,
//     cleaningFee: null,
//     cautionFee: null,
//     loading: false,
//     error: null,
//   };
//   const { pricePerNight: savedPricePerNight, discountPercent: savedDiscountPercent, serviceFee: savedServiceFee, cleaningFee: savedCleaningFee, cautionFee: savedCautionFee, loading } = pricing;
//   const [discountPercent, setDiscountPercent] = useState(savedDiscountPercent?.toString() || '0');
//   const [discountError, setDiscountError] = useState('');
//   const dispatch = useDispatch();

//   const handleDiscountChange = (e) => {
//     const value = e.target.value;
//     if (value === '' || /^[0-9]*$/.test(value)) {
//       setDiscountPercent(value);
//       setDiscountError('');
//     } else {
//       setDiscountError('Please enter a valid integer (0-100)');
//     }
//   };

//   const handleDiscountBlur = () => {
//     if (discountPercent !== '' && !isNaN(Number(discountPercent))) {
//       const num = Number(discountPercent);
//       if (num < 0 || num > 100) {
//         setDiscountPercent(savedDiscountPercent?.toString() || '0');
//         setDiscountError('Discount must be between 0 and 100');
//       } else {
//         setDiscountPercent(num.toString());
//       }
//     } else if (discountPercent === '') {
//       setDiscountPercent('0');
//     }
//   };

//   const handleNext = () => {
//     if (!property?.id) {
//       toast.error('Property ID not found. Please start over.');
//       return;
//     }

//     if (!savedPricePerNight) {
//       toast.error('Price per night must be set before adding discounts.');
//       return;
//     }

//     const discount = Number(discountPercent);
//     if (isNaN(discount) || discount < 0 || discount > 100) {
//       toast.error('Please enter a valid discount percentage (0-100).');
//       return;
//     }

//     // Ensure all fields are numbers
//     const price = Number(savedPricePerNight);
//     const service = Number(savedServiceFee) || 0; // Fallback to 0 if null
//     const cleaning = Number(savedCleaningFee) || 0; // Fallback to 0 if null
//     const caution = Number(savedCautionFee) || 0; // Fallback to 0 if null

//     const payload = {
//       pricePerNight: price,
//       discountPercent: discount,
//       serviceFee: service,
//       cleaningFee: cleaning,
//       cautionFee: caution,
//     };
//     console.log('Payload before dispatch:', payload); // Debug log

//     dispatch(
//       updatePricingAsync({
//         propertyId: property.id,
//         data: payload,
//       })
//     )
//       .unwrap()
//       .then(() => {
//         toast.success('Discount updated successfully');
//         onNext();
//       })
//       .catch((err) => {
//         console.error('Update pricing error:', err); // Debug log
//         const errorMessage = typeof err === 'string' ? err : err.error || err.message || 'Failed to update discount';
//         toast.error(errorMessage);
//       });
//   };

//   const guestPrice = savedPricePerNight ? savedPricePerNight * (1 - Number(discountPercent) / 100) : 0;
//   const cautionFee = savedCautionFee || 10000; // Use saved value or default

//   return (
//     <>
//       <div className="flex flex-col items-center justify-between -mt-15">
//         <div className="flex flex-col items-center mt-6">
//           <h2 className="text-2xl font-semibold leading-snug text-center">Add Discounts</h2>
//           <p className="text-gray-400 text-sm mt-1">You can change it anytime</p>

//           {/* Discount Input */}
//           <div className="flex items-baseline mt-10">
//             <span className="text-[36.85px] font-semibold leading-none">%</span>
//             <input
//               type="text"
//               value={discountPercent}
//               onChange={handleDiscountChange}
//               onBlur={handleDiscountBlur}
//               className="text-[36.85px] font-semibold leading-none pl-4 bg-transparent border-none focus:outline-none w-[150px]"
//               placeholder="0"
//               onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}
//             />
//             <div className="relative w-6 h-6 ml-2 mt-2">
//               <div className="absolute w-full h-full border border-gray-300 rounded-full flex items-center justify-center">
//                 <MdEdit className="text-gray-700 text-xs" />
//               </div>
//             </div>
//           </div>
//           {discountError && <p className="text-red-500 text-sm mt-2">{discountError}</p>}

//           {/* Price Breakdown Boxes */}
//           {savedPricePerNight ? (
//             <div className="flex flex-col items-center gap-4 mt-6">
//               <div className="border border-black/50 rounded-md divide-y divide-black/10 w-[230px]">
//                 <div className="p-4 space-y-3">
//                   <div className="flex justify-between items-center">
//                     <p className="text-sm text-black">Base Price</p>
//                     <p className="text-sm text-black">₦{savedPricePerNight.toLocaleString()}</p>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <p className="text-sm text-black">Caution Fee</p>
//                     <p className="text-sm text-black">₦{cautionFee.toLocaleString()}</p>
//                   </div>
//                   {Number(discountPercent) > 0 && (
//                     <div className="flex justify-between items-center">
//                       <p className="text-sm text-black">Discount ({discountPercent}%)</p>
//                       <p className="text-sm text-black">
//                         -₦{(savedPricePerNight * (Number(discountPercent) / 100)).toLocaleString()}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//                 <div className="p-4">
//                   <div className="flex justify-between items-center">
//                     <p className="text-sm text-black">Guest prices before taxes</p>
//                     <p className="text-sm text-black">₦{guestPrice.toLocaleString()}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <p className="text-red-500 text-sm mt-6">Please set a price per night before adding discounts.</p>
//           )}
//         </div>

//         <div className="mb-2">
//           <BottomNav onBack={onBack} onNext={handleNext} nextLabel="Continue" nextDisabled={loading} />
//         </div>
//       </div>
//     </>
//   );
// }

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
    serviceFee: null,
    cleaningFee: null,
    cautionFee: null,
    loading: false,
    error: null,
  };
  const { pricePerNight: savedPricePerNight, discountPercent: savedDiscountPercent, serviceFee: savedServiceFee, cleaningFee: savedCleaningFee, cautionFee: savedCautionFee, loading } = pricing;
  const [discountPercent, setDiscountPercent] = useState(savedDiscountPercent?.toString() || '0');
  const [discountError, setDiscountError] = useState('');
  const dispatch = useDispatch();

  const handleDiscountChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]*$/.test(value)) {
      setDiscountPercent(value);
      setDiscountError('');
    } else {
      setDiscountError('Enter a valid integer (0-100)');
    }
  };

  const handleDiscountBlur = () => {
    if (discountPercent !== '' && !isNaN(Number(discountPercent))) {
      const num = Number(discountPercent);
      if (num < 0 || num > 100) {
        setDiscountPercent(savedDiscountPercent?.toString() || '0');
        setDiscountError('Discount must be 0-100');
      } else {
        setDiscountPercent(num.toString());
      }
    } else if (discountPercent === '') {
      setDiscountPercent('0');
    }
  };

  const handleNext = () => {
    if (!property?.id) {
      toast.error('Property ID not found.');
      return;
    }

    if (!savedPricePerNight) {
      toast.error('Set price per night first.');
      return;
    }

    const discount = Number(discountPercent);
    if (isNaN(discount) || discount < 0 || discount > 100) {
      toast.error('Enter a valid discount (0-100).');
      return;
    }

    const price = Number(savedPricePerNight);
    const service = Number(savedServiceFee) || 0;
    const cleaning = Number(savedCleaningFee) || 0;
    const caution = Number(savedCautionFee) || 0;

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
        toast.success('Discount updated');
        onNext();
      })
      .catch((err) => {
        toast.error(err.message || 'Failed to update discount');
      });
  };

  const guestPrice = savedPricePerNight ? savedPricePerNight * (1 - Number(discountPercent) / 100) : 0;
  const cautionFee = savedCautionFee || 10000;

  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <div className="w-full max-w-md">
        <h2 className="text-xl font-semibold text-center">Add Discounts</h2>
        <p className="text-gray-400 text-xs text-center mb-4">Adjust anytime</p>

        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium">Discount (%)</label>
            <div className="flex items-center mt-1">
              <span className="text-lg font-semibold">%</span>
              <input
                type="text"
                value={discountPercent}
                onChange={handleDiscountChange}
                onBlur={handleDiscountBlur}
                className="text-lg font-semibold pl-2 bg-transparent border-b border-gray-300 focus:outline-none w-20"
                placeholder="0"
              />
              <MdEdit className="ml-2 text-gray-700 cursor-pointer" />
            </div>
            {discountError && <p className="text-red-500 text-xs mt-1">{discountError}</p>}
          </div>

          {savedPricePerNight ? (
            <div className="mt-4 border border-gray-300 rounded-md p-3">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Base Price</span>
                  <span>₦{savedPricePerNight.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Caution Fee</span>
                  <span>₦{cautionFee.toLocaleString()}</span>
                </div>
                {Number(discountPercent) > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Discount ({discountPercent}%)</span>
                    <span>-₦{(savedPricePerNight * (Number(discountPercent) / 100)).toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-semibold border-t pt-2">
                  <span>Guest Total</span>
                  <span>₦{guestPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-red-500 text-xs mt-4 text-center">Set a price per night first.</p>
          )}
        </div>
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