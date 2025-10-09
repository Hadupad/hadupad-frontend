'use client';

import Link from 'next/link';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { useMediaQuery } from 'react-responsive';
import Image from 'next/image';
import Navbar from '../../../../components/NavBar';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWishlistAsync } from '@/redux/slices/wishlistSlice';

// PropertyCardSkeleton, PropertyCard, SkeletonLoader, EmptyState (unchanged)
const PropertyCardSkeleton = () => (
  <div className="hover:shadow-lg transition-shadow duration-300 rounded-2xl">
    <div className="relative rounded-2xl overflow-hidden">
      <div className="w-full h-48 bg-gray-200 animate-pulse" />
      <div className="absolute top-2 right-2 w-8 h-8 bg-gray-300 rounded-full animate-pulse" />
    </div>
    <div className="pt-3 px-2 pb-4">
      <div className="flex items-center justify-between mb-1">
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="flex items-center gap-4 py-1">
        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
        <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse" />
      </div>
    </div>
  </div>
);

const PropertyCard = ({ property, isLoading = false }) => {
  if (isLoading || !property || !property.id) {
    console.log('Rendering skeleton for property:', property);
    return <PropertyCardSkeleton />;
  }

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

  console.log('Rendering PropertyCard for:', property);

  return (
    <div className="hover:shadow-lg transition-shadow duration-300 rounded-2xl">
      <div className="relative rounded-2xl overflow-hidden">
        <Slider {...sliderSettings}>
          {(property.photos || []).map((img, index) => {
            console.log('Rendering image:', img);
            return (
              <div key={`${property.id}-${index}`}>
                <Image
                  src={img || '/images/hero/hero.jpg'}
                  alt={`Property image ${index + 1}`}
                  width={400}
                  height={300}
                  className="object-cover w-full h-48"
                  onError={(e) => {
                    console.log('Image error for:', img);
                    e.target.src = '/images/hero/hero.jpg';
                  }}
                />
              </div>
            );
          })}
        </Slider>
        <button
          className="absolute top-2 right-2 p-1.5 rounded-full bg-black/20 transition-colors"
          disabled
        >
          <svg
            className="w-5 h-5"
            fill={property.userLiked ? 'red' : 'gray'}
            stroke="white"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </button>
      </div>

      <div className="pt-3 px-2 pb-4">
        <div className="flex items-center justify-between mb-1">
          <p className="font-medium text-sm text-black truncate max-w-[180px]">
            {`${property.city}, ${property.country}` || 'Unknown Location'}
          </p>
          <span className="flex items-center gap-1">
            <svg className="w-4 h-4 fill-black" viewBox="0 0 24 24">
              <path d="M12 .587l3.668 7.568L24 9.75l-6 5.849L19.335 24 12 20.065 4.665 24 6 15.599 0 9.75l8.332-1.595z" />
            </svg>
            <span className="text-sm">{property.rating || 0}</span>
          </span>
        </div>

        <div className="flex items-center text-sm text-gray-800 gap-4 py-1">
          <span className="flex items-center gap-1">
            <Image src="/images/icons/bed.png" alt="Bed" width={16} height={16} />
            {property.bedCount || 0} Beds
          </span>
          <span className="flex items-center gap-1">
            <Image src="/images/icons/bath.png" alt="Bath" width={16} height={16} />
            {property.bathroomCount || 0} Baths
          </span>
        </div>

        <div className="flex items-center justify-between text-sm text-black font-medium mt-2">
          <p>
            ₦{parseFloat(property.pricePerNight || 0).toLocaleString()}
            <span className="font-normal text-gray-500"> / night</span>
          </p>
          <Link href={`/property/${property.id}`}>
            <button className="text-xs bg-black text-white px-3 py-1 rounded-full hover:bg-gray-800 transition-colors">
              View
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const SkeletonLoader = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const skeletonCount = isMobile ? 1 : 4;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-[100px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mt-2" />
          </div>
          <div className={isMobile ? 'space-y-6' : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'}>
            {Array.from({ length: skeletonCount }).map((_, index) => (
              <PropertyCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

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
  const dispatch = useDispatch();
  const { properties, loading, error } = useSelector((state) => state.wishlist);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  console.log('WishlistProperties mounted, properties:', properties);
  console.log('Wishlist state:', { properties, loading, error });

  useEffect(() => {
    const token = localStorage.getItem('accessToken'); // Fixed to match getAuthToken
    console.log('useEffect triggered, token:', token);
    if (!token) {
      console.log('No token, showing toast');
      toast.error('Please log in to view your wishlist', {
        position: 'top-right',
        duration: 4000,
      });
      // Optional: Redirect to login page
      // window.location.href = '/login';
      return;
    }
    dispatch(fetchWishlistAsync());
  }, [dispatch]);

  if (loading) {
    console.log('Rendering SkeletonLoader');
    return <SkeletonLoader />;
  }
  if (!properties.length) {
    console.log('Rendering EmptyState, error:', error);
    if (error) {
      toast.error(error, {
        position: 'top-right',
        duration: 4000,
      });
    }
    return <EmptyState />;
  }

  console.log('Rendering properties:', properties);

  return (
    <div className="min-h-screen bg-white">
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            zIndex: 10000,
            maxWidth: '500px',
            fontSize: '16px',
            padding: '16px',
            borderRadius: '8px',
          },
          success: {
            style: {
              background: '#f0fdf4',
              color: '#166534',
              border: '1px solid #4ade80',
            },
          },
          error: {
            style: {
              background: '#fef2f2',
              color: '#991b1b',
              border: '1px solid #f87171',
            },
          },
        }}
      />
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