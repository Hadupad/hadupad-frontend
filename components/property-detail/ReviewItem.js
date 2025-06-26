export default function ReviewItem({ name, date, text }) {
  return (
    <div className="text-sm">
      <p className="font-medium">{name} · <span className="text-gray-500">{date}</span></p>
      <p className="text-gray-700">{text}</p>
    </div>
  );
}