"use client";

import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Image from "next/image";
import BottomNav from "../BottomNav";
import SaveExitButton from "../SaveExitButton";
import {
  uploadPhotosAsync,
  resetPhotosState,
} from "@/redux/slices/photosSlice";
import { UploadCloud } from "lucide-react";

export default function HousePhotos({ onNext, onBack, handleSaveExit }) {
  const { property } = useSelector((state) => state.property);
  const { photos, loading, error } = useSelector((state) => state.photos);
  const [selectedPhotos, setSelectedPhotos] = useState(photos || []);
  const [photoError, setPhotoError] = useState("");
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  // Clean up object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      selectedPhotos.forEach((photo) => URL.revokeObjectURL(photo.url));
    };
  }, [selectedPhotos]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const maxSize = 2 * 1024 * 1024; // 2MB limit per file

    const validFiles = files.filter((file) => {
      if (file.size > maxSize) {
        setPhotoError(`Image ${file.name} exceeds 2MB limit.`);
        toast.error(`Image ${file.name} exceeds 2MB limit.`);
        return false;
      }
      return true;
    });

    const newPhotos = validFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setSelectedPhotos([...selectedPhotos, ...newPhotos]);
    setPhotoError("");
  };

  const handleNext = async () => {
    if (!property?.id) {
      toast.error("Property ID not found. Please start over.");
      return;
    }

    if (selectedPhotos.length < 5) {
      toast.error("Please upload at least 5 photos to continue.");
      return;
    }

    const formData = new FormData();
    selectedPhotos.forEach((photo) => {
      formData.append("photos", photo.file); // Use 'photos' as the key
    });

    try {
      const result = await dispatch(
        uploadPhotosAsync({
          propertyId: property.id,
          data: formData,
        })
      ).unwrap();
      toast.success("Photos uploaded successfully");
      onNext();
      dispatch(resetPhotosState());
    } catch (err) {
      toast.error(err || "Failed to upload photos");
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      {/* <SaveExitButton onClick={handleSaveExit} /> */}

      <div className="flex flex-col items-center w-full min-h-[400px] p-6">
        <h2 className="text-2xl font-bold mt-1 mb-2">
          Add some photos of your house
        </h2>
        <p className="text-sm text-gray-600 mb-6 text-center">
          You’ll need 5 photos to get started. You can add more or make changes
          later
        </p>

        <div className="relative w-full max-w-2xl h-64 rounded-xl overflow-hidden shadow-md bg-gray-100 flex items-center justify-center border-2 border-dashed">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
            id="photo-upload"
            ref={fileInputRef}
          />
          <button
            onClick={triggerFileInput}
            className="flex items-center h-12 px-6 rounded-full bg-white hover:bg-gray-100 shadow border transition-all duration-300"
          >
            <UploadCloud size={20} className="mr-2" />
            <span className="text-sm text-gray-700 whitespace-nowrap">
              Add photos
            </span>
          </button>
        </div>

        {photoError && (
          <p className="text-red-500 text-sm text-center mt-4">{photoError}</p>
        )}
        {error && (
          <p className="text-red-500 text-sm text-center mt-4">{error}</p>
        )}

        <div className="grid grid-cols-3 gap-4 mt-4 w-full max-w-2xl">
          {selectedPhotos.map((photo, index) => (
            <div key={index} className="relative w-full h-24">
              <Image
                src={photo.url}
                alt={`Uploaded ${index + 1}`}
                fill
                className="object-cover rounded-md"
              />
            </div>
          ))}
        </div>

        <BottomNav
          onBack={onBack}
          onNext={handleNext}
          nextLabel="Continue"
          loading={loading}
        />
      </div>
    </>
  );
}
