const PropertyInteraction_Url = process.env.NEXT_PUBLIC_CREATE_PROPERTY_INTERACTION_API_URL;

export const searchProperties = async (searchParams) => {
  // Build query string from search parameters
  const query = new URLSearchParams();
  if (searchParams.query) query.append('query', searchParams.query);
  if (searchParams.priceMin) query.append('priceMin', searchParams.priceMin);
  if (searchParams.priceMax) query.append('priceMax', searchParams.priceMax);
  if (searchParams.minBedrooms) query.append('minBedrooms', searchParams.minBedrooms);
  if (searchParams.maxGuests) query.append('maxGuests', searchParams.maxGuests);
  if (searchParams.minBathrooms) query.append('minBathrooms', searchParams.minBathrooms);
  if (searchParams.amenities) query.append('amenities', searchParams.amenities);
  if (searchParams.page) query.append('page', searchParams.page);
  if (searchParams.limit) query.append('limit', searchParams.limit);

  const response = await fetch(`${PropertyInteraction_Url}search?${query.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(responseData.message || 'Failed to fetch search results');
  }

  return responseData;
};