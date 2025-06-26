"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image from "next/image";

export default function OtherProperties() {
  const properties = [
    {
      id: 1,
      location: "Modern Apartment, Lagos",
      beds: 2,
      baths: 1,
      price: "$120",
      rating: 4.82,
      images: [
        "/images/hero/hero.jpg",
        "/images/properties/1.png",
        "/images/properties/2.png",
      ],
    },
    {
      id: 2,
      location: "Beach House, Accra",
      beds: 3,
      baths: 2,
      price: "$200",
      rating: 4.9,
      images: [
        "/images/properties/2.png",
        "/images/properties/1.png",
        "/images/properties/2.png",
      ],
    },
    {
      id: 3,
      location: "Luxury Villa, Nairobi",
      beds: 4,
      baths: 3,
      price: "$350",
      rating: 5.0,
      images: [
        "/images/properties/3.png",
        "/images/properties/1.png",
        "/images/properties/2.png",
      ],
    },
    {
      id: 4,
      location: "Cozy Cabin, Cape Town",
      beds: 1,
      baths: 1,
      price: "$90",
      rating: 4.7,
      images: [
        "/images/properties/4.png",
        "/images/properties/1.png",
        "/images/properties/2.png",
      ],
    },
  ];

  return (
    <section className="px-4 md:px-12 py-30">
      <div className="flex flex-wrap justify-center gap-6">
        {properties.map((prop) => (
          <PropertyCard key={prop.id} property={prop} />
        ))}
      </div>
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
    <div className="w-[260px]">
      <div className="relative h-[180px] rounded-[12px] overflow-hidden">
        <Slider {...imageSettings} className="h-full">
          {property.images.map((img, index) => (
            <div key={index} className="h-full w-full">
              <Image
                src={img}
                alt={`Image ${index + 1} of ${property.location}`}
                width={260}
                height={180}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </Slider>

        <button className="absolute top-2 right-2 bg-white/70 backdrop-blur p-1.5 rounded-full">
          <svg
            className="w-4 h-4 text-black"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
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

      <div className="mt-2">
        <p className="font-medium text-sm text-black truncate">
          {property.location}
        </p>
        <div className="flex items-center text-xs text-gray-500 my-1 gap-2">
          {/* <span>🛏 {property.beds} Beds</span>
          <span>🛁 {property.baths} Baths</span> */}

          import Image from "next/image";

<span className="flex items-center gap-1">
  <Image src="images/icons/bed.png" alt="Bed" width={16} height={16} />
  {property.beds} Beds
</span>

<span className="flex items-center gap-1">
  <Image src="images/icons/bath.png" alt="Bath" width={16} height={16} />
  {property.baths} Baths
</span>

        </div>
        <div className="flex items-center justify-between mt-1">
          <p className="font-semibold text-black">
             #{property.price.toLocaleString()}<span className="text-sm font-normal text-[#222222]">/night</span>
          </p>
          <span className="flex items-center gap-1 text-sm">
            <svg className="w-4 h-4 fill-black text-white" viewBox="0 0 24 24">
              <path d="M12 .587l3.668 7.568L24 9.75l-6 5.849L19.335 24 12 20.065 4.665 24 6 15.599 0 9.75l8.332-1.595z" />
            </svg>
            {property.rating}
          </span>
        </div>
      </div>
    </div>
  );
}
