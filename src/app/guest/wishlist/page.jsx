"use client";

import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import useWishlist from "../../../../hooks/useWishlist";
import Navbar from "../../../../components/NavBar";

const PropertyCard = ({ property }) => {
  const sliderSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div className="absolute bottom-1.5 w-full flex justify-center z-10">
        <ul className="flex gap-0 m-0 p-0">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-2 h-2 rounded-full bg-white opacity-40" />
    ),
  };

  return (
    <div className="hover:shadow-lg transition-shadow duration-300 rounded-2xl">
      <div className="relative rounded-2xl overflow-hidden">
        <Slider {...sliderSettings}>
          {property.images.map((img, index) => (
            <div key={index}>
              <Image
                src={img}
                alt={`${property.location} - Image ${index + 1}`}
                width={400}
                height={289}
                className="w-full h-[289px] object-cover rounded-2xl"
                priority={index === 0}
                onError={(e) => {
                  e.target.src = '/images/hero/hero.jpg';
                }}
              />
            </div>
          ))}
        </Slider>

        <button className="absolute top-2 right-2 p-1.5 rounded-full bg-black/20 hover:bg-black/30 transition-colors">
          <svg className="w-5 h-5" fill="red" stroke="white" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>

      <div className="pt-3 px-2 pb-4">
        <div className="flex items-center justify-between mb-1">
          <p className="font-medium text-sm text-black truncate max-w-[180px]">
            {property.location}
          </p>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 fill-black" viewBox="0 0 24 24">
              <path d="M12 .587l3.668 7.568L24 9.75l-6 5.849L19.335 24 12 20.065 4.665 24 6 15.599 0 9.75l8.332-1.595z" />
            </svg>
            <span className="text-sm">{property.rating}</span>
          </span>
        </div>

        <div className="flex items-center text-sm text-gray-800 gap-4 py-1">
          <span className="flex items-center gap-1">
            <Image src="/images/icons/bed.png" alt="Bed" width={16} height={16} />
            {property.beds} Beds
          </span>
          <span className="flex items-center gap-1">
            <Image src="/images/icons/bath.png" alt="Bath" width={16} height={16} />
            {property.baths} Baths
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-black font-medium mt-2">
          <p>
            ₦{property.price.toLocaleString()}
            <span className="font-normal text-gray-500"> / night</span>
          </p>
          <Link href={`/property/${property.id}/${encodeURIComponent(property.name.toLowerCase().replace(/\s+/g, '-'))}`}>
            <button className="text-xs bg-black text-white px-3 py-1 rounded-full hover:bg-gray-800 transition-colors">
              View
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const LoadingState = () => (
  <div className="min-h-screen bg-white">
    <Navbar />
    <main className="pt-[100px] px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center py-10">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
        <p className="mt-2">Loading properties...</p>
      </div>
    </main>
  </div>
);

const EmptyState = () => (
  <div className="min-h-screen bg-white">
    <Navbar />
    <main className="pt-[100px] px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center py-10">
        <p className="text-lg mb-2">Your wishlist is empty</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Refresh
        </button>
      </div>
    </main>
  </div>
);

export default function WishlistProperties() {
  const { properties, loading } = useWishlist();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  if (loading) return <LoadingState />;
  if (!properties.length) return <EmptyState />;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-[100px] px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-semibold text-black">
              Your Wishlist
            </h1>
            <p className="text-sm mt-2 text-gray-600">
              Your favourite properties curated in one space
            </p>
          </div>
          
          {isMobile ? (
            <div className="space-y-6 mt-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
