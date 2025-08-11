"use client";

import BottomNav from "../BottomNav";
import SaveExitButton from "../SaveExitButton";

export default function HousePhotosView({ onNext, onBack, photos = [], handleSaveExit }) {
  return (
    <>
      <SaveExitButton onClick={handleSaveExit} />

      <div className="flex flex-col items-center w-full min-h-[400px]">
        <h2 className="text-xl font-semibold mb-4">Your uploaded photos</h2>

        {photos.length === 0 ? (
          <p className="text-gray-500">No photos uploaded yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-6">
            {photos.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Uploaded ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg shadow"
              />
            ))}
          </div>
        )}

        <BottomNav onBack={onBack} onNext={onNext} nextLabel="Continue" />
      </div>
    </>
  );
}
