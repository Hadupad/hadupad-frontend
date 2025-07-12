import { Home, Sparkles, Key, CalendarX } from "lucide-react";

export default function BasicInfo() {
  return (
    <div className="w-full md:w-3/3 space-y-6">
      {/* Property Header */}
      <div>
        <h1 className="text-2xl  mb-4 text-black-800">
          Modern, Classy Apartment in The Bui
        </h1>
        <div className="flex items-center gap-4 mt-2 text-gray-600">
          <span>2 guests</span>
          <span>•</span>
          <span>1 bedroom</span>
          <span>•</span>
          <span>1 bed</span>
          <span>•</span>
          <span>1 bath</span>
        </div>
      </div>

      <hr className="my-6 border-t border-gray-200" />
      {/* Property Features */}
      <div className="grid gap-4">
        {/* Entire home */}
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <Home className="w-5 h-5 text-gray-700" />
          </div>
          <div>
            <h3 className="font-semibold">Entire home</h3>
            <p className="text-gray-600">
              You'll have the apartment to yourself
            </p>
          </div>
        </div>

        {/* Enhanced clean */}
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <Sparkles className="w-5 h-5 text-gray-700" />
          </div>
          <div>
            <h3 className="font-semibold">Enhanced Clean</h3>
            <p className="text-gray-600">
              This Host committed to enhanced cleaning process.{" "}
              <button className="text-black underline">Show more</button>
            </p>
          </div>
        </div>

        {/* Self check-in */}
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <Key className="w-5 h-5 text-gray-700" />
          </div>
          <div>
            <h3 className="font-semibold">Self check-in</h3>
            <p className="text-gray-600">Check yourself in with the keypad.</p>
          </div>
        </div>

        {/* Free cancellation */}
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <CalendarX className="w-5 h-5 text-gray-700" />
          </div>
          <div>
            <h3 className="font-semibold">Free cancellation</h3>
            <p className="text-gray-600">
              Cancel before Apr 01 for a full refund
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
