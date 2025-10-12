"use client";

import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { cancelBookingAsync } from '@/redux/slices/userBookingsSlice';
import { toast } from 'react-toastify';

const BookingCard = ({ booking }) => {
  const { image, title, location, price, date, code, status, propertyId } = booking;
  const router = useRouter();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reason, setReason] = useState('');

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
  const handleActionClick = () => {
    router.push(`/property/${propertyId}`);
  };

  // Handle cancel button click to open modal
  const handleCancelClick = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  // Handle modal submit
  const handleModalSubmit = async (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      toast.error('Cancellation reason cannot be empty.', {
        position: 'top-right',
        autoClose: 3000,
      });
      return;
    }

    try {
      await dispatch(cancelBookingAsync({ propertyId, reason })).unwrap();
      toast.success('Booking cancelled successfully.', {
        position: 'top-right',
        autoClose: 3000,
      });
      setIsModalOpen(false);
      setReason('');
    } catch (error) {
      toast.error(`Failed to cancel booking: ${error}`, {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  // Handle modal close
  const handleModalClose = (e) => {
    e.stopPropagation();
    setIsModalOpen(false);
    setReason('');
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
            {status === 'Pending' && (
              <button
                className="font-medium text-red-500 hover:text-red-600"
                onClick={handleCancelClick}
              >
                Cancel
              </button>
            )}
            <button
              className={`font-medium ${color === 'red' ? 'text-red-500 hover:text-red-600' : color === 'green' ? 'text-green-500 hover:text-green-600' : 'text-gray-500 hover:text-gray-600'}`}
              onClick={handleActionClick}
            >
              {action}
            </button>
          </div>
        </div>
      </div>

      {/* Cancellation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={handleModalClose}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold text-black mb-4">Cancel Booking</h2>
            <form onSubmit={handleModalSubmit}>
              <div className="mb-4">
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-1">
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
                  onClick={handleModalClose}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600"
                >
                  Cancel Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingCard;