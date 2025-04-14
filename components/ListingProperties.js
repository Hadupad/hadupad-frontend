"use client";

import { CalendarDays, BarChart3, Share2, Zap } from "lucide-react";

export default function StartListingMobile() {
  const features = [
    {
      icon: <CalendarDays className="w-6 h-6 text-[#CE4B2E]" />,
      title: "Manage Availability",
      description:
        "Verification processes and secure payment systems ensure peace of mind for both hosts and guests.",
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-[#CE4B2E]" />,
      title: "Detailed Statistics",
      description:
        "Easy-to-navigate interface for effortless booking and property management.property management.",
    },
    {
      icon: <Share2 className="w-6 h-6 text-[#CE4B2E]" />,
      title: "Detailed Statistics",
      description:
        "Our dedicated support team is available around the clock to assist with any questions or concerns",
    },
    {
      icon: <Zap className="w-6 h-6 text-[#CE4B2E]" />,
      title: "Track Payments",
      description:
        "Verification processes and secure payment systems ensure peace of mind for both hosts and guests.",
    },
  ];

  return (
    <section className="px-4 py-10 text-center">
      <h2 className="text-2xl font-semibold text-black leading-snug">
        Start listing your<br />Properties
      </h2>
      <p className="text-gray-600 text-sm mt-3">
        Our mission is to develop technology solutions where security is not an
      </p>

      <div className="mt-8 space-y-8">
        {features.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center text-center">
            <div className="bg-[#FFF2EE] p-3 rounded-md mb-4">
              {item.icon}
            </div>
            <h3 className="font-medium text-black text-sm mb-1">
              {item.title}
            </h3>
            <p className="text-xs text-gray-600 max-w-xs">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
