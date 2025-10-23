"use client";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useMediaQuery } from "react-responsive";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublicProperties } from "@/redux/slices/publicPropertySlice";
import { resetSearchState } from "@/redux/slices/searchSlice";

export default function FeaturedProperties() {
  const dispatch = useDispatch();
  const publicProperty = useSelector((state) => state.publicProperty || {});
  const searchState = useSelector((state) => state.search || {});
  const { properties: publicProperties = [], loading: publicLoading = false, error: publicError = null } = publicProperty;
  const { results = {}, loading: searchLoading = false, error: searchError = null } = searchState;
  const isMobile = useMediaQuery({ maxWidth: 768 });

  // Reset search state on page refresh (component mount)
  useEffect(() => {
    dispatch(resetSearchState());
  }, [dispatch]);

  // Fetch public properties if no search results
  useEffect(() => {
    if (!results.properties || results.properties.length === 0) {
      dispatch(fetchPublicProperties());
    }
  }, [dispatch, results]);

  // Limit to 3 properties
  const properties = results.properties && results.properties.length > 0 
    ? results.properties.slice(0, 3) 
    : publicProperties.slice(0, 3);

  const loading = searchLoading || publicLoading;
  const error = searchError || publicError;

  const mobileSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    arrows: false,
  };

  if (error) return <p className="text-center py-8">Error: {error}</p>;
  if (!properties.length && !loading)
    return <p className="text-center py-8">No properties found.</p>;

  return (
    <section className="px-4 md:px-12 py-8">
      <div className="mb-6">
        <div className="text-center mb-2">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            {results.properties && results.properties.length > 0 ? "Search Results" : "Some homes you might like"}
          </h2>
        </div>
        <div className="flex justify-end">
          <Link
            className="font-medium text-black flex items-center gap-1 hover:underline"
            href="/properties"
          >
            Explore All <span>→</span>
          </Link>
        </div>
      </div>

      {loading ? (
        isMobile ? (
          <Slider {...mobileSettings} className="mx-2">
            {Array(3).fill().map((_, index) => (
              <SkeletonPropertyCard key={index} />
            ))}
          </Slider>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array(3).fill().map((_, index) => (
              <SkeletonPropertyCard key={index} />
            ))}
          </div>
        )
      ) : isMobile ? (
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

function SkeletonPropertyCard() {
  return (
    <div className="cursor-pointer bg-transparent p-0 rounded-xl shadow-none">
      <div className="relative rounded-xl overflow-hidden">
        <div className="w-full h-[300px] bg-gray-200 animate-pulse rounded-xl"></div>
        <div className="absolute top-2 right-2 bg-gray-300 p-2 rounded-full w-9 h-9 animate-pulse"></div>
      </div>
      <div className="pt-2">
        <div className="flex items-center justify-between text-black text-sm">
          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
        </div>
        <div className="flex items-center text-sm text-white gap-4 py-1 font-semibold">
          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
      </div>
    </div>
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

  // Use photos if available (search results), otherwise fall back to images (public properties), or an empty array
  const images = property.photos || property.images || [];
  // Use bedCount or beds, default to 0
  const bedCount = property.bedCount || property.beds || 0;
  // Use bathroomCount or baths, default to 0
  const bathCount = property.bathroomCount || property.baths || 0;
  // Use pricePerNight or price, default to 0
  const price = property.pricePerNight || property.price || 0;
  // Use city and state, or location, or fallback to 'Unknown'
  const location = property.city && property.state ? `${property.city}, ${property.state}` : property.location || 'Unknown';

  return (
    <Link href={`/property/${property.id}`}>
      <div className="cursor-pointer bg-transparent p-0 rounded-xl shadow-none hover:opacity-90 transition-all duration-200">
        <div className="relative rounded-xl overflow-hidden">
          <Slider {...imageSettings}>
            {images.length > 0 ? (
              images.map((img, index) => (
                <div key={index}>
                  <Image
                    src={img}
                    alt={`Image ${index + 1}`}
                    width={400}
                    height={378.8}
                    className="w-full h-[300px] object-cover rounded-xl"
                  />
                </div>
              ))
            ) : (
              <div>
                <Image
                  src="/images/placeholder.jpg"
                  alt="No image available"
                  width={400}
                  height={378.8}
                  className="w-full h-[300px] object-cover rounded-xl"
                />
              </div>
            )}
          </Slider>

          <button className="absolute top-2 right-2 bg-black/40 p-2 rounded-full">
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

        <div className="pt-2">
          <div className="flex items-center justify-between text-black text-sm">
            <p>{location}</p>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4 fill-black" viewBox="0 0 24 24">
                <path d="M12 .587l3.668 7.568L24 9.75l-6 5.849L19.335 24 12 20.065 4.665 24 6 15.599 0 9.75l8.332-1.595z" />
              </svg>
              {property.rating || 'No rating'}
            </span>
          </div>

          <div className="flex items-center text-sm text-white gap-4 py-1 font-semibold">
            <span className="flex items-center gap-1 text-[#FF4444]">
              <Image
                src="/images/icons/bed.png"
                alt="Bed"
                width={16}
                height={16}
              />
              {bedCount} Beds
            </span>
            <span className="flex items-center gap-1 text-[#FF4444]">
              <Image
                src="/images/icons/bath.png"
                alt="Bath"
                width={16}
                height={16}
              />
              {bathCount} Baths
            </span>
          </div>

          <p className="text-black text-sm font-medium">
            #{parseFloat(price).toLocaleString()}
            <span className="text-[#222222] font-normal"> /night</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
