import { Star, ExternalLink, Heart } from "lucide-react";
export default function Header({ data }) {
  return (
    <div className="mb-8">
      <div>
        <h1 className="text-2xl font-bold">{data.title}</h1>
        <div className="flex items-center gap-1">
          <span className="flex items-center gap-0.5 ">
            <Star className="w-4 h-4 text-red-700" /> {data.rating}.0 -{" "}
            <span>{data.reviews} reviews </span> -{" "}
            <span className="text-gray-600">{data.location}</span>
          </span>
        </div>
      </div>
      <div className="flex justify-between items-start gap-1">
        <div></div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1 px-3 py-1 rounded hover:bg-gray-100 transition">
            <ExternalLink className="w-4 h-4" /> Share
          </button>
          <button className="flex items-center gap-1 px-3 py-1 rounded hover:bg-gray-100 transition">
            <Heart className="w-4 h-4" /> Like
          </button>
        </div>
      </div>
    </div>
  );
}
