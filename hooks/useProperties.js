// hooks/useProperties.js
import { useEffect, useState } from "react";

export default function useProperties() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const useMockData = true; // Set to false when backend is ready

    if (useMockData) {
      setProperties([
        {
          id: 1,
          location: "Lekki Phase 1",
          images: ["/img/prop1a.jpg", "/img/prop1b.jpg", "/img/prop1c.jpg"],
          beds: 3,
          baths: 2,
          price: 150000,
          rating: 4.8,
        },
        {
          id: 2,
          location: "Jabi, Abuja",
          images: ["/img/prop2a.jpg", "/img/prop2b.jpg", "/img/prop2c.jpg"],
          beds: 3,
          baths: 3,
          price: 50000,
          rating: 4.91,
        },
        {
          id: 3,
          location: "Ikoyi, Lagos",
          images: ["/img/prop3a.jpg", "/img/prop3b.jpg", "/img/prop3c.jpg"],
          beds: 4,
          baths: 4,
          price: 250000,
          rating: 4.75,
        },
        // Add more if needed
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
