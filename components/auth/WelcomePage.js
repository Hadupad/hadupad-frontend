"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { CheckCircle, ChevronLeft, X } from "lucide-react";

const WelcomePage = ({ isOpen, onClose, onBack, userData }) => {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/dashboard");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-2xl p-8 relative">
        <button
          onClick={onClose}
          className="absolute  left-4 text-gray-600 hover:text-black"
        >
           <X size={24} />
        </button>

        <h2 className="text-center text-lg font-semibold mb-4">Create your profile</h2>
        

        <div className="-mx-8 mt-4 mb-10">
          <hr className="border-t border-gray-100" />
        </div>

        <div className="text-center">
          <Image
            src="/images/logo/main logo.png"
            alt="Main Logo"
            width={50}
            height={31.97}
            className="mx-auto h-6 md:h-8 w-auto mb-4"
          />

          <h2 className="text-2xl font-semibold mb-2">Welcome to Hadupad</h2>

          <p className="text-gray-600 text-sm mb-6">
            Experience places, Experience comfort, Experience Us.
          </p>

          <button
            onClick={handleContinue}
            className="w-full py-3 rounded-xl text-white font-semibold bg-[#DC4731] hover:bg-[#c03d29] transition"
          >
            Continue
          </button>

          <div className="text-center mt-2 text-sm">
          <button className="underline text-gray-600 hover:text-black">I'll do this later</button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
