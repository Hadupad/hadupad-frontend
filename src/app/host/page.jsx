'use client';

import { useSelector } from 'react-redux';
import OverviewCards from '../../../components/host/OverviewCards';
import BookingControls from '../../../components/host/BookingControls';
import RecentPayments from '../../../components/host/RecentPayments';
import BookingCalendar from '../../../components/host/BookingCalendar';

export default function DashboardPage() {
  const { user } = useSelector((state) => state.profile);

  return (
    <div className="space-y-6">
      {/* Header Section - No card wrapper */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2 mt-10 md:mt-20">
          Welcome, {user?.firstName || 'User'}!
        </h1>
        <p className="text-gray-600">
          Guests can reserve your place 24 hours after you publish—here's how to prepare.
        </p>
      </div>

      {/* Overview Cards */}
      <OverviewCards />

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Column - Controls and Payments */}
          <div className="lg:col-span-2 space-y-6">
            <BookingControls />
            <RecentPayments />
          </div>

          {/* Right Column - Calendar */}
          <div className="lg:col-span-3">
            <BookingCalendar />
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden space-y-6">
        {/* Booking Controls */}
        <BookingControls />
        
        {/* Calendar */}
        <BookingCalendar />
      </div>
    </div>
  );
}