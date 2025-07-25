const Auth_Url = process.env.NEXT_PUBLIC_AUTH_API_URL;

export const InitiateUser = async (credentials) => {
  const res = await fetch(`${Auth_Url}/register/initiate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.error || 'Registration failed');
  return data;
};