import { useEffect, useState, useCallback } from "react";
import { fetchUserBookings } from "../src/services/apis/adminBookingApi";

export default function useReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReservations = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetchUserBookings();
      setReservations(response.bookings || []);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch reservations:", error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReservations();
  }, [fetchReservations]);

  return { reservations, loading, error, refetch: fetchReservations };
}