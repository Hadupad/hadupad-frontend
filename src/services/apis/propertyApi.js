const Property_Url = process.env.NEXT_PUBLIC_CREATE_PROPERTY_API_URL;

export const createProperty = async (data) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) throw new Error('No access token found. Please log in.');

  const res = await fetch( `${Property_Url}place-type`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  const responseData = await res.json();

  if (!res.ok) throw new Error(responseData.error || 'Property creation failed');

  return responseData; // Return the full response, including property object
};

// const Property_Url = process.env.NEXT_PUBLIC_CREATE_PROPERTY_API_URL;

// export const createProperty = async (data) => {
//   const accessToken = localStorage.getItem('accessToken');
//   if (!accessToken) throw new Error('No access token found. Please log in.');

//   const res = await fetch(`${Property_Url}place-type`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${accessToken}`,
//     },
//     body: JSON.stringify(data),
//   });

//   const responseData = await res.json();

//   if (!res.ok) throw new Error(responseData.error || 'Property creation failed');

//   // Save propertyId to localStorage
//   if (responseData.property && responseData.property.id) {
//     localStorage.setItem('propertyId', responseData.property.id);
//   }

//   return responseData; // Return the full response, including property object
// };