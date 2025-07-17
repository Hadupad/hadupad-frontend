"use client";

import { X, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

const ProfilePhotoCard = ({ onComplete, onBack }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handlePhotoSubmit = async () => {
    if (!selectedImage) return;
    setIsLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1000)); // Simulate upload
      setIsSuccess(true);
      setTimeout(() => {
        if (onComplete) onComplete(selectedImage);
      }, 1500);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    setIsSuccess(true);
    setTimeout(() => {
      if (onComplete) onComplete(null);
    }, 1500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 relative">
        <button
          onClick={onBack}
          className="absolute left-4 text-gray-600 hover:text-black"
        >
          <X size={24} />
        </button>

        {isSuccess ? (
          <div className="text-center py-10">
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h2 className="text-xl font-bold mb-2">Registration Successful!</h2>
            <p className="text-gray-600">Your account is ready. Welcome!</p>
          </div>
        ) : (
          <>
            <h2 className="text-center text-lg font-semibold mb-4">
              Create your profile
            </h2>

            <div className="-mx-6 mt-4 mb-8">
              <hr className="border-t border-gray-100" />
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-6">
                Pick an image that shows your face. Agents won't see it until
                your reservation is confirmed.
              </p>

              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
                  {imagePreviewUrl ? (
                    <img
                      src={imagePreviewUrl}
                      alt="Selected"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <Image
                      src="/images/proflie/pf.png"
                      alt="profile-image"
                      width={96}
                      height={96}
                      className="object-cover rounded-full"
                    />
                  )}
                </div>
              </div>

              <input
                id="fileInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              {selectedImage ? (
                <button
                  onClick={handlePhotoSubmit}
                  disabled={isLoading}
                  className={`w-full py-3 rounded-xl text-white font-semibold ${
                    isLoading
                      ? "bg-gray-400"
                      : "bg-[#DC4731] hover:bg-[#c03d29]"
                  } transition mb-3`}
                >
                  {isLoading ? "Uploading..." : "Done"}
                </button>
              ) : (
                <button
                  onClick={() => document.getElementById("fileInput").click()}
                  className="w-full py-3 rounded-xl text-white font-semibold bg-[#DC4731] hover:bg-[#c03d29] transition mb-3"
                >
                  Upload a photo
                </button>
              )}

              <button
                onClick={() => document.getElementById("fileInput").click()}
                className="w-full py-3 rounded-xl border border-gray-300 font-semibold text-sm mb-2"
              >
                {selectedImage ? "Change photo" : "Use Facebook photo"}
              </button>

              <button
                onClick={handleSkip}
                className="underline text-gray-600 hover:text-black text-sm"
              >
                I&apos;ll do this later
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePhotoCard;
