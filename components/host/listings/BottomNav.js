"use client";

export default function BottomNav({ onBack, onNext, nextLabel = "Next" }) {
  return (
     <div className="fixed bottom-0 left-0 w-full  border-t p-4">
          <div className="w-full max-w-3xl mx-auto flex justify-between items-center">
            <p
              onClick={onBack}
              className="text-black font-bold text-sm cursor-pointer hover:underline"
            >
              Back
            </p>

            <button
              onClick={onNext}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full text-sm font-medium"
            >
              Next
            </button>
          </div>
        </div>
  );
}
