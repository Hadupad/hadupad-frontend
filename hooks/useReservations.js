import { useEffect, useState } from 'react';

export default function useReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const data = [
        {
          id: 1,
          listingName: 'Home away from home',
          guestName: 'John Doe',
          price: 350000,
          nights: 3,
          date: '2025-08-10',
          status: 'upcoming',
        },
        {
          id: 2,
          listingName: 'Lakeside Retreat',
          guestName: 'Jane Smith',
          price: 280000,
          nights: 2,
          date: '2025-07-15',
          status: 'completed',
        },
        {
          id: 3,
          listingName: 'City Apartment',
          guestName: 'Bob Brown',
          price: 500000,
          nights: 5,
          date: '2025-07-01',
          status: 'cancelled',
        },
      ];

    //   const data = [];
      setReservations(data);
      setLoading(false);
    }, 500);
  }, []);

  return { reservations, loading };
}
