 import { Search, Plus } from "lucide-react";

export default function HostHeader({onCreateClick}) {
  return (
    <div className="flex items-center justify-between ">
      <h1 className="text-2xl font-semibold text-black">Your Bookings</h1>

      <div className="flex items-center space-x-2">
        {/* Search box with icon inside */}
        <div className="group relative flex items-center">
          {/* Search Button */}
          <button className="w-9 h-9 rounded-full bg-white shadow border flex items-center justify-center z-10">
            <Search className="w-4 h-4 text-gray-700 group-hover:text-red-600 transition-colors duration-300" />
          </button>

          {/* Expanding Input */}
          <div className="absolute right-0 group-hover:w-72 w-0 overflow-hidden transition-all duration-300">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search listing by name or location"
                className="pl-10 pr-4 py-2 w-full bg-white border shadow rounded-full text-sm text-gray-700 focus:outline-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
        </div>

        
      </div>
    </div>
  );
}

