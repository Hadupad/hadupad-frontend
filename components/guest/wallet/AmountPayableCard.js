"use client";

import Image from "next/image";

export default function AmountCard({ title, amount, note }) {
  return (
<div className="bg-white rounded-[28.81px] w-[356px] h-[200px] p-4 shadow-sm border">
      {/* Top: Icon and Title */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#FFE7DC] flex items-center justify-center rounded-full">
          <Image
            src="/images/host/wallet/amount-icon.png"
            alt="Money Icon"
            width={482}
            height={482}
            className="object-contain"
          />
        </div>
        <h2 className="text-sm font-semibold text-black">{title}</h2>
      </div>

      {/* Divider */}
      <div className="border-t my-3 mt-8" />

      {/* Amount */}
      <div className="text-2xl font-bold text-black mb-1">₦ {amount}</div>

      {/* Note */}
      <p className="text-sm text-gray-500">{note}</p>
    </div>
  );
}
