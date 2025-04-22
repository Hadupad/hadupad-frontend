export default function WhyChoose() {
  return (
    <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto">
      <h2 className="text-3xl md:text-5xl font-bold text-center mb-4">
        Why choose Hadupad?
      </h2>
      <p className="text-center text-base md:text-lg mb-12">
        Why choose HadupadWhy choose HadupadWhy choose HadupadHadupad Hadupad
      </p>

      {/* Mobile Layout */}
      <div className="block md:hidden space-y-6">
        {/* Card 2: Instant Payment */}
        <div className="bg-[#DC4731]/10 rounded-lg shadow flex flex-col overflow-hidden border-shadow">
          <image
            src="/images/about/image-2.png"
            alt="Instant Payment"
            className="w-full h-60 object-cover"
          />
          <div className="bg-white p-4 rounded-b-lg">
            <h3 className="font-bold text-lg mb-2">Instant Payment</h3>
            <p className="text-gray-600 text-sm">
              Verification processes and secure payment systems ensure peace of
              mind for both hosts and guests.
            </p>
          </div>
        </div>

        {/* Card 1 & 4 side by side */}
        <div className="flex gap-4">
          <div className="bg-[#CB7246]/50 rounded-lg shadow flex flex-col overflow-hidden border-shadow">
            <image
              src="/images/about/image-1.png"
              alt="Instant Payment"
              className="w-full rounded-t-lg"
            />
            <div className="bg-white p-4 rounded-b-lg">
              <h3 className="font-bold text-lg mb-2">Instant Payment</h3>
              <p className="text-gray-600 text-sm">
                Verification processes and secure payment systems ensure peace
                of mind for both hosts and guests.
              </p>
            </div>
          </div>

          {/* Card 4: User-friendly Platform */}
          <div className="bg-[#FFEED8]/50 rounded-lg shadow flex flex-col overflow-hidden border-shadow">
            <image
              src="/images/about/image-4.png"
              alt="Instant Payment"
              className="w-full rounded-t-lg"
            />
            <div className="bg-white p-4 rounded-b-lg">
              <h3 className="font-bold text-lg mb-2">Instant Payment</h3>
              <p className="text-gray-600 text-sm">
                Verification processes and secure payment systems ensure peace
                of mind for both hosts and guests.
              </p>
            </div>
          </div>
        </div>

        {/* Card 3: 24/7 Support */}

        <div className="bg-[#FCB591] rounded-lg shadow flex flex-col overflow-hidden border-shadow">
          <image
            src="/images/about/image-3.png"
            alt="24/7 Support"
            className="w-full h-55 object-cover rounded mb-4"
          />
          <div className="bg-white p-4 rounded-b-lg">
            {" "}
            {/* White background container */}
            <h3 className="font-bold text-sm mb-1">Trusted & Secure</h3>
            <p className="text-gray-600 text-xs">
              Verification processes and secure payment systems ensure peace of
              mind for both hosts and guests
            </p>
          </div>
        </div>
      </div>

      <div className="hidden md:flex md:flex-col md:gap-4">
        {/* First Row */}
        <div className="flex gap-4 items-stretch">
          {/* Card 1 - 33% width */}
          <div className="w-1/3">
            <div className="bg-[#CB7246]/50 rounded-lg shadow flex flex-col h-full border border-[#CB7246]/30">
              <image
                src="/images/about/image-1.png"
                alt="Instant Payment"
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="bg-white p-4 rounded-b-lg flex-1">
                <h3 className="font-bold text-lg mb-2">Instant Payment</h3>
                <p className="text-gray-600 text-sm">
                  Secure and fast transactions for hosts and guests.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2 - 66% width */}
          <div className="w-2/3">
            <div className="bg-[#DC4731]/10 rounded-lg shadow flex flex-col h-full border border-[#DC4731]/20">
              <image
                src="/images/about/image-2.png"
                alt="Trusted & Secure"
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="bg-white p-4 rounded-b-lg flex-1">
                <h3 className="font-bold text-lg mb-2">Trusted & Secure</h3>
                <p className="text-gray-600 text-sm">
                  Verification processes ensure peace of mind for all users.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="flex gap-4 items-stretch">
          {/* Card 3 - 66% width (longer) */}
          <div className="w-2/3">
            <div className="bg-[#FCB591]/20 rounded-lg shadow flex flex-col h-full border border-[#FCB591]/30">
              <image
                src="/images/about/image-3.png"
                alt="24/7 Support"
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="bg-white p-4 rounded-b-lg flex-1">
                <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
                <p className="text-gray-600 text-sm">
                  Our team is always available to assist you day and night.
                </p>
              </div>
            </div>
          </div>

          {/* Card 4 - 33% width */}
          <div className="w-1/3">
            <div className="bg-[#FFEED8] rounded-lg shadow flex flex-col h-full border border-[#FFEED8]/50">
              <image
                src="/images/about/image-4.png"
                alt="User-friendly Platform"
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="bg-white p-4 rounded-b-lg flex-1">
                <h3 className="font-bold text-lg mb-2">Easy to Use</h3>
                <p className="text-gray-600 text-sm">
                  Intuitive interface for seamless bookings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
