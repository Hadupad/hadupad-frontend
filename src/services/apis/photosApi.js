const Property_Url = process.env.NEXT_PUBLIC_CREATE_PROPERTY_API_URL;

export const uploadPhotos = async (propertyId, data) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) throw new Error('No access token found. Please log in.');

  const res = await fetch(`${Property_Url}${propertyId}/photos`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
    body: data,
  });

  const responseData = await res.json();

  if (!res.ok) throw new Error(responseData.error || 'Failed to upload photos');

  return responseData;
};