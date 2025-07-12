export default function RecentPayments() {
  const payments = Array(5).fill({
    guest: "Faith Oye...",
    date: "04 Dec '25",
    amount: "₦50,000",
  });

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Recent Payments</h3>
        <button className="text-sm text-red-500">View all</button>
      </div>

      <table className="w-full text-sm">
        <thead className="text-left text-gray-500 border-b">
          <tr>
            <th className="py-1.5 px-3">Guest</th>
            <th className="py-1.5 px-3">Date</th>
            <th className="py-1.5 px-3">Amount</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {payments.map((p, i) => (
            <tr key={i} className="hover:bg-gray-50">
              <td className="py-1.5 px-3">{p.guest}</td>
              <td className="py-1.5 px-3">{p.date}</td>
              <td className="py-1.5 px-3">{p.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
