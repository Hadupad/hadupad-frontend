"use client";

export default function InfoSection({ title, value, buttonLabel, onClick }) {
  const displayValue = value || "Not provided";
  const displayButton = buttonLabel || (value ? "Edit" : "Add");

  return (
    <div className="flex justify-between items-center border-b border-gray-200 py-4">
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className={`text-sm ${value ? "text-gray-700" : "text-gray-400"}`}>
          {displayValue}
        </p>
      </div>
      {onClick && (
        <button
          onClick={onClick}
          className="text-sm font-medium text-black hover:underline"
        >
          {displayButton}
        </button>
      )}
    </div>
  );
}
