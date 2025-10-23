// const Auth_Url = process.env.NEXT_PUBLIC_AUTH_API_URL;

// export const fetchUserProfile = async () => {
//   const accessToken = localStorage.getItem('accessToken');
  
//   if (!accessToken) {
//     throw new Error('No access token found');
//   }

//   const res = await fetch(`${Auth_Url}/me`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${accessToken}`,
//     },
//   });

//   const data = await res.json();

//   if (!res.ok) throw new Error(data.error || 'Failed to fetch user profile');

// //   console.log('User profile retrieved successfully:', data);
//   return data.user; // Return only the user object
// };

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

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5-second timeout

    const res = await fetch(`${Auth_Url}/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      signal: controller.signal, // Attach abort signal
    });

    clearTimeout(timeoutId); // Clear timeout if request completes
    console.timeEnd('fetchUserProfile');

    const data = await res.json();

    if (!res.ok) {
      console.error('Fetch failed with status:', res.status, 'Error:', data.error);
      throw new Error(data.error || `Failed to fetch user profile (Status: ${res.status})`);
    }

    console.log('User profile retrieved successfully:', data.user);
    return data.user; // Return only the user object
  } catch (error) {
    console.error('Error in fetchUserProfile:', error.message);
    if (error.name === 'AbortError') {
      throw new Error('Request timed out after 5 seconds');
    }
    throw error; // Rethrow to let Redux handle it
  }
};