"use client"
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBookingAsync, resetBookingState } from '@/redux/slices/bookingSlice';
// Import MUI DatePicker
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// Import Animate.css for animations
import 'animate.css';

export default function BookingCard({ property }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [nights, setNights] = useState(0);
  const [specialRequests, setSpecialRequests] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const { loading, error, bookingId } = useSelector((state) => state.booking);

  // Calculate number of nights
  useEffect(() => {
    if (checkIn && checkOut) {
      const checkInDate = new Date(checkIn);
      const checkOutDate = new Date(checkOut);
      if (checkOutDate > checkInDate) {
        const timeDiff = checkOutDate - checkInDate;
        const calculatedNights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        setNights(calculatedNights);
      } else {
        setNights(0);
      }
    } else {
      setNights(0);
    }
  }, [checkIn, checkOut]);

  // Show modal when booking is successful
  useEffect(() => {
    if (bookingId) {
      setIsModalOpen(true);
    }
  }, [bookingId]);

  // Reset booking state when unmounting
  useEffect(() => {
    return () => {
      dispatch(resetBookingState());
    };
  }, [dispatch]);

  // Pricing calculations
  const basePrice = property.price * nights;
  const discountPercent = property.discountPercent || 0;
  const calculatedDiscount = (discountPercent / 100) * basePrice; // For UI display
  const cleaningFee = property.cleaningFee || 0;
  const cautionFee = property.cautionFee || 0;
  const serviceFee = property.serviceFee || 0;

  // Total for UI display (using calculatedDiscount in Naira)
  const totalForDisplay = basePrice - calculatedDiscount + cleaningFee + cautionFee;

  // Total for backend (using discountPercent as per backend expectation)
  const totalForBackend = basePrice + cleaningFee + cautionFee - discountPercent;

  // Handle booking submission
  const handleBooking = () => {
    if (!checkIn || !checkOut || nights === 0) {
      alert('Please select valid check-in and check-out dates');
      return;
    }

    const bookingData = {
      checkInDate: new Date(checkIn).toISOString(),
      checkOutDate: new Date(checkOut).toISOString(),
      guestCount: guests,
      subtotal: basePrice,
      cleaningFee,
      serviceFee,
      cautionFee,
      discountAmount: discountPercent, // Send discount percentage to backend
      totalAmount: totalForBackend, // Use backend-expected total
      specialRequests,
    };

    dispatch(createBookingAsync({ propertyId: property.id, bookingData }));
  };

  // Close modal and reset booking state
  const closeModal = () => {
    setIsModalOpen(false);
    dispatch(resetBookingState());
  };

  return (
    <div className="sticky top-24 border border-gray-200 rounded-xl p-6 shadow-lg bg-white">
      {/* Price header */}
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-semibold text-gray-900">
            ₦{(property.price || 0).toLocaleString()}
          </span>
          <span className="text-gray-600">/ night</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-1">
            <span className="text-red-500">★</span>
            <span className="text-sm font-medium">{property.rating || 'N/A'}</span>
          </div>
          <span className="text-sm text-gray-600 underline">reviews</span>
        </div>
      </div>

      {/* Date & guest inputs */}
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="space-y-3 mb-6">
          <div className="grid grid-cols-2 gap-0 border border-gray-300 rounded-lg overflow-hidden">
            <div className="p-3 border-r border-gray-300">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                CHECK-IN
              </label>
              <DatePicker
                value={checkIn ? new Date(checkIn) : null}
                onChange={(newValue) => setCheckIn(newValue ? newValue.toISOString().split('T')[0] : '')}
                slotProps={{
                  textField: {
                    variant: 'outlined',
                    size: 'small',
                    className: 'w-full',
                    InputProps: {
                      className: 'text-sm text-gray-900 bg-transparent',
                    },
                  },
                }}
                format="yyyy-MM-dd"
                minDate={new Date()}
              />
            </div>
            <div className="p-3">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                CHECKOUT
              </label>
              <DatePicker
                value={checkOut ? new Date(checkOut) : null}
                onChange={(newValue) => setCheckOut(newValue ? newValue.toISOString().split('T')[0] : '')}
                slotProps={{
                  textField: {
                    variant: 'outlined',
                    size: 'small',
                    className: 'w-full',
                    InputProps: {
                      className: 'text-sm text-gray-900 bg-transparent',
                    },
                  },
                }}
                format="yyyy-MM-dd"
                minDate={checkIn ? new Date(new Date(checkIn).getTime() + 24 * 60 * 60 * 1000) : new Date()}
              />
            </div>
          </div>

          <div className="border border-gray-300 rounded-lg p-3">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              GUESTS
            </label>
            <select
              value={guests}
              onChange={(e) => setGuests(parseInt(e.target.value))}
              className="w-full text-sm text-gray-900 bg-transparent border-none outline-none"
            >
              <option value={1}>1 guest</option>
              <option value={2}>2 guests</option>
              <option value={3}>3 guests</option>
              <option value={4}>4 guests</option>
              <option value={5}>5+ guests</option>
            </select>
          </div>

          <div className="border border-gray-300 rounded-lg p-3">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              SPECIAL REQUESTS
            </label>
            <textarea
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="w-full text-sm text-gray-900 bg-transparent border-none outline-none"
              placeholder="Any special requests?"
              rows={3}
            />
          </div>
        </div>
      </LocalizationProvider>

      {/* Book button */}
      <button
        onClick={handleBooking}
        disabled={loading}
        className={`w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors mb-4 ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Processing...' : 'Book Property'}
      </button>

      {error && (
        <p className="text-center text-sm text-red-600 mb-4">
          Error: {error}
        </p>
      )}

      {/* Success Modal */}
      {bookingId && isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate__animated animate__fadeIn animate__faster">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl animate__animated animate__zoomIn animate__faster">
            <div className="flex justify-center mb-4">
              <svg
                className="w-16 h-16 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
              Booking Confirmed!
            </h2>
            <p className="text-gray-600 text-center mb-6 text-lg">
              Your booking has been successfully confirmed. <br />
              {/* <span className="font-semibold">Booking ID: {bookingId}</span> */}
            </p>
            <button
              onClick={closeModal}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <p className="text-center text-sm text-gray-600 mb-6">
        You won't be charged yet
      </p>

      {/* Price breakdown */}
      {nights > 0 ? (
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-700">
              ₦{(property.price || 0).toLocaleString()} x {nights} nights
            </span>
            <span className="text-gray-900">₦{basePrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-green-600">
            <span>Discount ({discountPercent}%)</span>
            <span>-₦{calculatedDiscount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Service fee</span>
            <span className="text-gray-900">₦{serviceFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Cleaning fee</span>
            <span className="text-gray-900">₦{cleaningFee.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Caution fee</span>
            <span className="text-gray-900">₦{cautionFee.toLocaleString()}</span>
          </div>
          <hr className="border-gray-200" />
          <div className="flex justify-between font-medium text-base">
            <span>Total</span>
            <span>₦{totalForDisplay.toLocaleString()}</span>
          </div>
        </div>
      ) : (
        <div className="text-sm text-gray-600">
          Please select valid check-in and check-out dates
        </div>
      )}
    </div>
  );
}
