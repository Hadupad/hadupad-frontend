"use client"
import { useState, useMemo } from "react";
import { Star, Flag } from "lucide-react";

const BookingCard = () => {
  const [checkIn, setCheckIn] = useState("04/04/2025");
  const [checkOut, setCheckOut] = useState("10/04/2025");
  const [guests, setGuests] = useState(2);

  const nightlyRate = 50000;
  const nights = 7;
  const discount = 50000;
  const cleaningFee = 20000;
  const cautionFee = 50000;

  const subtotal = nightlyRate * nights;
  const total = useMemo(() => subtotal - discount + cleaningFee + cautionFee, [subtotal]);

  return (
    <div className="w-full max-w-sm rounded-xl border p-4 shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-xl font-semibold">₦{nightlyRate.toLocaleString()}</span>
          <span className="text-sm text-gray-500"> /night</span>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <Star className="text-[#B94D3A] fill-[#B94D3A] w-4 h-4" />
          <span className="text-black font-medium">5.0</span>
          <span className="text-gray-600">·</span>
          <a href="#" className="underline">7 reviews</a>
        </div>
      </div>

      <div className="border rounded-xl text-sm overflow-hidden divide-y mb-4">
        <div className="flex justify-between px-3 py-2">
          <div>
            <span className="text-xs text-gray-500">CHECK-IN</span>
            <div>{checkIn}</div>
          </div>
          <div>
            <span className="text-xs text-gray-500">CHECKOUT</span>
            <div>{checkOut}</div>
          </div>
        </div>
        <div className="px-3 py-2">
          <span className="text-xs text-gray-500">GUESTS</span>
          <div>{guests} guests</div>
        </div>
      </div>

      <button className="w-full bg-[#B94D3A] hover:bg-[#a33d2d] text-white font-medium py-3 rounded-full mb-2">
        Book Property
      </button>

      <p className="text-center text-gray-400 text-sm mb-4">You won’t be charged yet</p>

      <div className="text-sm text-black space-y-2 mb-4">
        <div className="flex justify-between">
          <span>₦{nightlyRate.toLocaleString()} x {nights} nights</span>
          <span>₦{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-green-600">
          <span>Weekly discount</span>
          <span>-₦{discount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Cleaning fee</span>
          <span>₦{cleaningFee.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span>Caution fee</span>
          <span>₦{cautionFee.toLocaleString()}</span>
        </div>
      </div>

      <hr className="mb-2" />

      <div className="flex justify-between font-semibold text-black text-base mb-4">
        <span>Total</span>
        <span>₦{total.toLocaleString()}</span>
      </div>

      <div className="flex justify-center items-center text-sm text-gray-600 hover:underline cursor-pointer">
        <Flag className="w-4 h-4 mr-1" />
        <span>Report this listing</span>
      </div>
    </div>
  );
};

export default BookingCard;
