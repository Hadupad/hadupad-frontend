import React from "react";
import GalleryGrid from "./GalleryGrid";

const ListingComponent = () => {
  const mobileFeatures = [
    {
      img: "/images/icons/vector1.png",
      title: "Manage Availability",
      description:
        "Verification processes and secure payment systems ensure peace of mind for both hosts and guests.",
    },
    {
      img: "/images/icons/vector2.png",
      title: "Detailed Statistics",
      description:
        "Easy-to-navigate interface for effortless booking and property management.",
    },
    {
      img: "/images/icons/vector3.png",
      title: "Share Properties",
      description:
        "Our dedicated support team is available around the clock to assist with any questions or concerns",
    },
    {
      img: "/images/icons/vector4.png",
      title: "Track Payments",
      description:
        "Verification processes and secure payment systems ensure peace of mind for both hosts and guests.",
    },
  ];

  const desktopFeatures = [...mobileFeatures]; // Use same data

  return (
    <div className="px-4 py-10 md:px-6 md:py-12 lg:py-20 max-w-screen-xl mx-auto">
      {/* Mobile Header */}
      <div className="md:hidden text-center">
        <h2 className="text-2xl font-semibold text-black leading-snug">
          Start listing your
          <br />
          Properties
        </h2>
        <p className="text-gray-600 text-sm mt-3">
          Our mission is to develop technology solutions where security is not an
        </p>
      </div>

      {/* Mobile Features */}
      <div className="md:hidden mt-8 space-y-8">
        {mobileFeatures.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center text-center">
            <div className="bg-[#FFF2EE] p-3 rounded-md mb-4">
              <img src={item.img} alt={item.title} className="w-6 h-6" />
            </div>
            <h3 className="font-medium text-black text-sm mb-1">
              {item.title}
            </h3>
            <p className="text-xs text-gray-600 max-w-xs">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-16 lg:gap-24 items-start">
        {/* Text and Features */}
        <div>
          <h1 className="text-3xl lg:text-4xl font-semibold mb-4">
            Start listing your Properties
          </h1>
          <p className="text-gray-600 mb-8">
            Our mission is to develop technology solutions where security is not an
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {desktopFeatures.map((feature, idx) => (
              <div key={idx} className="flex flex-col items-start">
                <div className="bg-[#FFF2EE] border border-[#CE4B2E] p-3 rounded-lg mb-3">
                  <img src={feature.img} alt={feature.title} className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          <button className="mt-8 bg-[#DC4731] hover:bg-[#B54228] text-white px-5 py-3 rounded font-medium">
            Get Started
          </button>
        </div>

        {/* Image Gallery */}
        <div className="mt-10 md:mt-0">
          <GalleryGrid />
        </div>
      </div>
    </div>
  );
};

export default ListingComponent;
