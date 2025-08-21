// hooks/useWishlist.js
"use client";

import { useState, useEffect } from 'react';
import { getLikedProperties } from '../data/properties';

export default function useWishlist() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchWishlistProperties = async () => {
      setLoading(true);
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get only liked properties from our dummy data
      const likedProperties = getLikedProperties();
      
      setProperties(likedProperties);
      setLoading(false);
    };

    fetchWishlistProperties();
  }, []);

  return { properties, loading };
}
