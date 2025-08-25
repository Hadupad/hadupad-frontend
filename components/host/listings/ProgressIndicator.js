"use client";

import { useListingCreation } from '../../../contexts/ListingCreationContext';
import { getStepByIndex, getSectionProgress } from '../../../config/listingSteps';

export default function ProgressIndicator() {
  const { currentStep, getProgress } = useListingCreation();
  const stepConfig = getStepByIndex(currentStep);
  const progress = getProgress();

  if (!stepConfig) return null;

  return (
    <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        {stepConfig.sectionTitle && (
          <h1 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
            {stepConfig.sectionTitle}
          </h1>
        )}
        
        {/* Progress Bar */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex-1 bg-gray-200 rounded-full h-1.5 sm:h-2">
            <div 
              className="bg-red-600 h-1.5 sm:h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs sm:text-sm text-gray-600 font-medium whitespace-nowrap">
            {progress}%
          </span>
        </div>
        
        {/* Current Step Title */}
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Step {currentStep + 1}: {stepConfig.title}
        </p>
      </div>
    </div>
  );
}
