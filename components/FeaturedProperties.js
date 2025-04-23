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
  if (!properties.length)
    return <p className="text-center">No properties found.</p>;

  return (
    <section className="px-4 md:px-12 py-10">
      <div className="mb-6">
        {/* Centered heading */}
        <div className="text-center mb-4">
          <h2 className="text-4xl md:text-4xl font-bold text-black inline-block">
            Some homes you might like
          </h2>
        </div>

        {/* Right-aligned explore link */}
        <div className="text-right">
          <a
            className="text-2xl font-medium text-black flex items-center justify-end gap-2"
            href="#"
          >
            Explore All <span>→</span>
          </a>
        </div>
      </div>

      {isMobile ? (
        <Slider {...mobileSettings}>
          {properties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </Slider>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
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
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: "6px", // reduced distance to edge
          width: "100%",
          display: "flex",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <ul style={{ margin: 0, gap: 0, padding: 0, display: "flex" }}>
          {dots}
        </ul>
      </div>
    ),
    customPaging: () => (
      <div
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "9999px",
          backgroundColor: "white",
          opacity: 0.4,
        }}
      />
    ),
  };

  return (
    <div>
      <div className="relative rounded-2xl overflow-hidden">
        <Slider {...imageSettings}>
          {property.images.map((img, index) => (
            <div key={index}>
              <Image
                src={img}
                alt={`Image ${index + 1}`}
                width={400}
                height={378}
                className="w-[400px] h-[378px] object-cover rounded-2xl focus:outline-none"
              />
            </div>
          ))}
        </Slider>

        <button className="absolute top-2 right-2  p-1.5 rounded-full">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
              2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 
              2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 
              5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </button>
      </div>

      {/* Reduced pt-3 to pt-1 to make text closer to image */}
      <div className="pt-1">
        <div className="flex items-center justify-between">
        <p className="font-medium text-sm text-black">{property.location}</p>
        <span className="flex items-center gap-1">
            <svg className="w-4 h-4 fill-black" viewBox="0 0 24 24">
              <path d="M12 .587l3.668 7.568L24 9.75l-6 5.849L19.335 24 12 20.065 4.665 24 6 15.599 0 9.75l8.332-1.595z" />
            </svg>
            {property.rating}
          </span>
          </div>

        <div className="flex items-center text-sm text-gray-800 gap-4 py-1">
          <span className=" font-semibold">
            🛏 {property.beds} Beds
          </span>
          <span className=" font-semibold">
            🛁 {property.baths} Baths
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-black font-medium">
          <p>
            {property.price}{" "}
            <span className="font-normal text-gray-500">night</span>
          </p>
         
        </div>
      </div>
    </div>
  );
}
