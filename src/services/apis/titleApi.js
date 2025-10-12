const Property_Url = process.env.NEXT_PUBLIC_CREATE_PROPERTY_API_URL;

export const updateTitle = async (propertyId, data) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) throw new Error('No access token found. Please log in.');

  const res = await fetch(`${Property_Url}${propertyId}/title-description`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  const responseData = await res.json();

  if (!res.ok) {
    throw new Error(responseData.message || 'Failed to update title and description');
  }

  return responseData;
};
