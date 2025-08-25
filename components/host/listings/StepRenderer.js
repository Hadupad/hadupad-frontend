"use client";

import { lazy, Suspense } from 'react';
import { useListingCreation } from '../../../contexts/ListingCreationContext';
import { getStepByIndex } from '../../../config/listingSteps';
import LoadingSpinner from '../../ui/LoadingSpinner';

// Lazy load all step components for better performance
const stepComponents = {
  CreateStep1: lazy(() => import('./CreateStep1')),
  PropertyTypeSelector: lazy(() => import('./step1/PropertyTypeSelector')),
  PlacePrivacySelector: lazy(() => import('./step1/PlacePrivacySelector')),
  AddressInput: lazy(() => import('./step1/AddressInput')),
  FullAddressForm: lazy(() => import('./step1/FullAddressForm')),
  MapWithAddress: lazy(() => import('./step1/MapWithAddress')),
  RoomCounters: lazy(() => import('./step1/RoomCounters')),
  CreateStep2: lazy(() => import('./CreateStep2')),
  MoreAbout: lazy(() => import('./step2/MoreAbout')),
  HousePhotos: lazy(() => import('./step2/HousePhotos')),
  HousePhotosView: lazy(() => import('./step2/HousePhotosView')),
  Title: lazy(() => import('./step2/Title')),
  Description: lazy(() => import('./step2/Description')),
  CreateStep3: lazy(() => import('./CreateStep3')),
  BookingSetting: lazy(() => import('./step3/BookingSetting')),
  PriceSetting: lazy(() => import('./step3/PriceSettings')),
  PriceSettingDiscounts: lazy(() => import('./step3/PriceSettingsDiscounts')),
  Review: lazy(() => import('./step3/Review'))
};

export default function StepRenderer() {
  const { currentStep, nextStep, prevStep, formData, updateData, isLoading, error } = useListingCreation();
  
  const stepConfig = getStepByIndex(currentStep);
  
  if (!stepConfig) {
    return <div>Step not found</div>;
  }

  const StepComponent = stepComponents[stepConfig.component];
  
  if (!StepComponent) {
    return <div>Component not found: {stepConfig.component}</div>;
  }

  // Common props passed to all step components
  const commonProps = {
    onNext: nextStep,
    onBack: prevStep,
    formData,
    updateData,
    stepConfig,
    isLoading,
    error
  };

  // Special props for specific components
  const getSpecialProps = () => {
    switch (stepConfig.component) {
      case 'HousePhotos':
        return {
          photos: formData.photos || [],
          setPhotos: (photos) => updateData({ photos })
        };
      case 'HousePhotosView':
        return {
          photos: formData.photos || []
        };
      case 'Review':
        return {
          onNext: () => {
            // Handle final submission
            console.log('Submitting listing:', formData);
            // Navigate back to listings page
            window.location.href = '/host/listings';
          }
        };
      default:
        return {};
    }
  };

  const finalProps = { ...commonProps, ...getSpecialProps() };

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <StepComponent {...finalProps} />
    </Suspense>
  );
}
