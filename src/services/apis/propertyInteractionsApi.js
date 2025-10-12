const PropertyInteraction_Url = process.env.NEXT_PUBLIC_CREATE_PROPERTY_INTERACTION_API_URL;

const getAuthToken = () => {
  const token = localStorage.getItem('accessToken') || process.env.NEXT_PUBLIC_AUTH_TOKEN || '';
  if (!token) {
    console.warn('No auth token found in localStorage or environment');
    return '';
  }
  // Basic JWT format validation (should have 3 parts: header.payload.signature)
  if (token.split('.').length !== 3) {
    console.warn('Invalid JWT format:', token);
    return '';
  }
  console.log('Using auth token:', token);
  return token;
};

export const submitReview = async (propertyId, review) => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Not authorized, please log in');
  }

  const response = await fetch(
    `${PropertyInteraction_Url}${propertyId}/review`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(review),
    }
  );

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || 'Failed to submit review');
  }

  return responseData;
};

export const likeProperty = async (propertyId) => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Not authorized, please log in');
  }

  const response = await fetch(
    `${PropertyInteraction_Url}${propertyId}/like`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || 'Failed to like property');
  }

  return responseData;
};