import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserBookingsAsync } from '@/redux/slices/userBookingsSlice';

export const useBookings = () => {
  const dispatch = useDispatch();
  const { bookings, loading, error } = useSelector((state) => state.userBookings);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Fetch bookings when the hook is used
    dispatch(fetchUserBookingsAsync());
  }, [dispatch]);

  // Map API bookings to match the expected structure for the UI
  const formattedBookings = bookings.map((booking) => ({
    id: booking.id,
    image: booking.property.photos[0] || '/images/properties/default.png', // Use first photo or fallback
    title: booking.property.title,
    location: `${booking.property.city}, ${booking.property.state}`,
    price: new Intl.NumberFormat('en-NG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(parseFloat(booking.totalAmount)), // Format price with commas
    date: new Date(booking.checkInDate).toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }), // Format date
    code: booking.bookingCode,
    status: booking.status.charAt(0).toUpperCase() + booking.status.slice(1), // Capitalize status
    propertyId: booking.property.id, // Add propertyId for redirect
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
  };
};