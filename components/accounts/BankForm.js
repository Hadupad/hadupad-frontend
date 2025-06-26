// components/accounts/BankForm.js
export default function BankForm() {
  return (
    <>
      <form className="space-y-4">
        <div>
          <label className="text-sm">Full Name</label>
          <input className="w-full border px-4 py-2 rounded" defaultValue="FAITH OYENIYI" />
        </div>
        <p className="text-xs text-gray-500">As it appears in your bank</p>
        <div className="flex gap-2">
          <input className="flex-1 border px-4 py-2 rounded" placeholder="Account number" />
          <select className="flex-1 border px-4 py-2 rounded">
            <option>Zenith Bank</option>
            <option>Access Bank</option>
            <option>GTBank</option>
          </select>
        </div>
      </form>
    </>
  );
}
