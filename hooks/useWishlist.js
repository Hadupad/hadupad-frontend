// hooks/useWishlist.js
"use client";

import { useEffect, useState } from "react";

export default function useWishlist() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const useMockData = true; // Set to false when backend is ready

    if (useMockData) {
      setProperties([
        {
          id: 1,
          location: "Mpape Phase 1",
          images: ["/images/properties/1.png", "/images/properties/2.png", "/images/properties/3.png"],
          beds: 3,
          baths: 2,
          price: 150000,
          rating: 4.8,
          wishlisted: true 
        },
        {
          id: 2,
          location: "Jabi, Abuja",
          images: ["/images/properties/1.png", "/images/properties/2.png", "/images/properties/3.png"],
          beds: 3,
          baths: 3,
          price: 50000,
          rating: 4.91,
          wishlisted: true 
        },
        {
          id: 3,
          location: "Ikoyi, Lagos",
          images: ["/images/properties/1.png", "/images/properties/2.png", "/images/properties/3.png"],
          beds: 4,
          baths: 4,
          price: 250000,
          rating: 4.75,
          wishlisted: true 
        },
        {
          id: 4,
          location: "Lekki Phase 1",
          images: ["/images/properties/1.png", "/images/properties/2.png", "/images/properties/3.png"],
          beds: 3,
          baths: 2,
          price: 150000,
          rating: 4.8,
          wishlisted: true 
        },
        {
          id: 5,
          location: "Jabi, Abuja",
          images: ["/images/properties/1.png", "/images/properties/2.png", "/images/properties/3.png"],
          beds: 3,
          baths: 3,
          price: 50000,
          rating: 4.91,
          wishlisted: true 
        },
        {
          id: 6,
          location: "Ikoyi, Lagos",
          images: ["/images/properties/1.png", "/images/properties/2.png", "/images/properties/3.png"],
          beds: 4,
          baths: 4,
          price: 250000,
          rating: 4.75,
          wishlisted: true 
        },
        {
          id: 7,
          location: "Lekki Phase 1",
          images: ["/images/properties/1.png", "/images/properties/2.png", "/images/properties/3.png"],
          beds: 3,
          baths: 2,
          price: 150000,
          rating: 4.8,
          wishlisted: true 
        },
        {
          id: 8,
          location: "Jabi, Abuja",
          images: ["/images/properties/1.png", "/images/properties/2.png", "/images/properties/3.png"],
          beds: 3,
          baths: 3,
          price: 50000,
          rating: 4.91,
          wishlisted: true 
        }
      ]);
      setLoading(false);
    } else {
      fetch("https://your-api-url.com/api/properties")
        .then((res) => res.json())
        .then((data) => {
          setProperties(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch properties:", err);
          setLoading(false);
        });
    }
  }, []);

  return { properties, loading };
}
