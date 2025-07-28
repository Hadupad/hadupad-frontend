"use client";

import Image from "next/image";
import { MdOutlineContentCopy } from "react-icons/md";
import { useState } from "react";

export default function AccountCard() {
  const accountNumber = "1234567890"; // Replace with real account number
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2s
  };

  return (
<div className="relative text-white p-4 rounded-[28.81px] w-[356px] h-[200px] overflow-hidden flex flex-col justify-between bg-black">
      {/* Background Image */}
      <Image
        src="/images/host/wallet/card-background.png"
        alt="Card Background"
        fill
        className="object-cover rounded-lg opacity-50"
      />

      {/* Card Content Overlay */}
      <div className="relative z-10 flex flex-col h-full p-4 justify-between">
        <div>
          <span className="text-sm">Edit Details</span>
          <div className="mt-4">
            <Image
              src="/images/host/wallet/card-chip.png"
              alt="Chip"
              width={40}
              height={30}
              className="object-contain"
            />
          </div>
        </div>

        <div>
          <div className="text-sm flex items-center gap-2">
            <span>{accountNumber}</span>
            <MdOutlineContentCopy
              onClick={handleCopy}
              className="cursor-pointer hover:text-gray-300"
              title="Copy account number"
            />
            {copied && <span className="text-xs text-green-300">Copied!</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
