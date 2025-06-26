export default function PaymentSection({ title, description, buttonLabel, onClick }) {
  return (
    <div>
      <h3 className="font-semibold mt-6">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
      <button
        onClick={onClick}
        className="mt-2 px-4 py-2 bg-black text-white rounded"
      >
        {buttonLabel}
      </button>
      <hr className="my-6 border-t border-gray-200" />
    </div>
  );
}

