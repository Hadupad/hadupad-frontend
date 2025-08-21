export const properties = [
  {
    id: 1,
    name: "Luxury Waterfront Villa",
    location: "Victoria Island, Lagos",
    price: 150000,
    beds: 4,
    baths: 3,
    rating: 4.8,
    images: [
      "/images/hero/hero.jpg",
      "/images/hero/hero.jpg",
      "/images/hero/hero.jpg"
    ],
    isLiked: true,
    description: "Stunning waterfront villa with panoramic ocean views",
    amenities: ["Pool", "WiFi", "Kitchen", "Parking", "Security"],
    host: {
      name: "Adebayo Johnson",
      joinDate: "January 2023",
      reviews: 45,
      verified: true
    }
  },
  {
    id: 2,
    name: "Modern Penthouse Suite",
    location: "Ikoyi, Lagos",
    price: 250000,
    beds: 3,
    baths: 2,
    rating: 4.9,
    images: [
      "/images/hero/hero.jpg",
      "/images/hero/hero.jpg",
      "/images/hero/hero.jpg",
      "/images/hero/hero.jpg"
    ],
    isLiked: false,
    description: "Ultra-modern penthouse with city skyline views",
    amenities: ["Gym", "WiFi", "Kitchen", "Balcony", "Elevator"],
    host: {
      name: "Funmi Adebisi",
      joinDate: "March 2022",
      reviews: 67,
      verified: true
    }
  },
  {
    id: 3,
    name: "Cozy Garden Apartment",
    location: "Lekki Phase 1, Lagos",
    price: 85000,
    beds: 2,
    baths: 2,
    rating: 4.6,
    images: [
      "/images/hero/hero.jpg",
      "/images/hero/hero.jpg"
    ],
    isLiked: true,
    description: "Peaceful apartment surrounded by lush gardens",
    amenities: ["Garden", "WiFi", "Kitchen", "Parking"],
    host: {
      name: "Chidi Okafor",
      joinDate: "June 2023",
      reviews: 23,
      verified: false
    }
  },
  {
    id: 4,
    name: "Executive Duplex",
    location: "Banana Island, Lagos",
    price: 300000,
    beds: 5,
    baths: 4,
    rating: 4.7,
    images: [
      "/images/hero/hero.jpg",
      "/images/hero/hero.jpg",
      "/images/hero/hero.jpg"
    ],
    isLiked: true,
    description: "Spacious executive duplex in premium location",
    amenities: ["Pool", "WiFi", "Kitchen", "Parking", "Security", "Gym"],
    host: {
      name: "Kemi Adesanya",
      joinDate: "September 2021",
      reviews: 89,
      verified: true
    }
  },
  {
    id: 5,
    name: "Beachfront Bungalow",
    location: "Ajah, Lagos",
    price: 120000,
    beds: 3,
    baths: 2,
    rating: 4.5,
    images: [
      "/images/hero/hero.jpg",
      "/images/hero/hero.jpg",
      "/images/hero/hero.jpg",
      "/images/hero/hero.jpg"
    ],
    isLiked: false,
    description: "Charming bungalow steps away from the beach",
    amenities: ["Beach Access", "WiFi", "Kitchen", "Parking"],
    host: {
      name: "Tunde Bakare",
      joinDate: "November 2022",
      reviews: 34,
      verified: true
    }
  },
  {
    id: 6,
    name: "City Center Studio",
    location: "Lagos Island, Lagos",
    price: 65000,
    beds: 1,
    baths: 1,
    rating: 4.3,
    images: [
      "/images/hero/hero.jpg",
      "/images/hero/hero.jpg"
    ],
    isLiked: true,
    description: "Compact studio in the heart of Lagos Island",
    amenities: ["WiFi", "Kitchen", "Security"],
    host: {
      name: "Aisha Mohammed",
      joinDate: "February 2024",
      reviews: 12,
      verified: false
    }
  },
  {
    id: 7,
    name: "Family Townhouse",
    location: "Magodo, Lagos",
    price: 180000,
    beds: 4,
    baths: 3,
    rating: 4.8,
    images: [
      "/images/hero/hero.jpg",
      "/images/hero/hero.jpg",
      "/images/hero/hero.jpg"
    ],
    isLiked: false,
    description: "Perfect family home in quiet residential area",
    amenities: ["Garden", "WiFi", "Kitchen", "Parking", "Playground"],
    host: {
      name: "Emeka Nwankwo",
      joinDate: "May 2023",
      reviews: 28,
      verified: true
    }
  },
  {
    id: 8,
    name: "Luxury High-rise Apartment",
    location: "Victoria Island, Lagos",
    price: 200000,
    beds: 2,
    baths: 2,
    rating: 4.9,
    images: [
      "/images/hero/hero.jpg",
      "/images/hero/hero.jpg",
      "/images/hero/hero.jpg",
      "/images/hero/hero.jpg"
    ],
    isLiked: true,
    description: "High-rise apartment with breathtaking city views",
    amenities: ["Pool", "WiFi", "Kitchen", "Gym", "Concierge", "Security"],
    host: {
      name: "Folake Adeyemi",
      joinDate: "August 2021",
      reviews: 76,
      verified: true
    }
  },
  {
    id: 9,
    name: "Serene Lake House",
    location: "Epe, Lagos",
    price: 95000,
    beds: 3,
    baths: 2,
    rating: 4.4,
    images: [
      "/images/hero/hero.jpg",
      "/images/hero/hero.jpg"
    ],
    isLiked: false,
    description: "Peaceful retreat by the lake, perfect for relaxation",
    amenities: ["Lake Access", "WiFi", "Kitchen", "Parking", "Boat Dock"],
    host: {
      name: "Yemi Ogundimu",
      joinDate: "December 2022",
      reviews: 19,
      verified: false
    }
  },
  {
    id: 10,
    name: "Contemporary Loft",
    location: "Ikeja GRA, Lagos",
    price: 140000,
    beds: 2,
    baths: 1,
    rating: 4.6,
    images: [
      "/images/hero/hero.jpg",
      "/images/hero/hero.jpg",
      "/images/hero/hero.jpg"
    ],
    isLiked: true,
    description: "Stylish loft with modern amenities and great location",
    amenities: ["WiFi", "Kitchen", "Parking", "Security", "Rooftop Access"],
    host: {
      name: "Biodun Lawal",
      joinDate: "April 2023",
      reviews: 31,
      verified: true
    }
  }
];

// Helper function to get only liked properties
export const getLikedProperties = () => {
  return properties.filter(property => property.isLiked);
};

// Helper function to get property by ID
export const getPropertyById = (id) => {
  return properties.find(property => property.id === parseInt(id));
};

// Helper function to toggle like status
export const togglePropertyLike = (id) => {
  const property = properties.find(p => p.id === parseInt(id));
  if (property) {
    property.isLiked = !property.isLiked;
  }
  return property;
};
