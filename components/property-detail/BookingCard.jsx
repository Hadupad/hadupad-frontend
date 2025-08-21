import { useState } from 'react';

export default function BookingCard({ property }) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(2);
  const [nights, setNights] = useState(7);

  const basePrice = property.price * nights;
  const weeklyDiscount = basePrice * 0.1; // 10% weekly discount
  const cleaningFee = 20000;
  const cautionFee = 50000;
  const total = basePrice - weeklyDiscount + cleaningFee + cautionFee;

  return (
    <div className="sticky top-24 border border-gray-200 rounded-xl p-6 shadow-lg bg-white">
      {/* Price header */}
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-semibold text-gray-900">
            ₦{property.price.toLocaleString()}
          </span>
          <span className="text-gray-600">/ night</span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-1">
            <span className="text-red-500">★</span>
            <span className="text-sm font-medium">{property.rating}</span>
          </div>
          <span className="text-sm text-gray-600 underline">
            {property.host.reviews} reviews
          </span>
        </div>
      </div>

      {/* Date and guest inputs */}
      <div className="space-y-3 mb-6">
        <div className="grid grid-cols-2 gap-0 border border-gray-300 rounded-lg overflow-hidden">
          <div className="p-3 border-r border-gray-300">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              CHECK-IN
            </label>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full text-sm text-gray-900 bg-transparent border-none outline-none"
              placeholder="04/04/2025"
            />
          </div>
          <div className="p-3">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              CHECKOUT
            </label>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full text-sm text-gray-900 bg-transparent border-none outline-none"
              placeholder="10/04/2025"
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
      </div>

      {/* Book button */}
      <button className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors mb-4">
        Book Property
      </button>

      <p className="text-center text-sm text-gray-600 mb-6">
        You won't be charged yet
      </p>

      {/* Price breakdown */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-700">₦{property.price.toLocaleString()} x {nights} nights</span>
          <span className="text-gray-900">₦{basePrice.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-green-600">
          <span>Weekly discount</span>
          <span>-₦{weeklyDiscount.toLocaleString()}</span>
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
          <span>₦{total.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}
