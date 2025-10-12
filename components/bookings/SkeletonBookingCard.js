// components/bookings/SkeletonBookingCard.jsx
const SkeletonBookingCard = () => {
  return (
    <div className="rounded-2xl shadow border p-4 w-full max-w-sm flex flex-col justify-between border-gray-200 animate-pulse">
      <div>
        <div className="flex justify-between items-start">
          <div className="h-6 bg-gray-200 rounded w-3/4"></div>
          <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
        </div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3 mt-2"></div>

        <div className="flex justify-between mt-4">
          <div>
            <div className="h-4 bg-gray-200 rounded w-16 mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-24"></div>
          </div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-16 mb-1"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-4 pt-2 border-t border-gray-200">
        <div className="h-4 bg-gray-200 rounded w-20"></div>
        <div className="flex space-x-2">
          <div className="h-4 bg-gray-200 rounded w-16"></div>
          <div className="h-4 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonBookingCard;