'use client';

export default function PriceSettingsDiscounts() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <h2 className="text-lg font-medium mb-2">You can change it anytime</h2>

      <div className="w-full max-w-md space-y-4 mt-6">
        <div className="border rounded-lg p-4">
          <label className="block text-sm font-semibold mb-1">Caution Fee</label>
          <input
            type="text"
            placeholder="₦0"
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="border rounded-lg p-4">
          <label className="block text-sm font-semibold mb-1">Guest prices before taxes</label>
          <input
            type="text"
            placeholder="₦0"
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="border rounded-lg p-4 text-center text-xl font-bold">
          ₦440,000
        </div>
      </div>
    </div>
  );
}
