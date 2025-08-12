import { Star } from "lucide-react";
import Image from "next/image";

const summaryRatings = [
  { label: "Cleanliness", value: 5.0 },
  { label: "Communication", value: 5.0 },
  { label: "Check-in", value: 5.0 },
  { label: "Accuracy", value: 5.0 },
  { label: "Location", value: 4.9 },
  { label: "Value", value: 4.7 },
];

const reviews = [
  {
    name: "Jose",
    date: "December 2024",
    avatar: "/images/avatars/jose.jpg",
    comment: "Host was very attentive.",
  },
  {
    name: "Luke",
    date: "December 2024",
    avatar: "/images/avatars/luke.jpg",
    comment: "Nice place to stay!",
  },
  {
    name: "Vladko",
    date: "November 2024",
    avatar: "/images/avatars/vladko.jpg",
    comment:
      "This is amazing place. It has everything one needs for a monthly business stay. Very clean and organized place. Amazing hospitality affordable price.",
  },
  {
    name: "Shayna",
    date: "December 2024",
    avatar: "/images/avatars/shayna.jpg",
    comment:
      "Wonderful neighborhood, easy access to restaurants and the subway, cozy studio apartment with a super comfortable bed. Great host, super helpful and responsive. Cool murphy bed...",
    showMore: true,
  },
];

export default function Reviews() {
  return (
    <div className="w-full max-w-3xl">
      <hr className="my-8 border-t border-gray-200" />
        <div className="flex items-center gap-2 mb-6">
          <Star className="text-[#B94D3A] fill-[#B94D3A] w-6 h-6" />
          <span className="text-2xl text-black-800">5.0</span>
          <span className="text-2xl text-black-800">·</span>
          <span className="text-2xl text-black-800">7 reviews</span>
      </div>
      
      {/* Summary Ratings */}
      <div className="grid grid-cols-1 gap-y-2 mb-8">
        {summaryRatings.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <span className="text-base min-w-[120px]">{item.label}</span>
            <div className="flex items-center gap-3 flex-1 ml-8">
              <div className="relative w-32 h-2 bg-gray-100 rounded">
                <div
                  className="absolute left-0 top-0 h-2 bg-black rounded"
                  style={{
                    width: `${(item.value / 5) * 100}%`,
                  }}
                />
                <div
                  className="absolute right-0 top-0 h-2 bg-gray-200 rounded"
                  style={{
                    width: `${100 - (item.value / 5) * 100}%`,
                  }}
                />
              </div>
              <span className="text-base font-medium w-8 text-right">
                {item.value.toFixed(1)}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Reviews */}
      <div className="space-y-8">
        {reviews.map((review, idx) => (
          <div key={idx} className="">
            <div className="flex items-center gap-4 mb-1">
              <Image
                src={review.avatar}
                alt={review.name}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover border"
              />
              <div>
                <div className="font-semibold">{review.name}</div>
                <div className="text-gray-400 text-sm">{review.date}</div>
              </div>
            </div>
            <div className="text-base mt-2">
              {review.comment}
              {review.showMore && (
                <div>
                  <button className="text-black underline mt-2 flex items-center gap-1">
                    Show more
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M9 5l7 7-7 7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Show all reviews button */}
      <div className="mt-5">
        <button className="w-40 border border-black rounded-xl py-3 text-base font-medium hover:bg-gray-50 transition">
          Show all 7 reviews
        </button>
      </div>
    </div>
  );
}
