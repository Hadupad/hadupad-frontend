"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Star, Users, Bed, Bath, MapPin, ChevronRight, ChevronDown } from 'lucide-react';
import AdminLayout from '../../../../../../components/admin/AdminLayout';
import PropertySectionNav from '../../../../../../components/property-detail/PropertySectionNav';
import PropertyDetails from '../../../../../../components/property-detail/PropertyDetails';
import LocationInfo from '../../../../../../components/property-detail/LocationInfo';
import AmenitiesInfo from '../../../../../../components/property-detail/AmenitiesInfo';
import InstructionsInfo from '../../../../../../components/property-detail/InstructionsInfo';
import BookingCard from '../../../../../../components/property-detail/BookingCard';

export default function AdminPropertyDetailClient({ property }) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('details');
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleBackClick = () => {
    router.push('/admin/listings');
  };

  const sections = [
    { id: 'details', title: 'Details', component: <PropertyDetails property={property} /> },
    { 
      id: 'description', 
      title: 'Description', 
      component: (
        <div className="bg-white rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">Description</h3>
          <p className="text-gray-700">{property.description}</p>
        </div>
      )
    },
    { id: 'location', title: 'Location', component: <LocationInfo property={property} /> },
    { id: 'amenities', title: 'Amenities', component: <AmenitiesInfo property={property} /> },
    { id: 'instructions', title: 'Instructions', component: <InstructionsInfo property={property} /> }
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'details':
        return <PropertyDetails property={property} />;
      case 'description':
        return sections[1].component;
      case 'location':
        return <LocationInfo property={property} />;
      case 'amenities':
        return <AmenitiesInfo property={property} />;
      case 'instructions':
        return <InstructionsInfo property={property} />;
      default:
        return <PropertyDetails property={property} />;
    }
  };

  return (
      <div className="max-w-full overflow-hidden px-4 py-3">
        {/* Back Button and Header */}
        <div className="flex items-center mb-3">
          <button
            onClick={handleBackClick}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors mr-3"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-gray-900">{property.name}</h1>
            <p className="text-sm text-gray-600">{property.location}</p>
          </div>
        </div>

        {/* Property Gallery - Admin Compact Version */}
        <div className="mb-3">
          <div className="grid grid-cols-4 grid-rows-2 gap-2 h-80 rounded-lg overflow-hidden max-w-full">
            {/* Main large image */}
            <div className="col-span-2 row-span-2">
              <img
                src={property.images[0]}
                alt={`${property.name} - Main view`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/images/hero/hero1.png';
                }}
              />
            </div>
            
            {/* Side images */}
            {property.images.slice(1, 5).map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`${property.name} - View ${index + 2}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = '/images/hero/hero1.png';
                  }}
                />
                {/* Show all photos button on last image */}
                {index === 3 && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <button className="bg-white text-gray-900 px-3 py-1 rounded-lg text-sm font-medium flex items-center gap-2">
                      <span className="text-lg">⊞</span>
                      Show all photos
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Section Navigation */}
            <PropertySectionNav 
              activeSection={activeSection} 
              onSectionChange={setActiveSection} 
            />

            {/* Dynamic Section Content */}
            <div className="space-y-3 relative z-0">
              {renderSectionContent()}
            </div>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <BookingCard property={property} />
          </div>
        </div>

        {/* Mobile Layout - Collapsible Sections */}
        <div className="lg:hidden space-y-3 mt-4">
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

          {/* Mobile Booking Card */}
          <div className="mt-4">
            <BookingCard property={property} />
          </div>
        </div>
      </div>
  );
}
