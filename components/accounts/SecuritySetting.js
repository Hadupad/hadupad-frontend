"use client";

export default function SecuritySetting({
  title,
  description,
  buttonLabel,
  buttonColor = "text-black",
  onClick,
}) {
  return (
    <div className="flex justify-between items-start border-b border-gray-200 pb-4">
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <button
        onClick={onClick}
        className={`${buttonColor} text-sm font-medium hover:underline`}
      >
        {buttonLabel}
      </button>
    </div>
  );
}