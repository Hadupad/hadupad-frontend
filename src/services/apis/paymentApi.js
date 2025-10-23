const PAYMENT_API_URL = process.env.NEXT_PUBLIC_PAYMENT_API_URL;

export const initiateBookingPayment = async (bookingId, paymentMethod) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) throw new Error('No access token found. Please log in.');

  const res = await fetch(`${PAYMENT_API_URL}/initiate-booking`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      bookingId,
      paymentMethod,
    }),
    cache: 'no-store',
  });

  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.error || responseData.message || 'Failed to initiate payment');
  }

  return responseData;
};