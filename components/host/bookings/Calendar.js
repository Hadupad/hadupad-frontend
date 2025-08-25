"use client";

import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Settings from "./Settings";

export default function BookingCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 2, 1)); // March 2025

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  const getMonthData = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add previous month's trailing days
    const prevMonth = new Date(year, month - 1, 0);
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonth.getDate() - i,
        isCurrentMonth: false,
        isPrevMonth: true
      });
    }

    // Add current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        isCurrentMonth: true,
        isPrevMonth: false
      });
    }

    // Add next month's leading days to fill the grid
    const remainingCells = 42 - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        isPrevMonth: false
      });
    }

    return days;
  };

  const renderMonth = (monthOffset) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + monthOffset, 1);
    const year = date.getFullYear();
    const month = date.getMonth();
    const monthName = months[month];
    const days = getMonthData(year, month);

    return (
      <div key={monthOffset} className="flex-1">
        {/* Month header - only show on desktop for multi-month view */}
        <div className="hidden lg:block text-center font-medium text-gray-900 mb-4">
          {monthName} {year}
        </div>
        
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {daysOfWeek.map(day => (
            <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {days.map((dayObj, index) => (
            <div
              key={index}
              className={`
                h-8 w-8 lg:h-8 lg:w-8 flex items-center justify-center text-sm cursor-pointer rounded mx-auto
                ${
                  dayObj.isCurrentMonth
                    ? "text-gray-900 hover:bg-gray-100"
                    : "text-gray-400"
                }
              `}
            >
              {dayObj.day}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  return (
    <div className="flex flex-col lg:flex-row w-full gap-4 p-4 lg:p-6">
      {/* Booking Timeline */}
      <div className="w-full lg:w-3/4 bg-white lg:pr-4">
        <div className="flex items-center justify-between mb-4 lg:mb-6 lg:mt-8 px-2 lg:px-5">
          <h2 className="text-base lg:text-lg font-semibold">Bookings Timeline</h2>
          <div className="flex items-center gap-2">
            {/* Settings icon for mobile */}
            <button className="lg:hidden p-1 hover:bg-gray-100 rounded">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
            
            <button
              onClick={() => navigateMonth(-1)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronLeftIcon className="h-4 w-4 lg:h-5 lg:w-5" />
            </button>
            <span className="text-xs lg:text-sm text-gray-600 mx-1 lg:mx-2">
              {/* Mobile: Show single month */}
              <span className="lg:hidden">
                {months[currentDate.getMonth()]} {currentDate.getFullYear()}
              </span>
              {/* Desktop: Show month range */}
              <span className="hidden lg:inline">
                {months[currentDate.getMonth()]} {currentDate.getFullYear()} - {months[(currentDate.getMonth() + 2) % 12]} {currentDate.getMonth() + 2 >= 12 ? currentDate.getFullYear() + 1 : currentDate.getFullYear()}
              </span>
            </span>
            <button
              onClick={() => navigateMonth(1)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <ChevronRightIcon className="h-4 w-4 lg:h-5 lg:w-5" />
            </button>
          </div>
        </div>
        
        {/* Calendar grid - Single month on mobile, three months on desktop */}
        <div className="px-2 lg:px-0">
          {/* Mobile: Single month */}
          <div className="lg:hidden">
            {renderMonth(0)}
          </div>
          
          {/* Desktop: Three months */}
          <div className="hidden lg:flex gap-6">
            {renderMonth(0)}
            {renderMonth(1)}
            {renderMonth(2)}
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex gap-4 lg:gap-6 mt-6 lg:mt-8 items-center justify-center lg:justify-end text-xs text-gray-700 px-2 lg:px-0">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#EF4F24] rounded"></div>
            <span>Check-In Dates</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-gray-300 rounded"></div>
            <span className="hidden sm:inline">Booking Timelines Indicator</span>
            <span className="sm:hidden">Booking Timeline</span>
          </div>
        </div>
      </div>

      {/* Settings Panel - Hidden on mobile, shown on desktop */}
      <div className="hidden lg:block lg:w-1/4 lg:ml-2">
        <Settings />
      </div>
    </div>
  );
}
