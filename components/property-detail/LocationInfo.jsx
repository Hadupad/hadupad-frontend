import Map from './Map';

export default function LocationInfo({ property }) {
  return (
    <div className="space-y-4 max-w-2xl">
      <div>
        <h2 className="text-lg font-semibold text-gray-900 mb-3">Where you'll be</h2>
        
        {/* Interactive Map */}
        <div className="w-full h-48 mb-3">
          <Map />
        </div>
        
        {/* Location description */}
        <p className="text-gray-700 text-sm mb-4">
          Jabi is a quiet residential area around its namesake lake, lined with walking paths and dotted with boats, plus a handful of chic cocktail lounges and rooftop bars overlooking the water. Nearby is Jabi Park, popular for horseback riding and recreational soccer games.
        </p>
      </div>

      {/* Address details */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium text-red-500 mb-1 text-sm">Address</h3>
          <p className="text-gray-900 text-sm">Jabi, Abuja</p>
        </div>
        <div>
          <h3 className="font-medium text-red-500 mb-1 text-sm">City</h3>
          <p className="text-gray-900 text-sm">Abuja</p>
        </div>
        <div>
          <h3 className="font-medium text-red-500 mb-1 text-sm">State</h3>
          <p className="text-gray-900 text-sm">FCT</p>
        </div>
        <div>
          <h3 className="font-medium text-red-500 mb-1 text-sm">Country</h3>
          <p className="text-gray-900 text-sm">Nigeria</p>
        </div>
      </div>
    </div>
  );
}
