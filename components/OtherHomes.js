"use client";

import Link from "next/link";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useOtherProperties from "../hooks/useOtherProperties";
import Slider from "react-slick";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";


export default function OtherHomes() {
  const { properties, loading } = useOtherProperties();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const mobileSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    arrows: false,
  };

  if (loading) return <p className="text-center py-8">Loading properties...</p>;
  if (!properties.length)
    return <p className="text-center py-8">No properties found.</p>;

  return (
    <section className="px-4 md:px-12 py-8">
    <div className="mb-6">
  {/* Centered heading */}
  <div className="text-center mb-2">
    <h2 className="text-3xl md:text-4xl font-bold text-black">
      Other homes you may like
    </h2>
  </div>

  {/* Right-aligned link */}
  <div className="flex justify-end">
    <a
      className="font-medium text-black flex items-center gap-1 hover:underline"
      href=""
    >
      Explore All <span>→</span>
    </a>
  </div>
</div>


      {isMobile ? (
        <Slider {...mobileSettings} className="mx-2">
          {properties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </Slider>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
          bottom: "8px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <ul style={{ margin: 0, gap: 4, padding: 0, display: "flex" }}>
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
    <Link href="/property-details">
  <div className="cursor-pointer bg-transparent p-0 rounded-xl shadow-none hover:opacity-90 transition-all duration-200">
  <div className="relative rounded-xl overflow-hidden">
    <Slider {...imageSettings}>
      {property.images.map((img, index) => (
        <div key={index}>
          <Image
            src={img}
            alt={`Image ${index + 1}`}
            width={400}
            height={378.8}
            className="w-full h-[300px] object-cover rounded-xl"
          />
        </div>
      ))}
    </Slider>

    <button className="absolute top-2 right-2 bg-black/40 p-2 rounded-full">
      <svg
        className="w-5 h-5 text-white"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
            2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 
            2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 
            5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
      </svg>
    </button>
  </div>

  <div className="pt-2">
    <div className="flex items-center justify-between text-black text-sm">
      <p>{property.location}</p>
      <span className="flex items-center gap-1">
        <svg className="w-4 h-4 fill-black" viewBox="0 0 24 24">
          <path d="M12 .587l3.668 7.568L24 9.75l-6 5.849L19.335 24 12 20.065 4.665 24 6 15.599 0 9.75l8.332-1.595z" />
        </svg>
        {property.rating}
      </span>
    </div>

    <div className="flex items-center text-sm text-white gap-4 py-1 font-semibold">
      <span className="flex items-center gap-1 text-[#FF4444]">
        <Image src="/images/icons/bed.png" alt="Bed" width={16} height={16} />
        {property.beds} Beds
      </span>
      <span className="flex items-center gap-1 text-[#FF4444]">
        <Image src="/images/icons/bath.png" alt="Bath" width={16} height={16} />
        {property.baths} Baths
      </span>
    </div>

    <p className="text-black text-sm font-medium">
      #{property.price.toLocaleString()}
      <span className="text-[#222222] font-normal"> /night</span>
    </p>
  </div>
</div>
</Link>
  );
}