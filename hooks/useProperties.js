// hooks/useProperties.js
import { useEffect, useState } from "react";
import { properties } from "../data/properties";

export default function useProperties() {
  const [propertiesData, setPropertiesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const useMockData = true; // Set to false when backend is ready

    if (useMockData) {
      setPropertiesData(properties);
      setLoading(false);
    } else {
      fetch("https://your-api-url.com/api/properties")
        .then((res) => res.json())
        .then((data) => {
          setPropertiesData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch properties:", err);
          setLoading(false);
        });
    }
  }, []);

  return { properties: propertiesData, loading };
}
