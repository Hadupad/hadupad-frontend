export default function RecentPayments() {
  const payments = Array(5).fill({
    guest: "Faith Oye...",
    date: "04 Dec '25",
    amount: "₦50,000",
  });

  return (
    <div className="bg-white rounded-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-medium text-gray-900">Recent Payments</h3>
        <button className="text-xs text-red-600 hover:text-red-700 font-medium transition-colors duration-200">
          View all
        </button>
      </div>

      <div className="overflow-hidden">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-2 text-gray-600 font-medium">Guest</th>
              <th className="text-left py-2 text-gray-600 font-medium">Date</th>
              <th className="text-left py-2 text-gray-600 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {payments.map((p, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors duration-150">
                <td className="py-2 text-gray-900">{p.guest}</td>
                <td className="py-2 text-gray-600">{p.date}</td>
                <td className="py-2 font-medium text-gray-900">{p.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
