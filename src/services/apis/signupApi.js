// src/apis/signupApi.js

export const signupUser = async (data) => {
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  
    if (!res.ok) throw new Error('Signup failed');
    return await res.json();
  };
  