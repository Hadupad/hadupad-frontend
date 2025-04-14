import React from "react";
import { CalendarDays, BarChart3, Share2, Zap, MessageSquare } from "lucide-react";

const ListingComponent = () => {
  const mobileFeatures = [
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
        "Easy-to-navigate interface for effortless booking and property management.",
    },
    {
      icon: <Share2 className="w-6 h-6 text-[#CE4B2E]" />,
      title: "Share Properties",
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

  const desktopFeatures = [
    {
      icon: <CalendarDays className="text-[#CE4B2E] w-6 h-6" />,
      title: "Manage Availability",
      description:
        "Verification processes and secure payment systems ensure peace of mind for both hosts and guests",
    },
    {
      icon: <BarChart3 className="text-[#CE4B2E] w-6 h-6" />,
      title: "Detailed Statistics",
      description:
        "Easy-to-navigate interface for effortless booking and property management.",
    },
    {
      icon: <MessageSquare className="text-[#CE4B2E] w-6 h-6" />,
      title: "Client Feedback",
      description:
        "Our dedicated support team is available around the clock to assist with any questions or concerns",
    },
    {
      icon: <Zap className="text-[#CE4B2E] w-6 h-6" />,
      title: "Track Payments",
      description:
        "Verification processes and secure payment systems ensure peace of mind for both hosts and guests",
    },
  ];

  return (
    <div className="px-4 py-10 md:px-6 md:py-12 lg:py-20 max-w-screen-xl mx-auto">
      {/* Mobile Header (shown on mobile only) */}
      <div className="md:hidden text-center">
        <h2 className="text-2xl font-semibold text-black leading-snug">
          Start listing your<br />Properties
        </h2>
        <p className="text-gray-600 text-sm mt-3">
          Our mission is to develop technology solutions where security is not an
        </p>
      </div>

      {/* Desktop Header (shown on desktop only) */}
      <div className="hidden md:block text-center mb-12">
        <h1 className="text-3xl lg:text-5xl font-semibold">
          Start listing your Properties
        </h1>
        <p className="text-gray-600 mt-4">
          Our mission is to develop technology solutions where security is not an
        </p>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden mt-8 space-y-8">
        {mobileFeatures.map((item, idx) => (
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

      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-2 gap-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {desktopFeatures.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-start">
              <div className="bg-[#FFF2EE] p-3 rounded-lg mb-3">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
          <button className="col-span-1 sm:col-span-2 w-fit bg-[#DC4731] hover:bg-[#B54228] text-white px-4 py-2 rounded mt-4">
            Get Started
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 md:gap-6">
          <img
            src="/images/img1.jpg"
            alt="Living room"
            className="rounded-xl w-full object-cover"
          />
          <img
            src="/images/img2.jpg"
            alt="Bookshelf"
            className="rounded-xl w-full object-cover"
          />
          <img
            src="/images/img3.jpg"
            alt="Staircase"
            className="rounded-xl w-full object-cover"
          />
          <img
            src="/images/img4.jpg"
            alt="Bedroom"
            className="rounded-xl w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default ListingComponent;