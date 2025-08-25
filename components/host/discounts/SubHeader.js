import { useState } from "react";
import { Search, Plus } from "lucide-react";
import CreateModal from "./CreateModal";
import Image from "next/image";

export default function HostHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="px-4 lg:px-0">
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-black">Discounts</h1>
          <div className="flex items-center space-x-3">
            <button className="p-2">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => setIsOpen(true)}
              className="p-2"
            >
              <Plus className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-black">
            Discounts
          </h1>
          <p className="text-gray-400">
            Manage your discount codes and promotional offers
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="group relative flex items-center">
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center justify-center cursor-pointer gap-1.5 bg-[#DC4731] hover:bg-[#c03e2b] text-white py-1.5 px-4 rounded-full text-sm transition-colors duration-200"
            >
             <Image src="/images/host/discounts/vector.png" alt="Discount image" width={14.09} height={14.09} />
              <span>Create</span>
            </button>
          </div>
        </div>
      </div>
      
      <CreateModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
}
