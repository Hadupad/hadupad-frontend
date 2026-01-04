"use client";

import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { cancelBookingAsync } from '@/redux/slices/userBookingsSlice';
import { initiateConversationAsync } from '@/redux/slices/initiateConversationSlice'; 
import { initiateBookingPaymentAsync } from '@/redux/slices/paymentSlice';
import { toast } from 'react-toastify';
import { fetchConversationsAsync } from '@/redux/slices/conversationSlice';

const BookingCard = ({ booking }) => {
  const { 
    id, 
    image, 
    title, 
    location, 
    price, 
    date, 
    code,  
    status, 
    propertyId, 
    refetch,
    host
  } = booking;

  const hostId = host?.id;
  //console.log('BookingCard hostId:', hostId)
  
  const router = useRouter();
  const dispatch = useDispatch();
  const { paymentDetails, loading: paymentLoading, error: paymentError } = useSelector((state) => state.payments);
  
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [selectedBookingId, setSelectedBookingId] = useState(null);
  const [isCancelLoading, setIsCancelLoading] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);

  const statusMap = {
    Cancelled: { action: 'Re-book', color: 'red' },
    Pending: { action: 'Pay Now', color: 'green' },
    Paid: { action: 'Print Receipt', color: 'gray' },
    Confirmed: { action: 'View Details', color: 'blue' },
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

  // Handle chat button click
  // const handleChatClick = async (e) => {
  //   e.stopPropagation();
    
  //   if (!hostId) {
  //     toast.error('Host information not available.', {
  //       position: 'top-right',
  //       autoClose: 3000,
  //     });
  //     return;
  //   }

  //   setIsChatLoading(true);
  //   try {
  //     const initialMessage = `Hello, I'm reaching out regarding my booking for "${title}" located at ${location}. Details: Price: ₦${parseFloat(price || 0).toLocaleString()} / night, Date: ${date}, Booking Code: ${code}, Status: ${status}. Can we discuss this booking?`;
      
  //     const response = await dispatch(
  //       initiateConversationAsync({ 
  //         recipientId: hostId, 
  //         propertyId,
  //         message: initialMessage
  //       })
  //     ).unwrap();
      
  //     const conversationId = response.conversationId || response.id;
      
  //     if (conversationId) {
  //       await dispatch(fetchConversationsAsync());
  //       router.push(`/messages?conversationId=${conversationId}`);
  //       toast.success('Conversation started successfully!', {
  //         position: 'top-right',
  //         autoClose: 2000,
  //       });
  //     } else {
  //       throw new Error('Conversation ID not found');
  //     }
  //   } catch (error) {
  //     console.error('Chat initiation error:', error);
  //     toast.error(`Failed to start conversation: ${error.message || error}`, {
  //       position: 'top-right',
  //       autoClose: 3000,
  //     });
  //   } finally {
  //     setIsChatLoading(false);
  //   }
  // };

  const handleChatClick = async (e) => {
  e.stopPropagation();
  
  if (!hostId) {
    toast.error('Host information not available.', {
      position: 'top-right',
      autoClose: 3000,
    });
    return;
  }

  setIsChatLoading(true);
  try {
    const initialMessage = `Hello, I'm reaching out regarding my booking for "${title}" located at ${location}. Details: Price: ₦${parseFloat(price || 0).toLocaleString()} / night, Date: ${date}, Booking Code: ${code}, Status: ${status}. Can we discuss this booking?`;
    
    const response = await dispatch(
      initiateConversationAsync({ 
        recipientId: hostId, 
        propertyId,
        message: initialMessage
      })
    ).unwrap();
    
    // DEBUG: Check response structure
    console.log('Full API response:', response);
    console.log('Response type:', typeof response);
    console.log('Response keys:', response ? Object.keys(response) : 'null');
    
    // Try to extract conversationId from various possible structures
    let conversationId = null;
    
    if (response) {
      // Try direct properties
      conversationId = response.conversationId 
        || response.id 
        || response.conversation?.id
        || response.conversation?.conversationId;
      
      // If wrapped in data
      if (!conversationId && response.data) {
        conversationId = response.data.conversationId 
          || response.data.id
          || response.data.conversation?.id;
      }
      
      // If it's a success response with data
      if (!conversationId && response.success && response.data) {
        conversationId = response.data.conversationId 
          || response.data.id;
      }
    }
    
    // console.log('Extracted conversationId:', conversationId);
    
    if (conversationId) {
      // Refresh conversations list
      await dispatch(fetchConversationsAsync());
      
      // Navigate to messages with the conversation ID
      router.push(`/messages?conversationId=${conversationId}`);
      
      toast.success('Conversation started successfully!', {
        position: 'top-right',
        autoClose: 2000,
      });
    } else {
      console.error('Response structure:', JSON.stringify(response, null, 2));
      throw new Error('Conversation ID not found in response. Please check console for response structure.');
    }
  } catch (error) {
    console.error('Chat initiation error:', error);
    toast.error(`Failed to start conversation: ${error.message || error}`, {
      position: 'top-right',
      autoClose: 3000,
    });
  } finally {
    setIsChatLoading(false);
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
      //console.log('Cancelling booking with ID:', selectedBookingId);
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
    dispatch(resetPaymentState());
  };

  // Handle payment selection
  const handlePaymentSelection = async (e, method) => {
    e.stopPropagation();
    setIsPaymentModalOpen(false);

    try {
      const response = await dispatch(
        initiateBookingPaymentAsync({ bookingId: id, paymentMethod: method.toLowerCase() })
      ).unwrap();

      if (response.success && response.authorizationUrl) {
        toast.info(`Redirecting to ${method}...`, {
          position: 'top-right',
          autoClose: 2000,
        });
        window.location.href = response.authorizationUrl; // Redirect to payment gateway
      } else {
        throw new Error('Invalid payment initiation response');
      }
    } catch (error) {
      console.error('Payment initiation error:', error);
      toast.error(`Failed to initiate payment: ${error.message || error}`, {
        position: 'top-right',
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <div
        className="rounded-2xl shadow border p-4 w-full max-w-sm flex flex-col justify-between border-gray-200 cursor-pointer hover:shadow-lg transition-shadow bg-white"
        onClick={handleCardClick}
      >
        <div>
          <div className="flex justify-between items-start mb-3">
            <h3 className="font-semibold text-lg text-black line-clamp-2" title={title}>
              {title}
            </h3>
            <img 
              src={image || '/default-property.jpg'} 
              alt="Property" 
              className="w-12 h-12 rounded-full object-cover border-2 border-gray-200" 
            />
          </div>
          <p className="text-sm text-gray-600 mb-2 line-clamp-1" title={location}>
            {location}
          </p>
          <p className="text-sm text-black font-medium mb-4">
            ₦{parseFloat(price || 0).toLocaleString()} / night
          </p>

          <div className="flex justify-between mb-4 text-sm">
            <div>
              <p className="text-gray-400 text-xs">Date</p>
              <p className="font-semibold text-sm">{date}</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs">Code</p>
              <p className="font-semibold text-sm bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs">
                {code}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-2 pt-2 border-t border-gray-200">
          <div className="flex justify-between items-center text-sm">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              status === 'Cancelled' 
                ? 'bg-red-50 text-red-600' 
                : status === 'Pending' 
                ? 'bg-yellow-50 text-yellow-600' 
                : status === 'Confirmed' 
                ? 'bg-green-50 text-green-600' 
                : 'bg-gray-50 text-gray-600'
            }`}>
              {status}
            </span>
          </div>
          
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2 flex-1">
              <button
                className="p-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleChatClick}
                disabled={isChatLoading || !hostId}
                title={isChatLoading ? 'Starting conversation...' : 'Message Host'}
              >
                {isChatLoading ? (
                  <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <svg className="w-5 h-5 text-blue-500 hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                )}
              </button>
              
              {(status === 'Pending' || status === 'Confirmed') && (
                <button
                  className="font-medium text-red-500 hover:text-red-600 transition-colors text-sm px-2 py-1 rounded-lg hover:bg-red-50"
                  onClick={handleCancelClick}
                  disabled={isCancelLoading}
                >
                  Cancel
                </button>
              )}
            </div>
            
            <button
              className={`font-medium px-3 py-2 rounded-lg transition-all text-sm ${
                color === 'red' 
                  ? 'text-red-500 hover:text-red-600 hover:bg-red-50' 
                  : color === 'green' 
                  ? 'text-green-500 hover:text-green-600 hover:bg-green-50' 
                  : color === 'blue'
                  ? 'text-blue-500 hover:text-blue-600 hover:bg-blue-50'
                  : 'text-gray-500 hover:text-gray-600 hover:bg-gray-50'
              }`}
              onClick={handleActionClick}
            >
              {action}
            </button>
          </div>
        </div>
      </div>

      {isCancelModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={handleCancelModalClose}
        >
          <div
            className="bg-white rounded-xl p-6 w-full max-w-md mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Cancel Booking</h2>
            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want to cancel this booking? This action cannot be undone.
            </p>
            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="reason"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Reason for Cancellation *
                </label>
                <textarea
                  id="reason"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-vertical"
                  rows="4"
                  placeholder="Please explain why you're cancelling this booking..."
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  onClick={handleCancelModalClose}
                  disabled={isCancelLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isCancelLoading || !reason.trim()}
                >
                  {isCancelLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block mr-2"></div>
                      Cancelling...
                    </>
                  ) : (
                    'Cancel Booking'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isPaymentModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
          onClick={handlePaymentModalClose}
        >
          <div
            className="bg-white rounded-2xl p-8 w-full max-w-md mx-4 transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Choose Payment Method
            </h2>
            <div className="space-y-4 mb-6">
              <button
                className="w-full flex items-center justify-center p-4 text-lg font-semibold text-white bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl hover:from-yellow-600 hover:to-yellow-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                onClick={(e) => handlePaymentSelection(e, 'Flutterwave')}
                disabled={paymentLoading}
              >
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                Flutterwave
              </button>
              
              <button
                className="w-full flex items-center justify-center p-4 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-green-600 rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                onClick={(e) => handlePaymentSelection(e, 'Paystack')}
                disabled={paymentLoading}
              >
                <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 0111.636 0h1.732a8.012 8.012 0 01-15.368 0h1.732z" clipRule="evenodd" />
                </svg>
                Paystack
              </button>
            </div>
            <button
              type="button"
              className="w-full px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
              onClick={handlePaymentModalClose}
              disabled={paymentLoading}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingCard;