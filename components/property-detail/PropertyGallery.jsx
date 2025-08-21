import { useState } from 'react';
import { Grid3X3, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PropertyGallery({ property }) {
  const [showAllPhotos, setShowAllPhotos] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const mainImage = property.images[0];
  const sideImages = property.images.slice(1, 5);
  const allImages = property.images;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  return (
    <div className="mb-8">
      {/* Desktop Gallery */}
      <div className="hidden md:block">
        <div className="grid grid-cols-4 grid-rows-2 gap-2 h-96 md:h-[400px] rounded-xl overflow-hidden">
          {/* Main large image */}
          <div className="col-span-2 row-span-2">
            <img
              src={mainImage}
              alt={`${property.name} - Main view`}
              className="w-full h-full object-cover hover:brightness-90 transition-all cursor-pointer"
              onError={(e) => {
                e.target.src = '/images/hero/hero1.png';
              }}
              onClick={() => setShowAllPhotos(true)}
            />
          </div>
          
          {/* Side images */}
          {sideImages.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`${property.name} - View ${index + 2}`}
                className="w-full h-full object-cover hover:brightness-90 transition-all cursor-pointer"
                onError={(e) => {
                  e.target.src = '/images/hero/hero1.png';
                }}
                onClick={() => setShowAllPhotos(true)}
              />
              {/* Show all photos button on last image */}
              {index === sideImages.length - 1 && (
                <button
                  onClick={() => setShowAllPhotos(true)}
                  className="absolute bottom-4 right-4 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <Grid3X3 className="w-4 h-4" />
                  Show all photos
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Gallery - Single Image Slider */}
      <div className="md:hidden relative">
        <div className="relative h-64 rounded-xl overflow-hidden">
          <img
            src={allImages[currentImageIndex]}
            alt={`${property.name} - View ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = '/images/hero/hero1.png';
            }}
          />
          
          {/* Navigation Arrows */}
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all"
          >
            <ChevronLeft className="w-5 h-5 text-gray-800" />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 rounded-full p-2 shadow-md hover:bg-opacity-100 transition-all"
          >
            <ChevronRight className="w-5 h-5 text-gray-800" />
          </button>

          {/* Image Counter */}
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm">
            {currentImageIndex + 1} / {allImages.length}
          </div>

          {/* Show all photos button */}
          <button
            onClick={() => setShowAllPhotos(true)}
            className="absolute bottom-4 left-4 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm font-medium hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Grid3X3 className="w-4 h-4" />
            Show all
          </button>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {allImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex ? 'bg-gray-800' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
