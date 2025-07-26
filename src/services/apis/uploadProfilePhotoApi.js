const Auth_Url = process.env.NEXT_PUBLIC_AUTH_API_URL;

export const uploadProfilePhotoApi = async ({ userId, formData }) => {
    try {
      const res = await fetch(`${Auth_Url}/profile-picture/${userId}`, {
        method: 'PUT',
        body: formData,
      });
  
      const data = await res.json();
      console.log('Server Response:', { status: res.status, data });
  
      if (!res.ok) {
        throw new Error(data.error || `Profile photo upload failed: ${res.status}`);
      }
      return data;
    } catch (error) {
      console.error('Upload API Error:', error);
      throw error;
    }
  };