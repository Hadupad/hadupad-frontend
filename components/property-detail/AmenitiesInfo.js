import {
  Leaf,
  Wifi,
  Snowflake,
  refrigerator,
  Utensils,
  Bone,
  Flame,
  Video,
  Bike
} from "lucide-react";

export default function AmenitiesInfo() {
  const amenities = [
  { icon: <Leaf size={20} />, label: "Garden view" },
  { icon: <Wifi size={20} />, label: "Wifi" },
  { icon: <Flame size={20} />, label: "Free washer - in building" }, // Placeholder
  { icon: <Snowflake size={20} />, label: "Central air conditioning" },
  { icon: <refrigerator size={20} />, label: "Refrigerator" },
  { icon: <Utensils size={20} />, label: "Kitchen" },
  { icon: <Bone size={20} />, label: "Pets allowed" },
  { icon: <Flame size={20} />, label: "Dryer" },
  { icon: <Video size={20} />, label: "Security cameras on property" },
  { icon: <Bike size={20} />, label: "Bicycles" }
];
  return (
    <section className="text-left">
      <h2 className="text-2xl  mb-4 text-black-800">What this place offers</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
        {amenities.map((item, idx) => (
          <div key={idx} className="flex items-center space-x-3">
            <div className="text-black">{item.icon}</div>
            <span className="text-base">{item.label}</span>
          </div>
        ))}
      </div>
      <button className="mt-6 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-100 transition">
        Show all 20 amenities
      </button>
    </section>
  );
}
