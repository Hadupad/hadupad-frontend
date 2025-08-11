import { useState } from "react";
import { Search } from "lucide-react";
import { LiaCoinsSolid } from "react-icons/lia";
import CreateModal from "./CreateModal";
import Image from "next/image";


export default function HostHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold text-black">
          Caution fee claims
        </h1>
        <p className="text-gray-400">
          Refunds are reviewed automatically upon clearance of guests
        </p>
      </div>
      <div className="flex items-center space-x-2">
        <div className="group relative flex items-center">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center justify-center cursor-pointer gap-1.5 bg-[#DC4731] hover:bg-[#c03e2b] text-white py-1.5 px-4 rounded-full text-sm transition-colors duration-200"
          >
           <Image src="/images/host/discounts/vector.png" alt="Discount image" width={14.09} height={14.09} />
            <span>Craete</span>
          </button>
          <CreateModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </div>
      </div>
    </div>
  );
}
