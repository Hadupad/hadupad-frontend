import {
  Clock,
  LogIn,
  ShoppingCart,
  Flame,
  Bone,
  PartyPopper,
  Sparkles,
  ShieldCheck,
  SlidersHorizontal,
  Disc,
  CreditCard
} from "lucide-react";

const houseRules = [
  { icon: <Clock size={20} />, label: "Check-in: After 4:00 PM" },
  { icon: <Clock size={20} />, label: "Checkout: 10:00 AM" },
  { icon: <LogIn size={20} />, label: "Self check-in with lockbox" },
  { icon: <ShoppingCart size={20} />, label: "Not suitable for infants (under 2 years)" },
  { icon: <Flame size={20} />, label: "No smoking" },
  { icon: <Bone size={20} />, label: "No pets" },
  { icon: <PartyPopper size={20} />, label: "No parties or events" }
];

const healthSafety = [
  { icon: <Sparkles size={20} />, label: "Committed to Hadupad’s enhanced cleaning process. Show more" },
  { icon: <ShieldCheck size={20} />, label: "Hadupad’s social-distancing and other COVID-19-related guidelines apply" },
  { icon: <SlidersHorizontal size={20} />, label: "Carbon monoxide alarm" },
  { icon: <Disc size={20} />, label: "Smoke alarm" },
  { icon: <CreditCard size={20} />, label: "Security Deposit - if you damage the home, the caution fee will no be refunded" }
];

export default function InstructionInfo() {
  return (
    <section className="text-left">
      <h2 className="text-2xl  mb-4 text-black-800">Things to know</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
        {/* House rules */}
        <div>
          <h3 className="text-lg font-medium mb-4">House rules</h3>
          <div className="space-y-3">
            {houseRules.map((item, idx) => (
              <div key={idx} className="flex items-start space-x-3">
                <div className="text-black mt-1">{item.icon}</div>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Health & safety */}
        <div className="mt-8 md:mt-0">
          <h3 className="text-lg font-medium mb-4">Health & safety</h3>
          <div className="space-y-3">
            {healthSafety.map((item, idx) => (
              <div key={idx} className="flex items-start space-x-3">
                <div className="text-black mt-1">{item.icon}</div>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
