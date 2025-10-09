const PropertyInteraction_Url = process.env.NEXT_PUBLIC_CREATE_PROPERTY_INTERACTION_API_URL;

const getAuthToken = () => {
  const token = localStorage.getItem('accessToken') || process.env.NEXT_PUBLIC_AUTH_TOKEN || '';
  if (!token) {
    console.warn('No auth token found in localStorage or environment');
    return '';
  }
  // Basic JWT format validation
  if (token.split('.').length !== 3) {
    console.warn('Invalid JWT format:', token);
    return '';
  }
//   console.log('Using auth token:', token.substring(0, 10) + '...');
  return token;
};

export const fetchWishlist = async () => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('Not authorized, please log in');
  }

//   console.log('Fetching wishlist from:', `${PropertyInteraction_Url}liked`);
  const response = await fetch(`${PropertyInteraction_Url}liked`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const responseData = await response.json();
//   console.log('Raw API response:', responseData);

  if (!response.ok) {
    console.error('API error:', responseData.message);
    throw new Error(responseData.message || 'Failed to fetch wishlist');
  }

  return (responseData.properties || []).map((property) => ({
    id: property.id,
    city: property.city || 'Unknown City',
    country: property.country || 'Unknown Country',
    photos: property.photos && property.photos.length > 0 ? property.photos : ['/images/hero/hero.jpg'],
    rating: property.rating || 0,
    bedCount: property.bedCount || 0,
    bathroomCount: property.bathroomCount || 0,
    pricePerNight: parseFloat(property.pricePerNight) || 0,
    userLiked: property.interactions?.userLiked || true,
    title: property.title || 'Unnamed Property',
  }));
};