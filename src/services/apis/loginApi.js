const Auth_Url = process.env.NEXT_PUBLIC_AUTH_API_URL;

export const userLogin = async (credentials) => {
  const res = await fetch(`${Auth_Url}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || 'Login failed');

  // console.log('Login successful, returned data:', data);

  // Save tokens to localStorage
  localStorage.setItem('accessToken', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);

  return data;
};