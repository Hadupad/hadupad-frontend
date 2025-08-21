"use client";

import { useBookings } from "../../../../hooks/useBookings";

import Navbar from "../../../../components/NavBar";
import SubHeader from "../../../../components/bookings/SubHeader";
import BookingFilter from "../../../../components/bookings/BookingFilter";
import BookingCard from "../../../../components/bookings/BookingCard";

const Booking = () => {
  const { bookings, filter, setFilter, search, setSearch } = useBookings();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="py-[50px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <SubHeader />
          <BookingFilter
            filter={filter}
            setFilter={setFilter}
            search={search}
            setSearch={setSearch}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
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
        </div>
      </main>
    </div>
  );
};

export default Booking;
