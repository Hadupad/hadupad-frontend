export default function FAQPage() {
    return (
      <section className="px-6 py-10 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold">What is HADUPAD?</h2>
            <p className="text-gray-700">HADUPAD is a platform designed to ...</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold">How can I register?</h2>
            <p className="text-gray-700">Click the register button at the top right and follow the steps...</p>
          </div>
          {/* Add more FAQ entries here */}
        </div>
      </section>
    );
  }
  