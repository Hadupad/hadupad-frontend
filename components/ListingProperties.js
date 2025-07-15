import React, { useState } from "react";
import Image from "next/image";
import GalleryGrid from "./GalleryGrid";
import GuestSignupModal from "./auth/SignupCard"; // Import your modal component
import { X, Facebook, Mail, Apple } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const ListingComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const desktopFeatures = [...mobileFeatures];

  const handlePhoneSubmit = async (phoneNumber) => {
    setIsLoading(true);
    try {
      // Add your phone submission logic here
      console.log("Phone number submitted:", phoneNumber);
      // If successful:
      setIsModalOpen(false);
      // If error:
      // setError("Invalid phone number format");
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="px-4 py-12 md:px-6 md:py-16 lg:py-20 max-w-screen-xl mx-auto">
      {/* Mobile Header */}
      <div className="md:hidden text-center">
        <h2 className="text-2xl font-semibold text-black leading-snug">
          Start listing your
          <br />
          Properties
        </h2>
        <p className="text-gray-600 text-sm mt-3">
          Our mission is to develop technology solutions where security is not an
          afterthought but built into the foundation.
        </p>
      </div>

      {/* Mobile Features */}
      <div className="md:hidden mt-8 space-y-8">
        {mobileFeatures.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center text-center">
            <div className="bg-[#FFF2EE] p-3 rounded-md mb-4">
              <Image
                src={item.img}
                alt={item.title}
                width={24}
                height={24}
                className="w-6 h-6"
              />
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
            afterthought but built into the foundation.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {desktopFeatures.map((feature, idx) => (
              <div key={idx} className="flex flex-col items-start">
                <div className="bg-[#FFF2EE] border border-[#CE4B2E]/20 p-3 rounded-lg mb-3">
                  <Image
                    src={feature.img}
                    alt={feature.title}
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                </div>
                <h3 className="text-lg font-semibold mb-1">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-8 bg-[#DC4731] hover:bg-[#B54228] text-white px-5 py-3 rounded font-medium transition-colors duration-200 cursor-pointer"
          >
            Get Started
          </button>
        </div>

        {/* Image Gallery */}
        <div className="mt-10 md:mt-0">
          <GalleryGrid />
        </div>
      </div>

      {/* Guest Signup Modal */}
      <GuestSignupModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setError("");
        }}
        onPhoneSubmit={handlePhoneSubmit}
        error={error}
      />
    </div>
  );
};

export default ListingComponent;