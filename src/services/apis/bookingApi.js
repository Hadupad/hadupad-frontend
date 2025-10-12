const BOOKING_API_URL = process.env.NEXT_PUBLIC_BOOKING_API_URL;

export const createBooking = async (propertyId, bookingData) => {
  let accessToken = localStorage.getItem('accessToken');
  if (!accessToken) throw new Error('No access token found. Please log in.');

  const payload = {
    propertyId,
    ...bookingData,
  };

  let res = await fetch(`${BOOKING_API_URL}bookings`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(payload),
  });

  if (res.status === 401) {
    // Token is invalid or expired, try refreshing
    try {
      accessToken = await refreshToken();
      // Retry the request with the new token
      res = await fetch(`${BOOKING_API_URL}bookings`, {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });
    } catch (refreshError) {
      throw new Error('Unable to refresh token. Please log in again.');
    }
  }

  let responseData;
  try {
    responseData = await res.json();
  } catch (error) {
    const responseText = await res.text();
    console.error('Non-JSON response:', responseText);
    throw new Error(`Server returned non-JSON response: ${responseText}`);
  }

  if (!res.ok) {
    console.error('API error response:', responseData);
    throw new Error(responseData.message || `Failed to create booking (Status: ${res.status})`);
  }

  return responseData;
};