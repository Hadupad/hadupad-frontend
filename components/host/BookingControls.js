"use client";

import { CalendarCheck, Zap } from "lucide-react";

export default function BookingControls() {
  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Check-in Booking */}
      <div className="bg-white rounded-xl p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Check-in Booking</h3>
        <button className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-xs font-semibold transition-colors duration-200">
          <CalendarCheck className="w-4 h-4" />
          CHECK-IN
        </button>
      </div>

      {/* Instant Booking */}
      <div className="bg-white rounded-xl p-4">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Instant Booking</h3>
        <button className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full text-xs font-semibold transition-colors duration-200">
          <Zap className="w-4 h-4" />
          TURN OFF
        </button>
      </div>
    </div>
  );
}
