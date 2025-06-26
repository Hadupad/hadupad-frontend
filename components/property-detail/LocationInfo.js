import dynamic from 'next/dynamic';

// Dynamically import Map component without SSR
const Map = dynamic(() => import('./Map'), {
  ssr: false,
});

export default function LocationInfo() {
  const description =
    "Jabi is a quiet residential area around its namesake lake, lined with walking paths and dotted with boats, plus a handful of chic cocktail lounges and rooftop bars overlooking the water. Nearby is Jabi Park, popular for horseback riding and recreational soccer games.";

  return (
    <div>
      <h2 className="text-2xl mb-4 text-black-800">Where you'll be</h2>

      <div className="w-[60%] mb-6">
        {/* Correctly render the map */}
        <Map />
        <p className="text-gray-700 mb-4">{description}</p>
      </div>

      <hr className="my-8 border-t border-gray-200" />

      <div className="w-[60%] grid grid-cols-2 gap-x-0 gap-y-4">
        <div className="p-0 m-0">
          <p className="text-base font-semibold text-[#B94D3A] mb-1">Address</p>
          <p className="text-gray-700">Jabi, Abuja</p>
        </div>
        <div className="p-0 m-0">
          <p className="text-base font-semibold text-[#B94D3A] mb-1">City</p>
          <p className="text-gray-700">Abuja</p>
        </div>
        <div className="p-0 m-0">
          <p className="text-base font-semibold text-[#B94D3A] mb-1">State</p>
          <p className="text-gray-700">Federal Capital Territory</p>
        </div>
        <div className="p-0 m-0">
          <p className="text-base font-semibold text-[#B94D3A] mb-1">Country</p>
          <p className="text-gray-700">Nigeria</p>
        </div>
      </div>
    </div>
  );
}
