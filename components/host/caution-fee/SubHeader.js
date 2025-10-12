import { useState } from "react";
import { Search } from "lucide-react";
import { LiaCoinsSolid } from "react-icons/lia";
import ClaimModal from "./ClaimModal";

export default function HostHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 px-4 lg:px-0">
      <div>
        <h1 className="text-xl lg:text-2xl font-semibold text-black">
          Caution Fee Claims
        </h1>
        <p className="text-sm lg:text-base text-gray-400 hidden lg:block">
          Refunds are reviewed automatically upon clearance of guests
        </p>
      </div>
      <div className="flex items-center space-x-2">
        {/* Mobile: Only show search and claim icons */}
        <div className="lg:hidden flex items-center space-x-2">
          <button className="w-9 h-9 rounded-full bg-white shadow border flex items-center justify-center">
            <Search className="w-4 h-4 text-gray-700" />
          </button>
          <button 
            onClick={() => setIsOpen(true)}
            className="w-9 h-9 rounded-full bg-[#DC4731] hover:bg-[#c03e2b] flex items-center justify-center transition-colors duration-200"
          >
            <LiaCoinsSolid className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Desktop: Full search and claim functionality */}
        <div className="hidden lg:flex items-center space-x-2">
          <div className="group relative flex items-center">
            <button className="w-9 h-9 rounded-full bg-white shadow border flex items-center justify-center z-10">
              <Search className="w-4 h-4 text-gray-700 group-hover:text-red-600 transition-colors duration-300" />
            </button>
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

          <div className="group relative flex items-center">
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center justify-center cursor-pointer gap-1.5 bg-[#DC4731] hover:bg-[#c03e2b] text-white py-1.5 px-4 rounded-full text-sm transition-colors duration-200"
            >
              <LiaCoinsSolid className="text-base" />
              <span>Claim</span>
            </button>
          </div>
        </div>
      </div>
      <ClaimModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
