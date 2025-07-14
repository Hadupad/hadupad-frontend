// src/apis/loginApi.js
const BASE_URL = process.env.NEXT_PUBLIC_AUTH_API_URL;
export const loginUser = async (credentials) => {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
  
    if (!res.ok) throw new Error('Login failed');
    return await res.json();
  };
  