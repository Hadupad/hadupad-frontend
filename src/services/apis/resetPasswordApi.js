const Auth_Url = process.env.NEXT_PUBLIC_AUTH_API_URL;

export const resetPasswordApi = async ({ token, newPassword }) => {
  const res = await fetch(`${Auth_Url}/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, newPassword }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || data.error || 'Failed to reset password');

  return data;
};