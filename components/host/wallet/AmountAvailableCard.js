export default function AmountCard({ title, amount, note }) {
  return (
    <div className="bg-white p-4 rounded-lg border w-full">
      <p className="text-xs text-gray-500 mb-1">{title}</p>
      <h2 className="text-xl font-bold">₦{amount}</h2>
      <p className="text-xs text-gray-500">{note}</p>
    </div>
  );
}
