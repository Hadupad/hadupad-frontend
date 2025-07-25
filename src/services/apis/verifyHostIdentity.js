// services/apis/hostVerificationApi.js
const Auth_Url = process.env.NEXT_PUBLIC_AUTH_API_URL;

export const verifyHostIdentity = async ({ userId, identificationNumber }) => {
  try {
    const res = await fetch(`${Auth_Url}/host-verification/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identificationNumber }),
    });

    const data = await res.json();
    console.log('Server Response:', { status: res.status, data });

    if (!res.ok) {
      throw new Error(data.error || `Host verification failed: ${res.status}`);
    }
    return data;
  } catch (error) {
    console.error('Host Verification API Error:', error);
    throw error;
  }
};