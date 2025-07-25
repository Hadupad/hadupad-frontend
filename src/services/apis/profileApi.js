const Auth_Url = process.env.NEXT_PUBLIC_AUTH_API_URL;

export const fetchUserProfile = async () => {
  const accessToken = localStorage.getItem('accessToken');
  
  if (!accessToken) {
    throw new Error('No access token found');
  }

  const res = await fetch(`${Auth_Url}/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || 'Failed to fetch user profile');

//   console.log('User profile retrieved successfully:', data);
  return data.user; // Return only the user object
};