// hooks/useBookings.js
import { useState } from 'react';

const initialBookings = [
  {
    id: 1,
    image: '/images/properties/1.png',
    title: 'Home away from Home',
    location: 'Jabi, Abuja',
    price: '50,000',
    date: '04 Apr 2025',
    code: '12FWKL4',
    status: 'Cancelled',
  },
  {
    id: 2,
    image: '/images/properties/1.png',
    title: 'Oceanview Apartment',
    location: 'Lekki, Lagos',
    price: '75,000',
    date: '10 May 2025',
    code: '98UJYT6',
    status: 'Paid',
  },
  {
    id: 3,
    image: '/images/properties/1.png',
    title: 'Cozy Studio',
    location: 'Wuse 2, Abuja',
    price: '30,000',
    date: '14 Mar 2025',
    code: '76NPKL2',
    status: 'Pending',
  },
];

export const useBookings = () => {
  const [bookings, setBookings] = useState(initialBookings);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  const filteredBookings = bookings.filter((b) => {
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
  };
};
