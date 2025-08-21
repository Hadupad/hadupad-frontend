import { Star, MapPin, Share, Heart } from 'lucide-react';

export default function PropertyHeader({ property }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
      <div className="mb-4 md:mb-0">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-2">
          {property.name}
        </h1>
        <div className="flex items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-red-500 text-red-500" />
            <span className="font-medium">{property.rating}</span>
            <span className="underline">{property.host.reviews} reviews</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span className="underline">{property.location}</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <Share className="w-4 h-4" />
          Share
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
          <Heart className="w-4 h-4" />
          Like
        </button>
      </div>
    </div>
  );
}
