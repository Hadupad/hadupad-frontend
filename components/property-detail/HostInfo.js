import {
  ShieldAlert,
  MessageSquare,
  Clock,
  AlertTriangle,
  Star,
  ShieldCheck,
} from "lucide-react";

export default function HostInfo() {
  return (
    <div>
      <hr className="my-8 border-t border-gray-200" />
      {/* Host Header */}
      <div className="mb-4">
        <h2 className="text-2xl  mb-4 text-black-800">Hosted by Chibuke</h2>
        <p className="text-gray-600">Joined January 2025</p>
      </div>

      {/* Verification Badge */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex items-center gap-1 text-gray-700">
          <span>
            <Star className="w-4 h-4 text-red-700" />
          </span>
          <span>12 Reviews</span>
        </div>
        <div className="flex items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-red-700" />
          <span className="text-sm">Identity verified</span>
        </div>
      </div>

      {/* Host Description */}
      <p className="mb-4 text-gray-700">
        Our hosts are experienced, highly rated hosts who are committed to
        providing great stays for guests.
      </p>

      {/* Host Stats */}
      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-gray-700" />
          <span className="text-gray-700">Response rate: 100%</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-700" />
          <span className="text-gray-700">Response time: within an hour</span>
        </div>
      </div>

      {/* Contact Button */}
      <button className="w-full md:w-auto border border-black px-6 py-3 rounded-full font-medium mb-4 hover:bg-gray-50 transition-colors">
        Contact Host
      </button>

      {/* Security Notice */}
      <div className="flex items-start gap-3 text-sm text-gray-600 max-w-xl">
        <ShieldAlert size={40} className="text-gray mt-1" />
        <p className="max-w-md leading-relaxed">
          To protect your payment, never transfer money or communicate outside
          of the Hadupad website or app.
        </p>
      </div>
    </div>
  );
}
