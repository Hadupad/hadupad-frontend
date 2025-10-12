const BOOKING_API_URL = process.env.NEXT_PUBLIC_BOOKING_API_URL;

export const fetchUserBookings = async () => {
  let accessToken = localStorage.getItem('accessToken');
  if (!accessToken) throw new Error('No access token found. Please log in.');

  let res = await fetch(`${BOOKING_API_URL}bookings/guest/me`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (res.status === 401) {
    try {
      accessToken = await refreshToken();
      res = await fetch(`${BOOKING_API_URL}bookings/guest/me`, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
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
    throw new Error(responseData.message || `Failed to fetch bookings (Status: ${res.status})`);
  }

  return responseData;
};

export const cancelBooking = async (id, reason) => {
  let accessToken = localStorage.getItem('accessToken');
  if (!accessToken) throw new Error('No access token found. Please log in.');

  let res = await fetch(`${BOOKING_API_URL}bookings/${id}/cancel`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ reason }),
  });

  if (res.status === 401) {
    try {
      accessToken = await refreshToken();
      res = await fetch(`${BOOKING_API_URL}bookings/${id}/cancel`, {
        method: 'PUT',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ reason }),
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
    if (res.status === 400) {
      throw new Error(responseData.message || 'Cannot cancel the booking');
    } else if (res.status === 403) {
      throw new Error(responseData.message || 'Not authorized to cancel this booking');
    }
    throw new Error(responseData.message || `Failed to cancel booking (Status: ${res.status})`);
  }

  return responseData;
};

export const acceptBooking = async (id) => {
  let accessToken = localStorage.getItem('accessToken');
  if (!accessToken) throw new Error('No access token found. Please log in.');

  let res = await fetch(`${BOOKING_API_URL}bookings/${id}/confirm`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (res.status === 401) {
    try {
      accessToken = await refreshToken();
      res = await fetch(`${BOOKING_API_URL}bookings/${id}/confirm`, {
        method: 'PUT',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
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
    if (res.status === 400) {
      throw new Error(responseData.message || 'Cannot accept the booking');
    } else if (res.status === 403) {
      throw new Error(responseData.message || 'Not authorized to accept this booking');
    }
    throw new Error(responseData.message || `Failed to accept booking (Status: ${res.status})`);
  }

  return responseData;
};

export const rejectBooking = async (id, reason) => {
  let accessToken = localStorage.getItem('accessToken');
  if (!accessToken) throw new Error('No access token found. Please log in.');

  let res = await fetch(`${BOOKING_API_URL}bookings/${id}/reject`, {
    method: 'PUT',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ reason }),
  });

  if (res.status === 401) {
    try {
      accessToken = await refreshToken();
      res = await fetch(`${BOOKING_API_URL}bookings/${id}/reject`, {
        method: 'PUT',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ reason }),
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
    if (res.status === 400) {
      throw new Error(responseData.message || 'Cannot reject the booking');
    } else if (res.status === 403) {
      throw new Error(responseData.message || 'Not authorized to reject this booking');
    }
    throw new Error(responseData.message || `Failed to reject booking (Status: ${res.status})`);
  }

  return responseData;
};