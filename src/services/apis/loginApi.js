const Auth_Url = process.env.NEXT_PUBLIC_AUTH_API_URL;

// Utility to decode JWT and check expiration
const decodeToken = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const isTokenExpired = (token) => {
  const decoded = decodeToken(token);
  if (!decoded) return true;
  return decoded.exp * 1000 < Date.now();
};

// Login function
export const userLogin = async (credentials) => {
  try {
    const res = await fetch(`${Auth_Url}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || 'Login failed');
    }

    // Save tokens to localStorage
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    return data;
  } catch (error) {
    console.error('Login error:', error.message);
    throw error;
  }
};

// Refresh token function
export const refreshAccessToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    if (isTokenExpired(refreshToken)) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login'; // Adjust to your login route
      throw new Error('Refresh token expired. Please log in again.');
    }

    const res = await fetch(`${Auth_Url}/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    const data = await res.json();

    if (!res.ok) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      throw new Error(data.error || 'Failed to refresh token');
    }

    // Update tokens in localStorage
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);

    return data.accessToken;
  } catch (error) {
    console.error('Refresh token error:', error.message);
    throw error;
  }
};

// Utility for authenticated API calls with automatic token refresh
export const apiCallWithToken = async (url, options = {}) => {
  try {
    let accessToken = localStorage.getItem('accessToken');

    if (!accessToken || isTokenExpired(accessToken)) {
      accessToken = await refreshAccessToken();
    }

    const res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok && res.status === 401) {
      // Retry with a new access token
      accessToken = await refreshAccessToken();
      const retryRes = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });
      return retryRes.json();
    }

    return res.json();
  } catch (error) {
    console.error('API call error:', error.message);
    if (error.message.includes('Refresh token expired')) {
      // Redirect to login page
      window.location.href = '/'; 
    }
    throw error;
  }
};

// Example: Fetch conversations
export const fetchConversations = async () => {
  try {
    const data = await apiCallWithToken(`${Auth_Url}/conversations`);
    return data;
  } catch (error) {
    console.error('Failed to fetch conversations:', error.message);
    throw error;
  }
};

// Logout function
export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  window.location.href = '/login'; // Adjust to your login route
};

// Check token validity on app load
export const checkAuthStatus = () => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken || isTokenExpired(refreshToken)) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    return false;
  }
  return true;
};