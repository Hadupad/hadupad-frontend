import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBookingsAsync } from '@/redux/slices/userBookingsSlice';

export const useBookings = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.userBookings);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchUserBookingsAsync());
  }, [dispatch]);

  const formattedBookings = bookings.map((booking) => ({
    id: booking.id,
    image: booking.property.photos[0] || '/images/properties/default.png',
    title: booking.property.title,
    location: `${booking.property.city}, ${booking.property.state}`,
    price: new Intl.NumberFormat('en-NG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(parseFloat(booking.totalAmount)),
    date: new Date(booking.checkInDate).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }),
    code: booking.bookingCode,
    status: booking.paymentStatus === 'paid' ? 'Paid' :
            booking.paymentStatus === 'pending_gateway' ? 'Pending' :
            booking.status.charAt(0).toUpperCase() + booking.status.slice(1),
    propertyId: booking.property.id,
    host: {
      id: booking.host.id,
      name: `${booking.host.firstName} ${booking.host.lastName}`,
      profilePicture: booking.host.profilePicture || '/images/default-avatar.png',
      email: booking.host.email,
    },
  }));

  // Filter bookings based on status and search query
  const filteredBookings = formattedBookings.filter((b) => {
    const matchesFilter = filter === 'All' || b.status === filter;
    const searchLower = search.toLowerCase();
    const matchesSearch =
      b.title.toLowerCase().includes(searchLower) ||
      b.location.toLowerCase().includes(searchLower) ||
      b.code.toLowerCase().includes(searchLower);
    return matchesFilter && matchesSearch;
  });

  return {
    bookings: filteredBookings,
    filter,
    setFilter,
    search,
    setSearch,
    loading,
    error,
    refetch: () => dispatch(fetchUserBookingsAsync()), // Add refetch for use in BookingCard
  };
};