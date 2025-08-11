"use client";

import { useBookings } from "../../../../hooks/useBookings";

import Sidebar from "../../../../components/guest/Sidebar";
import Navbar from "../../../../components/guest/Navbar";
import SubHeader from "../../../../components/bookings/SubHeader";
import BookingFilter from "../../../../components/bookings/BookingFilter";
import BookingCard from "../../../../components/bookings/BookingCard";

const Booking = () => {
  const { bookings, filter, setFilter, search, setSearch } = useBookings();

  return (
    <div className="min-h-screen bg-white-50">
      {/* Top navigation bar */}
      <Navbar />

      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <main className="ml-56 p-6 space-y-6">
        <SubHeader />
        <BookingFilter
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {bookings.length > 0 ? (
            bookings.map((booking) => (
              <BookingCard key={booking.id} booking={booking} />
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500 mt-8">
              No bookings found.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Booking;
