const Property_Url = process.env.NEXT_PUBLIC_CREATE_PROPERTY_API_URL;

export const fetchPublicPropertiesApi = async () => {
  const res = await fetch(`${Property_Url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const responseData = await res.json();

  if (!res.ok) throw new Error(responseData.error || 'Failed to fetch public properties');

  return responseData.properties.map((prop) => ({
    id: prop.id,
    name: prop.title,
    images: prop.photos,
    location: `${prop.city}, ${prop.state}, ${prop.country}`,
    rating: prop.interactions?.ratingCount || 0,
    averageRating: prop.interactions?.averageRating || 0,
    reviews: prop.interactions?.reviews || [],
    beds: prop.bedCount,
    baths: prop.bathroomCount,
    bedrooms: prop.bedroomCount,
    price: parseFloat(prop.pricePerNight) || 0,
    description: prop.description,
    amenities: prop.amenities || [],
    placeType: prop.placeType,
    guestAccommodationType: prop.guestAccommodationType,
    streetAddress: prop.streetAddress,
    aptSuiteNumber: prop.aptSuiteNumber,
    city: prop.city,
    state: prop.state,
    country: prop.country,
    zipCode: prop.zipCode,
    maxGuestCount: prop.maxGuestCount,
    serviceFee: parseFloat(prop.serviceFee) || 0,
    cleaningFee: parseFloat(prop.cleaningFee) || 0,
    cautionFee: parseFloat(prop.cautionFee) || 0,
    discountPercent: prop.discountPercent || 0,
    isPublished: prop.isPublished || false,
    isCalendarSetup: prop.isCalendarSetup || false,
    currentStep: prop.currentStep || 0,
    completionPercentage: prop.completionPercentage || 0,
    createdAt: prop.createdAt || null,
    updatedAt: prop.updatedAt || null,
    host: {
      name: `${prop.host?.firstName || ''} ${prop.host?.lastName || ''}`.trim() || 'Unknown Host',
      profilePicture: prop.host?.profilePicture,
      id: prop.host?.id,
      phoneNumber: prop.host?.phoneNumber,
      isVerified: prop.host?.isVerified || false,
      userType: prop.host?.userType || 'host',
    },
    instantBookingEnabled: prop.instantBookingEnabled || false,
    approveBookingEnabled: prop.approveBookingEnabled || false,
    bookingType: prop.bookingType,
    unavailableDates: prop.unavailableDates || [],
    availability: prop.availability || { isAvailableNow: false, nextAvailableDate: null },
  }));
};

export const fetchPublicPropertyByIdApi = async (propertyId) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_CREATE_PROPERTY_API_URL}${propertyId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const responseData = await res.json();

  if (!res.ok) throw new Error(responseData.error || 'Failed to fetch property details');

  const prop = responseData.property;
  const mappedProperty = {
    id: prop.id,
    name: prop.title,
    images: prop.photos,
    location: `${prop.city}, ${prop.state}, ${prop.country}`,
    rating: prop.interactions?.ratingCount || 0,
    averageRating: prop.interactions?.averageRating || 0,
    reviews: prop.interactions?.reviews || [],
    beds: prop.bedCount,
    baths: prop.bathroomCount,
    bedrooms: prop.bedroomCount,
    price: parseFloat(prop.pricePerNight) || 0,
    description: prop.description,
    amenities: prop.amenities || [],
    placeType: prop.placeType,
    guestAccommodationType: prop.guestAccommodationType,
    streetAddress: prop.streetAddress,
    aptSuiteNumber: prop.aptSuiteNumber,
    city: prop.city,
    state: prop.state,
    country: prop.country,
    zipCode: prop.zipCode,
    maxGuestCount: prop.maxGuestCount,
    serviceFee: parseFloat(prop.serviceFee) || 0,
    cleaningFee: parseFloat(prop.cleaningFee) || 0,
    cautionFee: parseFloat(prop.cautionFee) || 0,
    discountPercent: prop.discountPercent || 0,
    isPublished: prop.isPublished || false,
    isCalendarSetup: prop.isCalendarSetup || false,
    currentStep: prop.currentStep || 0,
    completionPercentage: prop.completionPercentage || 0,
    createdAt: prop.createdAt || null,
    updatedAt: prop.updatedAt || null,
    host: {
      name: `${prop.host?.firstName || ''} ${prop.host?.lastName || ''}`.trim() || 'Unknown Host',
      profilePicture: prop.host?.profilePicture,
      id: prop.host?.id,
      phoneNumber: prop.host?.phoneNumber,
      isVerified: prop.host?.isVerified || false,
      userType: prop.host?.userType || 'host',
    },
    instantBookingEnabled: prop.instantBookingEnabled || false,
    approveBookingEnabled: prop.approveBookingEnabled || false,
    bookingType: prop.bookingType,
    unavailableDates: prop.unavailableDates || [],
    availability: prop.availability || { isAvailableNow: false, nextAvailableDate: null },
  };

  return mappedProperty;
};