import Image from 'next/image';

export default function GuestCompletionModal({ onContinue, onSkip }) {
  return (
    <div className="w-full">
      {/* Desktop Header */}
      <div className="hidden sm:block w-full border-b border-gray-200 pb-4">
        <h2 className="text-center text-lg font-semibold tracking-tight pt-4">Create your profile</h2>
      </div>

      {/* Mobile View */}
      <div className="sm:hidden flex flex-col h-full p-6">
        <div className="flex-grow flex items-center justify-center mt-20">
          <Image src="/images/logo/icon.png" alt="Hadupad Logo" width={150} height={150} />
        </div>
        <div className="w-full text-center mt-40">
          <h3 className="text-2xl font-bold mb-4">Create a profile</h3>
          <button
            onClick={onContinue}
            className="w-full bg-[#DC4731] hover:bg-[#b93a29] text-white py-3 rounded-lg font-semibold text-lg mb-4 transition"
          >
            Continue
          </button>
          <button
            onClick={onSkip}
            className="underline text-gray-700 hover:text-black text-base"
          >
            I'll do this later
          </button>
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden sm:flex flex-col items-center w-full px-6 py-8">
        <div className="mb-4">
          <Image src="/images/logo/icon.png" alt="Hadupad Logo" width={48} height={48} />
        </div>
        <h3 className="text-2xl font-bold mb-1">Welcome to Hadupad</h3>
        <p className="text-gray-700 mb-6">Experience places, Experience comfort, Experience Us</p>
        <button
          onClick={onContinue}
          className="w-full bg-[#DC4731] hover:bg-[#b93a29] text-white py-3 rounded-lg font-semibold text-lg mb-4 transition"
        >
          Continue
        </button>
        <button
          onClick={onSkip}
          className="underline text-gray-700 hover:text-black text-base"
        >
          I'll do this later
        </button>
      </div>
    </div>
  );
}
