const Auth_Url = process.env.NEXT_PUBLIC_AUTH_API_URL;

export const sendPasswordReset = async (email) => {
  const res = await fetch(`${Auth_Url}/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || data.error || 'Failed to send reset link');

  return data;
};