"use client";

export default function BottomNav({ onBack, onNext, nextLabel = "Next", loading = false }) {
  return (
    <div className="fixed bottom-0 left-0 lg:left-56 w-full lg:w-[calc(100%-14rem)] border-t border-gray-300 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center z-50 bg-white shadow">
      <button
        onClick={onBack}
        className="text-black underline text-xs sm:text-sm font-semibold hover:text-gray-700 cursor-pointer"
      >
        Back
      </button>

      <button
        onClick={onNext}
        className={`bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 rounded text-xs sm:text-sm font-semibold flex items-center justify-center min-w-[60px] sm:min-w-[80px] ${
          loading ? "opacity-75 cursor-not-allowed" : "cursor-pointer"
        }`}
        disabled={loading}
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 text-white mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
              ></path>
            </svg>
            Processing...
          </>
        ) : (
          nextLabel
        )}
      </button>
    </div>
  );
}