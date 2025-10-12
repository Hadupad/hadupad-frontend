"use client";

import { ListingCreationProvider } from '../../../contexts/ListingCreationContext';
import StepRenderer from './StepRenderer';
import ProgressIndicator from './ProgressIndicator';
import ErrorBoundary from '../../ui/ErrorBoundary';

export default function CreateListingFlowV2() {
  return (
    <ListingCreationProvider>
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-50 mt-8 lg:mt-20">
          <ProgressIndicator />
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
            <StepRenderer />
          </div>
        </div>
      </ErrorBoundary>
    </ListingCreationProvider>
  );
}
