// Step configuration for listing creation flow
export const LISTING_STEPS = [
  // Step 1: Property Basics
  {
    id: 'welcome',
    component: 'CreateStep1',
    title: 'Welcome to hosting',
    section: 1,
    sectionTitle: 'Tell us about your place',
    validation: () => true
  },
  {
    id: 'property-type',
    component: 'PropertyTypeSelector',
    title: 'Property Type',
    section: 1,
    validation: (data) => !!data.propertyType
  },
  {
    id: 'place-privacy',
    component: 'PlacePrivacySelector',
    title: 'Place Privacy',
    section: 1,
    validation: (data) => !!data.placePrivacy
  },
  {
    id: 'address-input',
    component: 'AddressInput',
    title: 'Address',
    section: 1,
    validation: (data) => !!data.address
  },
  {
    id: 'full-address',
    component: 'FullAddressForm',
    title: 'Full Address',
    section: 1,
    validation: (data) => !!data.fullAddress?.street
  },
  {
    id: 'map-location',
    component: 'MapWithAddress',
    title: 'Confirm Location',
    section: 1,
    validation: (data) => !!data.coordinates
  },
  {
    id: 'room-counts',
    component: 'RoomCounters',
    title: 'Room Details',
    section: 1,
    validation: (data) => data.roomCounts?.bedrooms >= 0
  },

  // Step 2: Property Details
  {
    id: 'step2-intro',
    component: 'CreateStep2',
    title: 'Make your place stand out',
    section: 2,
    sectionTitle: 'Make your place stand out',
    validation: () => true
  },
  {
    id: 'amenities',
    component: 'MoreAbout',
    title: 'Amenities',
    section: 2,
    validation: (data) => data.amenities?.length > 0
  },
  {
    id: 'photos-upload',
    component: 'HousePhotos',
    title: 'Add Photos',
    section: 2,
    validation: (data) => data.photos?.length >= 5
  },
  {
    id: 'photos-review',
    component: 'HousePhotosView',
    title: 'Review Photos',
    section: 2,
    validation: (data) => data.photos?.length >= 5
  },
  {
    id: 'title',
    component: 'Title',
    title: 'Property Title',
    section: 2,
    validation: (data) => data.title?.length >= 10
  },
  {
    id: 'description',
    component: 'Description',
    title: 'Description',
    section: 2,
    validation: (data) => data.description?.length >= 50
  },

  // Step 3: Booking & Pricing
  {
    id: 'step3-intro',
    component: 'CreateStep3',
    title: 'Finish up and publish',
    section: 3,
    sectionTitle: 'Finish up and publish',
    validation: () => true
  },
  {
    id: 'booking-settings',
    component: 'BookingSetting',
    title: 'Booking Settings',
    section: 3,
    validation: (data) => !!data.bookingSettings?.checkIn
  },
  {
    id: 'pricing',
    component: 'PriceSetting',
    title: 'Set Your Price',
    section: 3,
    validation: (data) => data.pricing?.basePrice > 0
  },
  {
    id: 'discounts',
    component: 'PriceSettingDiscounts',
    title: 'Discounts',
    section: 3,
    validation: () => true // Optional step
  },
  {
    id: 'review',
    component: 'Review',
    title: 'Review & Publish',
    section: 3,
    validation: (data) => {
      // Final validation of all required fields
      return !!(
        data.propertyType &&
        data.placePrivacy &&
        data.address &&
        data.fullAddress?.street &&
        data.coordinates &&
        data.amenities?.length > 0 &&
        data.photos?.length >= 5 &&
        data.title?.length >= 10 &&
        data.description?.length >= 50 &&
        data.bookingSettings?.checkIn &&
        data.pricing?.basePrice > 0
      );
    }
  }
];

// Helper functions
export const getStepById = (stepId) => {
  return LISTING_STEPS.find(step => step.id === stepId);
};

export const getStepByIndex = (index) => {
  return LISTING_STEPS[index];
};

export const getStepsBySection = (section) => {
  return LISTING_STEPS.filter(step => step.section === section);
};

export const getTotalSteps = () => LISTING_STEPS.length;

export const getSectionProgress = (currentStepIndex, section) => {
  const sectionSteps = getStepsBySection(section);
  const currentSectionSteps = LISTING_STEPS.slice(0, currentStepIndex + 1)
    .filter(step => step.section === section);
  
  return Math.round((currentSectionSteps.length / sectionSteps.length) * 100);
};
