"use client";

import { useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
// import { useWishlist } from "../../hooks/useWishlist";
import useWishlist from "../../hooks/useWishlist.js"; // ✅ Correct

const PropertyCard = ({ property }) => {
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
          bottom: "6px",
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
    <div className="hover:shadow-lg transition-shadow duration-300 rounded-2xl">
      <div className="relative rounded-2xl overflow-hidden">
        <Slider {...imageSettings}>
          {property.images.map((img, index) => (
            <div key={index}>
              <Image
                src={img}
                alt={`${property.location} - Image ${index + 1}`}
                width={400}
                height={378}
                className="w-[400px] h-[378px] object-cover rounded-2xl focus:outline-none"
                priority={index === 0}
              />
            </div>
          ))}
        </Slider>

        {/* <button className="absolute top-2 right-2 p-1.5 rounded-full bg-black/20 hover:bg-black/30 transition-colors">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button> */}
        <button className="absolute top-2 right-2 p-1.5 rounded-full bg-black/20 hover:bg-black/30 transition-colors">
  <svg
    className="w-5 h-5"
    fill="red"
    stroke="white"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
             2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
             C13.09 3.81 14.76 3 16.5 3
             19.58 3 22 5.42 22 8.5
             c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
</button>

      </div>

      <div className="pt-3 px-2 pb-4">
        <div className="flex items-center justify-between">
          <p className="font-medium text-sm text-black truncate max-w-[180px]">
            {property.location}
          </p>
          <span className="flex items-center gap-1">
            <svg
              className="w-4 h-4 fill-black"
              viewBox="0 0 24 24"
            >
              <path d="M12 .587l3.668 7.568L24 9.75l-6 5.849L19.335 24 12 20.065 4.665 24 6 15.599 0 9.75l8.332-1.595z" />
            </svg>
            {property.rating}
          </span>
        </div>

        <div className="flex items-center text-sm text-gray-800 gap-4 py-1">
          <span className="font-semibold">🛏 {property.beds} Beds</span>
          <span className="font-semibold">🛁 {property.baths} Baths</span>
        </div>

        <div className="flex items-center justify-between text-sm text-black font-medium">
          <p>
            ₦{property.price.toLocaleString()}
            <span className="font-normal text-gray-500"> / night</span>
          </p>
          <button className="text-xs bg-black text-white px-3 py-1 rounded-full">
            View
          </button>
        </div>
      </div>
    </div>
  );
};

export default function WishlistProperties() {
  const { properties, loading } = useWishlist();
    const isMobile = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    console.log("Properties in component:", properties);
  }, [properties]);

  const mobileSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: "20px",
  };

  if (loading)
    return (
      <div className="text-center py-10">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
        <p className="mt-2">Loading properties...</p>
      </div>
    );

  if (!properties.length)
    return (
      <div className="text-center py-10">
        <p className="text-lg mb-2">Your wishlist is empty</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Refresh
        </button>
      </div>
    );

  return (
    <section className="px-4 md:px-12 py-6">
      {isMobile ? (
        <Slider {...mobileSettings} className="mx-2">
          {properties.map((prop) => (
            <div key={prop.id} className="px-2">
              <PropertyCard property={prop} />
            </div>
          ))}
        </Slider>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {properties.map((prop) => (
            <PropertyCard key={prop.id} property={prop} />
          ))}
        </div>
      )}
    </section>
  );
}
