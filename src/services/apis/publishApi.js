const Property_Url = process.env.NEXT_PUBLIC_CREATE_PROPERTY_API_URL;

export const nextAction = async (propertyId) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) throw new Error('No access token found. Please log in.');

  const res = await fetch(`${Property_Url}${propertyId}/next-action`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ nextAction: 'publish' }),
  });

  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.error || responseData.message || 'Failed to perform next action');
  }

  return responseData;
};

export const publishProperty = async (propertyId) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) throw new Error('No access token found. Please log in.');

  const res = await fetch(`${Property_Url}${propertyId}/publish`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ isPublished: true }),
  });

  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.error || responseData.message || 'Failed to publish property');
  }

  return responseData;
};