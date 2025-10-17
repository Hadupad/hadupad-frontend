"use client";

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const PaymentSuccessPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const bookingId = searchParams.get('bookingId');
  const reference = searchParams.get('reference');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg text-center">
        <svg className="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Payment Successful!</h2>
        <p className="mt-2 text-sm text-gray-600">
          Your booking has been confirmed.
        </p>
        <div className="mt-4 text-left">
          <p className="text-sm font-medium text-gray-700"><strong>Booking ID:</strong> {bookingId}</p>
          <p className="text-sm font-medium text-gray-700"><strong>Reference:</strong> {reference}</p>
        </div>
        <div className="mt-6">
          <button
            onClick={() => router.push('/')}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#f97316] hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f97316]"
          >
            Go to Home
          </button>
          <button
            onClick={() => router.push('/guest/bookings')}
            className="mt-3 w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f97316]"
          >
            View My Bookings
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;

