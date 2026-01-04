const Auth_Url = process.env.NEXT_PUBLIC_AUTH_API_URL;

export const fetchUserProfile = async () => {
  const accessToken = localStorage.getItem('accessToken');
  
  if (!accessToken) {
    console.error('No access token found in localStorage');
    throw new Error('No access token found');
  }

  try {
    console.log('Fetching user profile from:', `${Auth_Url}/me`);
    console.time('fetchUserProfile');

    const res = await fetch(`${Auth_Url}/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    console.timeEnd('fetchUserProfile');

    const data = await res.json();

    if (!res.ok) {
      console.error('Fetch failed with status:', res.status, 'Error:', data.error);
      throw new Error(data.error || `Failed to fetch user profile (Status: ${res.status})`);
    }

    console.log('User profile retrieved successfully:', data.user);
    return data.user;
  } catch (error) {
    console.error('Error in fetchUserProfile:', error.message);
    throw error;
  }
};
