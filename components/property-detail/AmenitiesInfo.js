import {
  Wifi,
  Car,
  Utensils,
  Snowflake,
  Flame,
  Refrigerator,
  Bone,
  Video,
  Bike,
  Shield,
  Waves,
  Dumbbell,
  TreePine,
  Building,
  Users,
  Gamepad2,
  Anchor,
  Home
} from "lucide-react";

export default function AmenitiesInfo({ property }) {
  const getAmenityIcon = (amenity) => {
    const icons = {
      'WiFi': <Wifi size={20} />,
      'Kitchen': <Utensils size={20} />,
      'Parking': <Car size={20} />,
      'Security': <Shield size={20} />,
      'Pool': <Waves size={20} />,
      'Gym': <Dumbbell size={20} />,
      'Garden': <TreePine size={20} />,
      'Beach Access': <Waves size={20} />,
      'Lake Access': <Waves size={20} />,
      'Balcony': <Building size={20} />,
      'Elevator': <Building size={20} />,
      'Concierge': <Users size={20} />,
      'Playground': <Gamepad2 size={20} />,
      'Boat Dock': <Anchor size={20} />,
      'Rooftop Access': <Home size={20} />,
    };
    return icons[amenity] || <Wifi size={20} />;
  };

  return (
    <section className="text-left">
      <h2 className="text-2xl mb-4 text-gray-900">What this place offers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
        {property.amenities.map((amenity, idx) => (
          <div key={idx} className="flex items-center space-x-3">
            <div className="text-gray-700">{getAmenityIcon(amenity)}</div>
            <span className="text-base text-gray-700">{amenity}</span>
          </div>
        ))}
      </div>
      <button className="mt-6 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-100 transition">
        Show all {property.amenities.length} amenities
      </button>
    </section>
  );
}
