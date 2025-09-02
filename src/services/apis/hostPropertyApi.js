const Property_Url = process.env.NEXT_PUBLIC_CREATE_PROPERTY_API_URL;

export const fetchHostProperties = async () => {
  const accessToken = localStorage.getItem('accessToken');
  
  if (!accessToken) {
    throw new Error('No access token found');
  }

  const res = await fetch(`${Property_Url}host`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || 'Failed to fetch host properties');

  return data.properties; 
};