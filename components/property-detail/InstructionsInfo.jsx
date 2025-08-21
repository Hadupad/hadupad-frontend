import { Clock, LogOut, Key, Baby, Cigarette, PawPrint, PartyPopper, Sparkles, Shield, Users, AlertTriangle, CreditCard } from 'lucide-react';

export default function InstructionsInfo({ property }) {
  return (
    <div className="space-y-6 max-w-4xl">
      <h2 className="text-lg font-semibold text-gray-900">Things to know</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* House rules */}
        <div>
          <h3 className="font-medium text-gray-900 mb-4">House rules</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">Check-in: After 4:00 PM</span>
            </div>
            <div className="flex items-center gap-3">
              <LogOut className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">Checkout: 11:00 AM</span>
            </div>
            <div className="flex items-center gap-3">
              <Key className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">Self check-in with lockbox</span>
            </div>
            <div className="flex items-center gap-3">
              <Baby className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">Not suitable for infants (under 2 years)</span>
            </div>
            <div className="flex items-center gap-3">
              <Cigarette className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">No smoking</span>
            </div>
            <div className="flex items-center gap-3">
              <PawPrint className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">No pets</span>
            </div>
            <div className="flex items-center gap-3">
              <PartyPopper className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">No parties or events</span>
            </div>
          </div>
        </div>

        {/* Health & safety */}
        <div>
          <h3 className="font-medium text-gray-900 mb-4">Health & safety</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Sparkles className="w-4 h-4 text-gray-600 mt-0.5" />
              <div>
                <span className="text-sm text-gray-700">Committed to Hadupad's enhanced cleaning process. </span>
                <button className="text-sm text-gray-900 underline">Show more</button>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Users className="w-4 h-4 text-gray-600 mt-0.5" />
              <span className="text-sm text-gray-700">Hadupad's social-distancing and other COVID-19-related guidelines apply</span>
            </div>
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">Carbon monoxide alarm</span>
            </div>
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">Smoke alarm</span>
            </div>
            <div className="flex items-start gap-3">
              <CreditCard className="w-4 h-4 text-gray-600 mt-0.5" />
              <span className="text-sm text-gray-700">Security Deposit - if you damage the home, the caution fee will no be refunded</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
