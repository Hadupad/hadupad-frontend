import { Home, Sparkles, Key, Calendar, Star, Shield, MessageCircle, Clock } from 'lucide-react';

export default function PropertyDetails({ property }) {
  const reviews = [
    {
      name: "Jose",
      date: "December 2024",
      comment: "Host was very attentive.",
      avatar: "J"
    },
    {
      name: "Luke", 
      date: "December 2024",
      comment: "Nice place to stay!",
      avatar: "L"
    },
    {
      name: "Vladko",
      date: "November 2024", 
      comment: "This is amazing place. It has everything one needs for a monthly business stay. Very clean and organized place. Amazing hospitality affordable price",
      avatar: "V"
    },
    {
      name: "Shayna",
      date: "December 2024",
      comment: "Wonderful neighborhood, easy access to restaurants and the subway, cozy studio apartment with a super comfortable bed. Great host, super helpful and responsive. Cool murphy bed.",
      avatar: "S"
    }
  ];

  const ratingCategories = [
    { name: "Cleanliness", rating: 5.0 },
    { name: "Communication", rating: 5.0 },
    { name: "Check-in", rating: 5.0 },
    { name: "Accuracy", rating: 5.0 },
    { name: "Location", rating: 4.9 },
    { name: "Value", rating: 4.7 }
  ];

  return (
    <div className="space-y-8">
      {/* Property Title and Basic Info */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Modern, Classy Apartment in The Buj
        </h1>
        <p className="text-gray-600">
          2 guests · 1 bedroom · 1 bed · 1 bath
        </p>
      </div>

      {/* Property Features */}
      <div className="space-y-4 py-6 border-t border-gray-200">
        <div className="flex items-start gap-4">
          <Home className="w-6 h-6 text-gray-700 mt-1" />
          <div>
            <h3 className="font-medium text-gray-900">Entire home</h3>
            <p className="text-sm text-gray-600">You'll have the apartment to yourself</p>
          </div>
        </div>
        
        <div className="flex items-start gap-4">
          <Sparkles className="w-6 h-6 text-gray-700 mt-1" />
          <div>
            <h3 className="font-medium text-gray-900">Enhanced Clean</h3>
            <p className="text-sm text-gray-600">
              This Host committed to enhanced cleaning process. 
              <button className="text-gray-900 underline ml-1">Show more</button>
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Key className="w-6 h-6 text-gray-700 mt-1" />
          <div>
            <h3 className="font-medium text-gray-900">Self check-in</h3>
            <p className="text-sm text-gray-600">Check yourself in with the keypad</p>
          </div>
        </div>

        <div className="flex items-start gap-4">
          <Calendar className="w-6 h-6 text-gray-700 mt-1" />
          <div>
            <h3 className="font-medium text-gray-900">Free cancellation before Apr 01</h3>
          </div>
        </div>
      </div>

      {/* Host Section */}
      <div className="py-6 border-t border-gray-200">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-gray-600 font-medium text-lg">C</span>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">Hosted by Chibuke</h3>
            <p className="text-sm text-gray-600">Joined January 2025</p>
          </div>
        </div>

        <div className="flex items-center gap-6 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-red-500 fill-current" />
            <span className="text-sm text-gray-700">12 Reviews</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="w-4 h-4 text-gray-700" />
            <span className="text-sm text-gray-700">Identity verified</span>
          </div>
        </div>

        <p className="text-gray-700 mb-4">
          Our hosts are experienced, highly rated hosts who are committed to providing great stays for guests.
        </p>

        <div className="space-y-2 mb-6">
          <p className="text-sm text-gray-700">Response rate: 100%</p>
          <p className="text-sm text-gray-700">Response time: within an hour</p>
        </div>

        <button className="px-6 py-2 border border-gray-900 rounded-lg text-gray-900 font-medium hover:bg-gray-50 transition-colors">
          Contact Host
        </button>

        <div className="flex items-start gap-3 mt-6 p-4 bg-gray-50 rounded-lg">
          <Shield className="w-5 h-5 text-gray-700 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-700">
            To protect your payment, never transfer money or communicate outside of the Hadupad website or app.
          </p>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="py-6 border-t border-gray-200">
        <div className="flex items-center gap-2 mb-6">
          <Star className="w-5 h-5 text-red-500 fill-current" />
          <span className="text-lg font-medium">5.0 · 7 reviews</span>
        </div>

        {/* Rating Categories */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {ratingCategories.map((category) => (
            <div key={category.name} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{category.name}</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-1 bg-gray-200 rounded-full">
                  <div 
                    className="h-1 bg-gray-900 rounded-full" 
                    style={{ width: `${(category.rating / 5) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-700 w-8">{category.rating}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Individual Reviews */}
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div key={index} className="flex gap-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-gray-600 font-medium text-sm">{review.avatar}</span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-gray-900">{review.name}</span>
                  <span className="text-sm text-gray-600">{review.date}</span>
                </div>
                <p className="text-gray-700 text-sm">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <button className="text-sm text-gray-700 underline">Show more ↓</button>
        </div>

        <button className="mt-4 px-6 py-2 border border-gray-900 rounded-lg text-gray-900 font-medium hover:bg-gray-50 transition-colors">
          Show all 7 reviews
        </button>
      </div>
    </div>
  );
}
