'use client';
import Image from 'next/image';

export default function Review() {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg px-4 py-6">
        <div className="text-lg font-bold mb-8">Hadupad</div>
        <nav className="space-y-4">
          <a className="text-red-600 font-semibold" href="#">Listings (10)</a>
          <a href="#">Bookings</a>
          <a href="#">Caution Fee</a>
          <a href="#">Wallet</a>
          <a href="#">Discounts</a>
          <a href="#">Messages</a>
          <a href="#">Account</a>
          <a className="text-gray-500" href="#">Logout</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-8">
        <div className="bg-white rounded shadow-md p-6 max-w-4xl mx-auto">
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-semibold">Review your listing</h2>
            <div className="text-sm text-right">
              Faith Oyeniyi<br />
              <span className="text-gray-400">Host</span>
            </div>
          </div>

          <div className="flex gap-8">
            <div className="border rounded-lg overflow-hidden shadow w-64">
              <Image
                src="/house-sample.jpg"
                alt="House"
                width={300}
                height={200}
                className="object-cover"
              />
              <div className="p-4 text-sm">
                <div className="font-medium">Jabi, Abuja</div>
                <div className="flex justify-between text-gray-600 mt-1">
                  <span>3 Beds</span>
                  <span>3 Baths</span>
                </div>
                <div className="mt-2 font-bold text-black">₦30,000/night</div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-2">What’s next for you</h3>
              <ul className="text-sm text-gray-700 space-y-4">
                <li><input type="radio" name="step" /> Confirm few details and publish</li>
                <li><input type="radio" name="step" /> Set up your calendar</li>
              </ul>
              <p className="mt-4 text-xs text-gray-500">Choose which dates your listings are available. Guests will be able to see this.</p>
            </div>
          </div>

          <div className="mt-6 flex justify-between">
            <button className="text-gray-600 text-sm">Back</button>
            <button className="bg-red-600 text-white px-6 py-2 rounded">Publish</button>
          </div>
        </div>
      </main>
    </div>
  );
}
