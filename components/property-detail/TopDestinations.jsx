import { useState } from 'react';
import { Star, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export default function TopDestinations() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const properties = [
    {
      id: 1,
      name: "Luxury Villa with Pool",
      location: "Victoria Island, Lagos",
      dates: "Oct 15 - 22",
      price: "₦45,000-65,000",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      name: "Modern Apartment Downtown",
      location: "Ikoyi, Lagos",
      dates: "Nov 5 - 12",
      price: "₦25,000-35,000",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      name: "Cozy Garden Apartment",
      location: "Lekki, Lagos",
      dates: "Dec 1 - 8",
      price: "₦30,000-40,000",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      name: "Penthouse with City View",
      location: "Abuja Central",
      dates: "Jan 10 - 17",
      price: "₦55,000-75,000",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop"
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % properties.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + properties.length) % properties.length);
  };

  return (
    <div className="py-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Other homes you may like
        </h2>
        <div className="flex justify-end">
          <button className="flex items-center gap-2 text-[#DC4731] font-medium hover:underline">
            Explore All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Desktop Grid */}
      <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={property.image}
                alt={property.name}
                className="w-full h-48 object-cover"
              />
              <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
            
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900 text-sm">{property.name}</h3>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current text-yellow-400" />
                  <span className="text-sm text-gray-600">{property.rating}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-1">{property.location}</p>
              <p className="text-sm text-gray-500 mb-2">{property.dates}</p>
              <p className="font-medium text-gray-900">
                {property.price} <span className="font-normal text-sm text-gray-600">/person</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Slider */}
      <div className="md:hidden relative">
        <div className="relative overflow-hidden rounded-xl">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {properties.map((property) => (
              <div key={property.id} className="w-full flex-shrink-0 bg-white rounded-xl overflow-hidden">
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-64 object-cover"
                  />
                  <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </button>
                  
                  {/* Navigation Arrows */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-800" />
                  </button>
                  
                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-800" />
                  </button>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900 text-lg">{property.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-current text-yellow-400" />
                      <span className="text-sm text-gray-600">{property.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-1">{property.location}</p>
                  <p className="text-sm text-gray-500 mb-2">{property.dates}</p>
                  <p className="font-medium text-gray-900 text-lg">
                    {property.price} <span className="font-normal text-sm text-gray-600">/person</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {properties.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-[#DC4731]' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
