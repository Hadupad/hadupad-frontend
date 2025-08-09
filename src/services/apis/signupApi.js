
const Auth_Url = process.env.NEXT_PUBLIC_AUTH_API_URL;

export const signupUser = async (credentials) => {
  const res = await fetch(`${Auth_Url}/register/complete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || 'Registration failed');

  // Save token to localStorage
  localStorage.setItem('accessToken', data.token);
  // Note: No refreshToken in signup response; add if backend provides it
  // localStorage.setItem('refreshToken', data.refreshToken || '');

  return data;
};