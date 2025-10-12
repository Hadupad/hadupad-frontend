"use client";

import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Image from "next/image";

export default function BookingCalendar() {
  const [dateRange, setDateRange] = useState([new Date(), new Date()]);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 z-10">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/host/calendar-bg.jpg"
          alt="Booking Background"
          fill
          className="object-cover opacity-30"
          priority
        />
      </div>

      {/* Calendar Content */}
      <div className="relative p-4 lg:p-4">
        <div className="bg-white rounded-xl p-4 lg:p-4 shadow-sm border border-gray-100">
          <div className="text-left mb-4">
            <h2 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">
              Bookings Timeline
            </h2>
            <div className="text-sm text-gray-600">
              ← March 2025 - April 2025 →
            </div>
          </div>

          <div className="calendar-container overflow-hidden">
            <Calendar
              locale="en-US"
              onChange={setDateRange}
              value={dateRange}
              selectRange={true}
              showDoubleView={isDesktop}
              className="w-full border-none text-sm"
            />
          </div>

          <style jsx global>{`
            .react-calendar {
              font-size: 0.875rem !important;
              width: 100% !important;
              max-width: 100% !important;
              background: transparent !important;
              border: none !important;
            }
            .react-calendar__tile {
              height: 2.5rem !important;
              font-size: 0.875rem !important;
              padding: 0.5rem !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              background: transparent !important;
              border: none !important;
              color: #374151 !important;
              font-weight: 500 !important;
            }
            .react-calendar__tile:hover {
              background-color: #f3f4f6 !important;
              border-radius: 0.375rem !important;
            }
            .react-calendar__tile--active {
              background-color: #ef4444 !important;
              color: white !important;
              border-radius: 0.375rem !important;
            }
            .react-calendar__month-view__weekdays {
              font-size: 0.75rem !important;
              font-weight: 600 !important;
              color: #6b7280 !important;
            }
            .react-calendar__month-view__weekdays__weekday {
              padding: 0.75rem 0.5rem !important;
              text-align: center !important;
              text-transform: capitalize !important;
            }
            .react-calendar__navigation {
              height: 3rem !important;
              margin-bottom: 1rem !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
            }
            .react-calendar__navigation button {
              font-size: 1rem !important;
              padding: 0.5rem !important;
              background: transparent !important;
              border: none !important;
              color: #374151 !important;
              font-weight: 600 !important;
            }
            .react-calendar__navigation button:hover {
              background-color: #f3f4f6 !important;
              border-radius: 0.375rem !important;
            }
            .react-calendar__navigation__label {
              font-weight: 600 !important;
              font-size: 1.125rem !important;
            }
            .react-calendar__month-view__days {
              gap: 0 !important;
            }
            .react-calendar__viewContainer {
              width: 100% !important;
            }
            .react-calendar__month-view {
              width: 100% !important;
            }
            @media (min-width: 1024px) {
              .react-calendar__tile {
                height: 2rem !important;
                font-size: 0.75rem !important;
              }
              .react-calendar__month-view__weekdays {
                font-size: 0.65rem !important;
              }
              .react-calendar__navigation {
                height: 2.25rem !important;
              }
              .react-calendar__navigation button {
                font-size: 0.875rem !important;
              }
              .react-calendar__navigation__label {
                font-size: 1rem !important;
              }
            }
          `}</style>

          {/* Legend */}
          <div className="flex gap-4 mt-6 items-center justify-start text-sm flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
              <span className="text-gray-700 font-medium">Check-In Dates</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gray-300 rounded-sm"></div>
              <span className="text-gray-700 font-medium">Booking Timelines Indicator</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
