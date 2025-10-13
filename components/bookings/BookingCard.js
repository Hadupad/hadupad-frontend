"use client";

import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { cancelBookingAsync } from '@/redux/slices/userBookingsSlice';
import { toast } from 'react-toastify';

const BookingCard = ({ booking }) => {
  const { id, image, title, location, price, date, code, status, propertyId, refetch } = booking;
  const router = useRouter();
  const dispatch = useDispatch();
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [isCancelLoading, setIsCancelLoading] = useState(false);

  const statusMap = {
    Cancelled: { action: 'Re-book', color: 'red' },
    Pending: { action: 'Pay Now', color: 'green' },
    Paid: { action: 'Print Receipt', color: 'gray' },
  };

  const { action, color } = statusMap[status] || { action: 'View', color: 'gray' };

  // Handle card click, excluding buttons
  const handleCardClick = () => {
    router.push(`/property/${propertyId}`);
  };

  // Handle action button click
  const handleActionClick = (e) => {
    e.stopPropagation();
    if (status === 'Pending') {
      setIsPaymentModalOpen(true);
    } else {
      router.push(`/property/${propertyId}`);
    }
  };

  // Handle cancel button click to open cancel modal
  const handleCancelClick = (e) => {
    e.stopPropagation();
    if (status !== 'Pending' && status !== 'Confirmed') {
      toast.error('This booking cannot be cancelled.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }
    setSelectedBookingId(id);
    setIsCancelModalOpen(true);
  };

  // Handle cancel modal submit
  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      toast.error('Cancellation reason cannot be empty.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }
    if (!selectedBookingId) {
      toast.error('Invalid booking ID.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    setIsCancelLoading(true);
    try {
      console.log('Cancelling booking with ID:', selectedBookingId);
      await dispatch(cancelBookingAsync({ id: selectedBookingId, reason })).unwrap();
      toast.success('Booking cancelled successfully.', {
        position: 'top-right',
        autoClose: 3000,
      });
      setIsCancelModalOpen(false);
      setReason('');
      setSelectedBookingId(null);
      if (refetch) {
        await refetch();
      }
    } catch (error) {
      toast.error(`Failed to cancel booking: ${error}`, {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setIsCancelLoading(false);
    }
  };

  // Handle cancel modal close
  const handleCancelModalClose = (e) => {
    e.stopPropagation();
    setIsCancelModalOpen(false);
    setReason('');
    setSelectedBookingId(null);
  };

  // Handle payment modal close
  const handlePaymentModalClose = (e) => {
    e.stopPropagation();
    setIsPaymentModalOpen(false);
  };

  // Handle payment selection
  const handlePaymentSelection = (e, method) => {
    e.stopPropagation();
    console.log(`Selected payment method: ${method}`);
    setIsPaymentModalOpen(false);
    // Add payment processing logic here (e.g., redirect to payment gateway)
  };

  return (
    <>
      <div
        className="rounded-2xl shadow border p-4 w-full max-w-sm flex flex-col justify-between border-gray-200 cursor-pointer hover:shadow-lg transition-shadow"
        onClick={handleCardClick}
      >
        <div>
          <div className="flex justify-between items-start">
            <h3 className="font-semibold text-lg text-black">{title}</h3>
            <img src={image} alt="Property" className="w-12 h-12 rounded-full object-cover" />
          </div>
          <p className="text-sm text-gray-600 mt-1">{location}</p>
          <p className="text-sm text-black mt-1 font-medium">₦{price} night</p>

          <div className="flex justify-between mt-4 text-sm">
            <div>
              <p className="text-gray-400">Date</p>
              <p className="font-semibold">{date}</p>
            </div>
            <div>
              <p className="text-gray-400">Code</p>
              <p className="font-semibold">{code}</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-200 text-sm">
          <p className={`${color === 'gray' ? 'text-gray-400 line-through' : 'text-gray-400'}`}>{status}</p>
          <div className="flex space-x-2">
            {(status === 'Pending' || status === 'Confirmed') && (
              <button
                className="font-medium text-red-500 hover:text-red-600 transition-colors"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            )}
            <button
              className={`font-medium ${color === 'red' ? 'text-red-500 hover:text-red-600' : color === 'green' ? 'text-green-500 hover:text-green-600' : 'text-gray-500 hover:text-gray-600'} transition-colors`}
              onClick={handleActionClick}
            >
              {action}
            </button>
          </div>
        </div>
      </div>

      {/* Cancellation Modal */}
      {isCancelModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={handleCancelModalClose}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-md mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-black mb-4">Cancel Booking</h2>
            <form onSubmit={handleModalSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="reason"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Reason for Cancellation
                </label>
                <textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  placeholder="Enter your reason for cancelling the booking"
                  required
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  onClick={handleCancelModalClose}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-md"
                  disabled={isCancelLoading}
                >
                  {isCancelLoading ? 'Cancelling...' : 'Cancel Booking'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Payment Selection Modal */}
      {isPaymentModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={handlePaymentModalClose}
        >
          <div
            className="bg-white rounded-xl p-8 w-full max-w-md mx-4 transform transition-all duration-300 scale-95 animate-in"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Choose Your Payment Method</h2>
            <div className="flex flex-col space-y-4">
              <button
                className="flex items-center justify-center px-6 py-3 text-lg font-semibold text-white bg-yellow-400 rounded-lg hover:bg-yellow-500 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-yellow-300 shadow-md"
                onClick={(e) => handlePaymentSelection(e, 'Flutterwave')}
                aria-label="Pay with Flutterwave"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0c-2.761 0-5 2.239-5 5s2.239 5 5 5 5-2.239 5-5-2.239-5-5-5zm0 0c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8z"
                  />
                </svg>
                Pay with Flutterwave
              </button>
              <button
                className="flex items-center justify-center px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-400 shadow-md"
                onClick={(e) => handlePaymentSelection(e, 'Stripe')}
                aria-label="Pay with Stripe"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                Pay with Stripe
              </button>
              <button
                className="flex items-center justify-center px-6 py-3 text-lg font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-400 shadow-md"
                onClick={(e) => handlePaymentSelection(e, 'Paystack')}
                aria-label="Pay with Paystack"
              >
                <svg
                  className="w-6 h-6 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z"
                  />
                </svg>
                Pay with Paystack
              </button>
            </div>
            <div className="flex justify-end mt-6">
              <button
                type="button"
                className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
                onClick={handlePaymentModalClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingCard;