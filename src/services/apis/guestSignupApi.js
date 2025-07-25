const Auth_Url = process.env.NEXT_PUBLIC_AUTH_API_URL;

export const guestUserSignup = async (credentials) => {
  const res = await fetch(`${Auth_Url}/register/complete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || 'Registration failed');
  return data;
};