"use client"

// import { useBookings } from '../../../../hooks/useBookings';
import SubHeader from '../../../../components/messages/SubHeader';
import BookingFilter from '../../../../components/bookings/BookingFilter';
import BookingCard from '../../../../components/bookings/BookingCard';

const Message = () => {
  const { bookings, filter, setFilter, search, setSearch } = useBookings();

  return (
    <div className="max-w-7xl mx-auto px-4 py-50 py-8">
      <SubHeader />
      <BookingFilter filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {bookings.length > 0 ? (
          bookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
        ) : (
          <p className="text-center col-span-full text-gray-500 mt-8">No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default Message;
