const Auth_Url = process.env.NEXT_PUBLIC_AUTH_API_URL;

export const resetPasswordApi = async ({ resetToken, password }) => {
  const res = await fetch(`${Auth_Url}/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resetToken, password }),
  });

  const data = await res.json();

  if (!res.ok) throw new Error(data.message || data.error || 'Failed to reset password');

  return data;
};