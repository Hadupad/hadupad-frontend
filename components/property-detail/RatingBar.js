export default function RatingBar({ label, value }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span>{label}</span>
      <div className="flex items-center gap-2">
        <div className="w-32 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-2 bg-black"
            style={{ width: `${(value / 5) * 100}%` }}
          ></div>
        </div>
        <span>{value.toFixed(1)}</span>
      </div>
    </div>
  );
}