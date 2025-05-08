"use client";

import { useRouter } from "next/navigation";
import { CheckCircle } from "lucide-react";

const WelcomePage = () => {
  const router = useRouter();

  const handleContinue = () => {
    router.push("/dashboard"); // Replace with your actual dashboard/home path
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white w-[90%] max-w-md rounded-2xl shadow-2xl p-8 relative text-center">
        <CheckCircle className="text-green-600 w-12 h-12 mx-auto mb-4" />
        
        <h2 className="text-2xl font-semibold mb-2">Welcome to the platform!</h2>
        
        <p className="text-gray-600 text-sm mb-6">
          Your account has been successfully created. We're glad to have you onboard.
        </p>

        <button
          onClick={handleContinue}
          className="w-full py-3 mt-2 rounded-xl text-white font-semibold bg-[#DC4731] hover:bg-[#c03d29] transition"
        >
          Continue to Dashboard
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
