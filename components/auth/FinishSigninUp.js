import React from 'react';

const FinishSigninUp = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background image with blur overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-sm brightness-75"
        style={{ backgroundImage: "url('/path-to-your-background-image.jpg')" }}
      />

      {/* Navigation bar */}
      <header className="absolute top-0 left-0 w-full flex justify-between items-center px-6 py-4 z-10">
        <div className="text-2xl font-bold text-white">🏠</div>
        <nav className="space-x-6 text-white font-medium">
          <a href="#">Home</a>
          <a href="#">Properties</a>
          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">FAQs</a>
          <button className="bg-white text-red-600 font-semibold px-4 py-1 rounded-full ml-4">
            Register
          </button>
        </nav>
      </header>

      {/* Sign up modal */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white p-6 rounded-lg shadow-xl z-20">
        <h2 className="text-center font-semibold text-gray-700 mb-4">Finish signing up</h2>
        <form className="space-y-4">
          <input className="w-full border rounded p-2" placeholder="First name" />
          <input className="w-full border rounded p-2" placeholder="Last name" />
          <input className="w-full border rounded p-2" placeholder="Birthdate" type="date" />
          <input className="w-full border rounded p-2" placeholder="Email address" type="email" />
          <input className="w-full border rounded p-2" placeholder="Password" type="password" />
          <p className="text-xs text-gray-500">
            By clicking Agree and continue, I agree to the <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
          </p>
          <button className="w-full bg-gray-300 text-white py-2 rounded cursor-not-allowed">
            Agree and continue
          </button>
        </form>
      </div>

      {/* Search bar */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-[90%] max-w-4xl bg-white shadow-lg rounded-full px-4 py-3 flex flex-wrap gap-4 justify-between items-center z-10">
        <input className="flex-1 min-w-[120px] p-2 border rounded" placeholder="Where" />
        <input className="flex-1 min-w-[100px] p-2 border rounded" placeholder="Budget" />
        <input className="flex-1 min-w-[100px] p-2 border rounded" placeholder="Bedrooms" />
        <input className="flex-1 min-w-[100px] p-2 border rounded" placeholder="Guests" />
        <button className="bg-red-500 text-white px-4 py-2 rounded-full">
          🔍
        </button>
      </div>
    </div>
  );
};

export default FinishSigninUp;
