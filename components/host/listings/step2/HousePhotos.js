"use client";

import BottomNav from "../BottomNav";
import SaveExitButton from "../SaveExitButton";

export default function HousePhotos({ onNext, onBack, handleSaveExit, photos, setPhotos }) {
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map((file) => URL.createObjectURL(file));
    setPhotos([...photos, ...newPhotos]);
  };

  return (
    <>
      <SaveExitButton onClick={handleSaveExit} />

      <div className="flex flex-col items-center w-full min-h-[400px]">
        <h2 className="text-2xl font-bold mt-1 mb-2">Add some photos of your house</h2>
        <p className="text-sm text-gray-600 mb-6">
          You’ll need 5 photos to get started. You can add more or make changes later
        </p>

        <div className="relative w-full max-w-2xl h-64 rounded-xl overflow-hidden shadow-md bg-white flex flex-col justify-end items-center pb-4">
          <input type="file" accept="image/*" multiple onChange={handleFileChange} className="hidden" id="photo-upload" />
          <label
            htmlFor="photo-upload"
            className="cursor-pointer flex items-center h-12 px-6 rounded-full bg-white hover:bg-gray-100 shadow border transition-all duration-300"
          >
            <span className="text-sm text-gray-700 whitespace-nowrap">Add photos</span>
          </label>
        </div>

        <BottomNav onBack={onBack} onNext={onNext} nextLabel="Continue" />
      </div>
    </>
  );
}
