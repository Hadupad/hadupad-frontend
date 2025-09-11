const Property_Url = process.env.NEXT_PUBLIC_CREATE_PROPERTY_API_URL;

export const fetchProperty = async (propertyId) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) throw new Error('No access token found. Please log in.');

  const res = await fetch(`${Property_Url}${propertyId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.error || responseData.message || 'Failed to fetch property details');
  }

  return responseData;
};

export const publishListing = async (propertyId, data) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) throw new Error('No access token found. Please log in.');

  const res = await fetch(`${Property_Url}${propertyId}/next-action`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
    cache: 'no-store',
  });

  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.error || responseData.message || 'Failed to publish listing');
  }

  return responseData;
};