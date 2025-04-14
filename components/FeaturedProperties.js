"use client";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import useProperties from "../hooks/useProperties";
import Slider from "react-slick";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";

export default function FeaturedProperties() {
  const { properties, loading } = useProperties();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const mobileSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    arrows: false,
  };

  if (loading) return <p className="text-center">Loading properties...</p>;
  if (!properties.length) return <p className="text-center">No properties found.</p>;

  return (
    <section className="px-4 md:px-12 py-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-black">Some homes you might like</h2>
        <a className="text-sm font-medium text-black flex items-center gap-1" href="#">
          Explore All <span>→</span>
        </a>
      </div>

      {isMobile ? (
        <Slider {...mobileSettings}>
          {properties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </Slider>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {properties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      )}
    </section>
  );
}

function PropertyCard({ property }) {
  const imageSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
      <div className="relative">
      <Slider {...imageSettings} className="property-slider">
  {property.images.map((img, index) => (
    <div key={index}>
      <Image
        src={img}
        alt={`Image ${index + 1} of ${property.location}`}
        width={400}
        height={300}
        className="w-full h-60 object-cover"
      />
    </div>
  ))}
</Slider>


        <button className="absolute top-3 right-3 bg-white/70 backdrop-blur p-1.5 rounded-full">
          <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 
              4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 
              14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 
              3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>

      <div className="p-3">
        <p className="font-medium text-sm text-black">{property.location}</p>
        <div className="flex items-center text-xs text-gray-500 my-1 gap-2">
          <span>🛏 {property.beds} Beds</span>
          <span>🛁 {property.baths} Baths</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <p className="font-semibold text-black">
            {property.price} <span className="text-sm font-normal">night</span>
          </p>
          <span className="flex items-center gap-1 text-sm">
            <svg className="w-4 h-4 fill-black text-white" viewBox="0 0 24 24">
              <path d="M12 .587l3.668 7.568L24 9.75l-6 5.849L19.335 24 12 20.065 4.665 24 6 15.599 0 9.75l8.332-1.595z"/>
            </svg>
            {property.rating}
          </span>
        </div>
      </div>
    </div>
  );
}
