"use client";

import { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import Navbar from '../../../../../components/NavBar';
import PropertyHeader from '../../../../../components/property-detail/PropertyHeader';
import PropertyGallery from '../../../../../components/property-detail/PropertyGallery';
import PropertySectionNav from '../../../../../components/property-detail/PropertySectionNav';
import PropertyDetails from '../../../../../components/property-detail/PropertyDetails';
import AmenitiesInfo from '../../../../../components/property-detail/AmenitiesInfo';
import LocationInfo from '../../../../../components/property-detail/LocationInfo';
import InstructionsInfo from '../../../../../components/property-detail/InstructionsInfo';
import BookingCard from '../../../../../components/property-detail/BookingCard.jsx';
import TopDestinations from '../../../../../components/property-detail/TopDestinations';
import Footer from '../../../../../components/Footer';

export default function PropertyDetailClient({ property }) {
  const [activeSection, setActiveSection] = useState('details');
  const [expandedSections, setExpandedSections] = useState({});

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const sections = [
    { id: 'details', title: 'Details', component: <PropertyDetails property={property} /> },
    { 
      id: 'description', 
      title: 'Description', 
      component: (
        <div className="space-y-6">
          {/* Description Text */}
          <div className="max-w-2xl">
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Experience the perfect blend of comfort and convenience in this beautifully appointed apartment. 
              Located in the heart of the city, this space offers modern amenities and stunning views that will 
              make your stay unforgettable. Whether you're here for business or leisure, you'll find everything 
              you need for a comfortable and enjoyable visit.
            </p>
            <button className="text-[#DC4731] text-sm font-medium hover:underline">
              Show more
            </button>
          </div>

          {/* Where you'll sleep */}
          <div className="max-w-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Where you'll sleep</h3>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              {/* Mobile Layout - Larger Image */}
              <div className="md:hidden">
                <div className="w-full h-48 bg-gray-100 rounded-lg mb-4">
                  <img 
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop" 
                    alt="Bedroom" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="text-center">
                  <h4 className="font-medium text-gray-900">Bedroom</h4>
                  <p className="text-sm text-gray-600">1 queen bed</p>
                </div>
              </div>
              
              {/* Desktop Layout - Smaller Image with Text Side by Side */}
              <div className="hidden md:flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop" 
                    alt="Bedroom" 
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Bedroom</h4>
                  <p className="text-sm text-gray-600">1 queen bed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div className="max-w-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">7 nights in Abuja</h3>
            <p className="text-sm text-gray-600 mb-4">Apr 04, 2025 - Apr 10, 2025</p>
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              {/* Mobile Layout - Vertical Stack */}
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
                      <div key={i} className="text-center py-2 hover:bg-gray-100 rounded cursor-pointer">
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
                    <div className="text-gray-500 text-center py-1">Th</div>
                    <div className="text-gray-500 text-center py-1">Fr</div>
                    <div className="text-gray-500 text-center py-1">Sa</div>
                    {Array.from({ length: 30 }, (_, i) => (
                      <div key={i} className="text-center py-2 hover:bg-gray-100 rounded cursor-pointer">
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Desktop Layout - Side by Side */}
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
                      <div key={i} className="text-center py-1 hover:bg-gray-100 rounded cursor-pointer">
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
                    <div className="text-gray-500 text-center py-1">Th</div>
                    <div className="text-gray-500 text-center py-1">Fr</div>
                    <div className="text-gray-500 text-center py-1">Sa</div>
                    {Array.from({ length: 30 }, (_, i) => (
                      <div key={i} className="text-center py-1 hover:bg-gray-100 rounded cursor-pointer">
                        {i + 1}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
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
        return (
          <div className="space-y-6">
            {/* Description Text */}
            <div className="max-w-2xl">
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                Come and stay in this superb bungalow, in the heart of the historic center of Abuja. 
                Spacious and bright, exposed with stone, you will enjoy all the charms of the city thanks to 
                its ideal location. Close to the famous Jabi Lake Mall, many local stores, bars and 
                restaurants, you can access the apartment by tram A and C and bus routes 27 and 44.
              </p>
              <button className="text-gray-900 underline text-sm">Show more ↓</button>
            </div>

            {/* Where you'll sleep */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Where you'll sleep</h3>
              <div className="bg-white border border-gray-200 rounded-lg p-3 max-w-xs">
                <img
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop"
                  alt="Bedroom"
                  className="w-full h-24 object-cover rounded-lg mb-2"
                />
                <div>
                  <h4 className="font-medium text-gray-900 text-sm">Bedroom</h4>
                  <p className="text-xs text-gray-600">1 queen bed</p>
                </div>
              </div>
            </div>

            {/* Calendar Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">7 nights in Abuja</h3>
              <p className="text-xs text-gray-600 mb-4">Apr 04, 2025 - Apr 10, 2025</p>
              
              <div className="grid grid-cols-2 gap-4 max-w-lg">
                {/* March 2025 */}
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
                    
                    {/* Empty cells for March start */}
                    <div className="p-1"></div>
                    <div className="p-1"></div>
                    <div className="p-1"></div>
                    <div className="p-1"></div>
                    <div className="p-1"></div>
                    <div className="p-1"></div>
                    <div className="p-1">1</div>
                    
                    <div className="p-1">2</div>
                    <div className="p-1">3</div>
                    <div className="p-1">4</div>
                    <div className="p-1 bg-red-500 text-white rounded-full">5</div>
                    <div className="p-1">6</div>
                    <div className="p-1">7</div>
                    <div className="p-1">8</div>
                    
                    <div className="p-1">9</div>
                    <div className="p-1 bg-red-500 text-white rounded-full">10</div>
                    <div className="p-1">11</div>
                    <div className="p-1">12</div>
                    <div className="p-1">13</div>
                    <div className="p-1">14</div>
                    <div className="p-1">15</div>
                    
                    <div className="p-1">16</div>
                    <div className="p-1">17</div>
                    <div className="p-1">18</div>
                    <div className="p-1">19</div>
                    <div className="p-1">20</div>
                    <div className="p-1">21</div>
                    <div className="p-1">22</div>
                    
                    <div className="p-1">23</div>
                    <div className="p-1">24</div>
                    <div className="p-1">25</div>
                    <div className="p-1">26</div>
                    <div className="p-1">27</div>
                    <div className="p-1">28</div>
                    <div className="p-1">29</div>
                    
                    <div className="p-1">30</div>
                    <div className="p-1">31</div>
                  </div>
                </div>

                {/* April 2025 */}
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
                    <div className="p-1 font-medium text-gray-500">Th</div>
                    <div className="p-1 font-medium text-gray-500">Fr</div>
                    <div className="p-1 font-medium text-gray-500">Sa</div>
                    
                    {/* Empty cells for April start */}
                    <div className="p-1"></div>
                    <div className="p-1"></div>
                    <div className="p-1">1</div>
                    <div className="p-1">2</div>
                    <div className="p-1">3</div>
                    <div className="p-1">4</div>
                    <div className="p-1">5</div>
                    
                    <div className="p-1">6</div>
                    <div className="p-1">7</div>
                    <div className="p-1">8</div>
                    <div className="p-1">9</div>
                    <div className="p-1">10</div>
                    <div className="p-1">11</div>
                    <div className="p-1">12</div>
                    
                    <div className="p-1">13</div>
                    <div className="p-1">14</div>
                    <div className="p-1">15</div>
                    <div className="p-1">16</div>
                    <div className="p-1">17</div>
                    <div className="p-1">18</div>
                    <div className="p-1">19</div>
                    
                    <div className="p-1">20</div>
                    <div className="p-1">21</div>
                    <div className="p-1">22</div>
                    <div className="p-1">23</div>
                    <div className="p-1">24</div>
                    <div className="p-1">25</div>
                    <div className="p-1">26</div>
                    
                    <div className="p-1">27</div>
                    <div className="p-1">28</div>
                    <div className="p-1">29</div>
                    <div className="p-1">30</div>
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
      case 'instructions':
        return <InstructionsInfo property={property} />;
      default:
        return <PropertyDetails property={property} />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-[100px] px-4 sm:px-6 lg:px-8 pb-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Property Header */}
          <PropertyHeader property={property} />

          {/* Property Gallery */}
          <PropertyGallery property={property} />

          {/* Desktop Layout */}
          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 max-w-4xl">
              {/* Section Navigation */}
              <PropertySectionNav 
                activeSection={activeSection} 
                onSectionChange={setActiveSection} 
              />

              {/* Dynamic Section Content */}
              <div className="space-y-6 max-w-3xl relative z-0">
                {renderSectionContent()}
              </div>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <BookingCard property={property} />
            </div>
          </div>

          {/* Mobile Layout - Collapsible Sections */}
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

            {/* Mobile Booking Card */}
            <div className="mt-6">
              <BookingCard property={property} />
            </div>
          </div>

          {/* Top Destinations */}
          <TopDestinations />
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}