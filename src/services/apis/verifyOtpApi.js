const Auth_Url = process.env.NEXT_PUBLIC_AUTH_API_URL || 'https://hadupadbackend.onrender.com';

export const VerifyOtp = async ({ userId, otp }) => {
  console.log('Verify OTP URL:', `${Auth_Url}/verify-otp`);
  const res = await fetch(`${Auth_Url}/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, otp }),
  });

  const contentType = res.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error('Server did not return JSON');
  }

  const data = await res.json();

  if (!res.ok) {
    console.log('API Error:', data.error); 
    throw new Error(data.error || 'OTP verification failed');
  }
  return data;
};