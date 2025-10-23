"use client";

import { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPublicPropertyById, resetPublicPropertyState } from '@/redux/slices/publicPropertySlice';
import Navbar from '../../../../../components/NavBar';
import PropertyHeader from '../../../../../components/property-detail/PropertyHeader';
import PropertyGallery from '../../../../../components/property-detail/PropertyGallery';
import PropertySectionNav from '../../../../../components/property-detail/PropertySectionNav';
import PropertyDetails from '../../../../../components/property-detail/PropertyDetails';
import ReviewSystem from '../../../../../components/property-detail/ReviewSystem';
import AmenitiesInfo from '../../../../../components/property-detail/AmenitiesInfo';
import LocationInfo from '../../../../../components/property-detail/LocationInfo';
import InstructionsInfo from '../../../../../components/property-detail/InstructionsInfo';
import BookingCard from '../../../../../components/property-detail/BookingCard.jsx';
import TopDestinations from '../../../../../components/property-detail/TopDestinations';
import Footer from '../../../../../components/Footer';

export default function PropertyDetailClient({ propertyId }) {
  const dispatch = useDispatch();
  const { currentProperty, loading, error } = useSelector((state) => state.publicProperty || {});
  const [activeSection, setActiveSection] = useState('details');
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    if (propertyId) {
      dispatch(fetchPublicPropertyById(propertyId));
    }
    // Reset state on component unmount
    return () => {
      dispatch(resetPublicPropertyState());
    };
  }, [dispatch, propertyId]);

  // Show centered loading indicator while fetching data
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  // Show error if fetch fails
  if (error) {
    return <p className="text-center py-8 text-red-600">Error fetching property: {error}. Please try again later.</p>;
  }

  // Only check for empty data after loading is complete
  if (!currentProperty || Object.keys(currentProperty).length === 0) {
    return <p className="text-center py-8">No property data available. Please try again later.</p>;
  }

  // Property object construction
  const property = {
    id: currentProperty?.id || '',
    name: currentProperty?.name || 'Untitled Property',
    images: currentProperty?.images || [],
    location: currentProperty?.location && currentProperty.location !== 'undefined, undefined, undefined'
      ? currentProperty.location
      : 'Location not available',
    rating: currentProperty?.rating || 0,
    averageRating: currentProperty?.averageRating || 0,
    reviews: currentProperty?.reviews || [],
    beds: currentProperty?.beds || 0,
    baths: currentProperty?.baths || 0,
    bedrooms: currentProperty?.bedrooms || 1,
    price: currentProperty?.price || 0,
    description: currentProperty?.description || 'No description available.',
    amenities: currentProperty?.amenities || [],
    placeType: currentProperty?.placeType || '',
    guestAccommodationType: currentProperty?.guestAccommodationType || '',
    streetAddress: currentProperty?.streetAddress || '',
    aptSuiteNumber: currentProperty?.aptSuiteNumber || '',
    city: currentProperty?.city || 'Unknown city',
    state: currentProperty?.state || '',
    country: currentProperty?.country || '',
    zipCode: currentProperty?.zipCode || '',
    maxGuestCount: currentProperty?.maxGuestCount || 2,
    serviceFee: currentProperty?.serviceFee || 0,
    cleaningFee: currentProperty?.cleaningFee || 0,
    cautionFee: currentProperty?.cautionFee || 0,
    discountPercent: currentProperty?.discountPercent || 0,
    isPublished: currentProperty?.isPublished || false,
    isCalendarSetup: currentProperty?.isCalendarSetup || false,
    currentStep: currentProperty?.currentStep || 0,
    completionPercentage: currentProperty?.completionPercentage || 0,
    createdAt: currentProperty?.createdAt || null,
    updatedAt: currentProperty?.updatedAt || null,
    host: {
      name: currentProperty?.host?.name || 'Unknown Host',
      profilePicture: currentProperty?.host?.profilePicture || undefined,
      id: currentProperty?.host?.id || undefined,
      phoneNumber: currentProperty?.host?.phoneNumber || undefined,
      isVerified: currentProperty?.host?.isVerified || false,
      userType: currentProperty?.host?.userType || 'host',
    },
    instantBookingEnabled: currentProperty?.instantBookingEnabled || false,
    approveBookingEnabled: currentProperty?.approveBookingEnabled || false,
    bookingType: currentProperty?.bookingType || '',
    unavailableDates: currentProperty?.unavailableDates || [],
    availability: currentProperty?.availability || { isAvailableNow: false, nextAvailableDate: 'N/A' },
  };

  const sections = [
    { id: 'details', title: 'Details', component: <PropertyDetails property={property} /> },
    { id: 'reviews', title: 'Reviews', component: <ReviewSystem property={property} /> },
    {
      id: 'description',
      title: 'Description',
      component: (
        <div className="space-y-6">
          <div className="max-w-2xl">
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              {property.description}
            </p>
          </div>
          <div className="max-w-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Where you'll sleep</h3>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="md:hidden">
                <div className="w-full h-48 bg-gray-100 rounded-lg mb-4">
                  <img
                    src={property.images[0] || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop'}
                    alt="Bedroom"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="text-center">
                  <h4 className="font-medium text-gray-900">Bedroom</h4>
                  <p className="text-sm text-gray-600">{property.beds} bed{property.beds !== 1 ? 's' : ''}</p>
                </div>
              </div>
              <div className="hidden md:flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img
                    src={property.images[0] || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop'}
                    alt="Bedroom"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Bedroom</h4>
                  <p className="text-sm text-gray-600">{property.beds} bed{property.beds !== 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">7 nights in {property.city}</h3>
            <p className="text-sm text-gray-600 mb-4">
              {property.availability.isAvailableNow
                ? 'Available now'
                : `Next available: ${property.availability.nextAvailableDate}`}
            </p>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="md:hidden space-y-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 text-center">March 2025</h4>
                  <div className="grid grid-cols-7 gap-1 text-xs">
                    <div className="text-gray-500 text-center py-1">Su</div>
                    <div className="text-gray-500 text-center py-1">Mo</div>
                    <div className="text-gray-500 text-center py-1">Tu</div>
                    <div className="text-gray-500 text-center py-1">We</div>
                    <div className="text-gray-500 text-center py-1">Th</div>
                    <div className="text-gray-500 text-center py-1">Fr</div>
                    <div className="text-gray-500 text-center py-1">Sa</div>
                    {Array.from({ length: 31 }, (_, i) => (
                      <div
                        key={i}
                        className={`text-center py-2 hover:bg-gray-100 rounded cursor-pointer ${
                          property.unavailableDates.includes(`2025-03-${String(i + 1).padStart(2, '0')}`)
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : ''
                        }`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2 text-center">April 2025</h4>
                  <div className="grid grid-cols-7 gap-1 text-xs">
                    <div className="text-gray-500 text-center py-1">Su</div>
                    <div className="text-gray-500 text-center py-1">Mo</div>
                    <div className="text-gray-500 text-center py-1">Tu</div>
                    <div className="text-gray-500 text-center py-1">We</div>
                    <div className="text-gray-500 text-center py-1">Fr</div>
                    <div className="text-gray-500 text-center py-1">Sa</div>
                    {Array.from({ length: 30 }, (_, i) => (
                      <div
                        key={i}
                        className={`text-center py-2 hover:bg-gray-100 rounded cursor-pointer ${
                          property.unavailableDates.includes(`2025-04-${String(i + 1).padStart(2, '0')}`)
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : ''
                        }`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="hidden md:grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">March 2025</h4>
                  <div className="grid grid-cols-7 gap-1 text-xs">
                    <div className="text-gray-500 text-center py-1">Su</div>
                    <div className="text-gray-500 text-center py-1">Mo</div>
                    <div className="text-gray-500 text-center py-1">Tu</div>
                    <div className="text-gray-500 text-center py-1">We</div>
                    <div className="text-gray-500 text-center py-1">Th</div>
                    <div className="text-gray-500 text-center py-1">Fr</div>
                    <div className="text-gray-500 text-center py-1">Sa</div>
                    {Array.from({ length: 31 }, (_, i) => (
                      <div
                        key={i}
                        className={`text-center py-1 hover:bg-gray-100 rounded cursor-pointer ${
                          property.unavailableDates.includes(`2025-03-${String(i + 1).padStart(2, '0')}`)
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : ''
                        }`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">April 2025</h4>
                  <div className="grid grid-cols-7 gap-1 text-xs">
                    <div className="text-gray-500 text-center py-1">Su</div>
                    <div className="text-gray-500 text-center py-1">Mo</div>
                    <div className="text-gray-500 text-center py-1">Tu</div>
                    <div className="text-gray-500 text-center py-1">We</div>
                    <div className="text-gray-500 text-center py-1">Fr</div>
                    <div className="text-gray-500 text-center py-1">Sa</div>
                    {Array.from({ length: 30 }, (_, i) => (
                      <div
                        key={i}
                        className={`text-center py-1 hover:bg-gray-100 rounded cursor-pointer ${
                          property.unavailableDates.includes(`2025-04-${String(i + 1).padStart(2, '0')}`)
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : ''
                        }`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    { id: 'location', title: 'Location', component: <LocationInfo property={property} /> },
    { id: 'amenities', title: 'Amenities', component: <AmenitiesInfo property={property} /> },
  ];

  const toggleSection = (sectionId) => {
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'details':
        return <PropertyDetails property={property} />;
      case 'reviews':
        return <ReviewSystem property={property} />;
      case 'description':
        return (
          <div className="space-y-6">
            <div className="max-w-2xl">
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                {property.description}
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Where you'll sleep</h3>
              <div className="bg-white border border-gray-200 rounded-lg p-3 max-w-xs">
                <img
                  src={property.images[0] || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop'}
                  alt="Bedroom"
                  className="w-full h-24 object-cover rounded-lg mb-2"
                />
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">Bedroom</h4>
                  <p className="text-xs text-gray-600">{property.beds} bed{property.beds !== 1 ? 's' : ''}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">7 nights in {property.city}</h3>
              <p className="text-xs text-gray-600 mb-4">
                {property.availability.isAvailableNow
                  ? 'Available now'
                  : `Next available: ${property.availability.nextAvailableDate}`}
              </p>
              <div className="grid grid-cols-2 gap-4 max-w-lg">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <button className="p-1 text-sm">←</button>
                    <h4 className="font-medium text-sm">March 2025</h4>
                    <div></div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-xs text-center">
                    <div className="p-1 font-medium text-gray-500">Su</div>
                    <div className="p-1 font-medium text-gray-500">Mo</div>
                    <div className="p-1 font-medium text-gray-500">Tu</div>
                    <div className="p-1 font-medium text-gray-500">We</div>
                    <div className="p-1 font-medium text-gray-500">Th</div>
                    <div className="p-1 font-medium text-gray-500">Fr</div>
                    <div className="p-1 font-medium text-gray-500">Sa</div>
                    {Array.from({ length: 31 }, (_, i) => (
                      <div
                        key={i}
                        className={`p-1 text-center hover:bg-gray-100 rounded cursor-pointer ${
                          property.unavailableDates.includes(`2025-03-${String(i + 1).padStart(2, '0')}`)
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : ''
                        }`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div></div>
                    <h4 className="font-medium text-sm">April 2025</h4>
                    <button className="p-1 text-sm">→</button>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-xs text-center">
                    <div className="p-1 font-medium text-gray-500">Su</div>
                    <div className="p-1 font-medium text-gray-500">Mo</div>
                    <div className="p-1 font-medium text-gray-500">Tu</div>
                    <div className="p-1 font-medium text-gray-500">We</div>
                    <div className="p-1 font-medium text-gray-500">Fr</div>
                    <div className="p-1 font-medium text-gray-500">Sa</div>
                    {Array.from({ length: 30 }, (_, i) => (
                      <div
                        key={i}
                        className={`p-1 text-center hover:bg-gray-100 rounded cursor-pointer ${
                          property.unavailableDates.includes(`2025-04-${String(i + 1).padStart(2, '0')}`)
                            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            : ''
                        }`}
                      >
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button className="mt-4 text-xs text-gray-700 underline">Clear dates</button>
            </div>
          </div>
        );
      case 'location':
        return <LocationInfo property={property} />;
      case 'amenities':
        return <AmenitiesInfo property={property} />;
      default:
        return <PropertyDetails property={property} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-[100px] px-4 sm:px-6 lg:px-8 pb-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <PropertyHeader property={property} />
          <PropertyGallery property={property} />
          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 max-w-4xl">
              <PropertySectionNav
                activeSection={activeSection}
                onSectionChange={setActiveSection}
              />
              <div className="space-y-6 max-w-3xl relative z-0">
                {renderSectionContent()}
              </div>
            </div>
            <div className="lg:col-span-1">
              <BookingCard property={property} />
            </div>
          </div>
          <div className="lg:hidden space-y-4 mt-6">
            {sections.map((section) => (
              <div key={section.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full px-4 py-4 bg-white flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-lg font-medium text-gray-900">{section.title}</span>
                  {expandedSections[section.id] ? (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  )}
                </button>
                {expandedSections[section.id] && (
                  <div className="px-4 py-4 bg-white border-t border-gray-200">
                    {section.component}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-6">
              <BookingCard property={property} />
            </div>
          </div>
          <TopDestinations />
        </div>
      </main>
      <Footer />
    </div>
  );
}