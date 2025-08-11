import Image from "next/image";

export default function WhyChoose() {
  return (
    <section className="py-20 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Why choose Hadupad?</h2>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
          Discover the unique benefits that make Hadupad the preferred choice for your needs
        </p>
      </div>

      {/* Mobile Layout */}
      <div className="block md:hidden space-y-6">
        {[
          {
            id: 1,
            title: "Instant Payment",
            desc: "Secure and fast transactions for hosts and guests.",
            image: "/images/about/image-1.png",
            bgColor: "bg-[#CB7246]/10",
            borderColor: "border-[#CB7246]/20"
          },
          {
            id: 2,
            title: "Trusted & Secure",
            desc: "Verification processes ensure peace of mind for all users.",
            image: "/images/about/image-2.png",
            bgColor: "bg-[#DC4731]/10",
            borderColor: "border-[#DC4731]/20"
          },
          {
            id: 3,
            title: "24/7 Support",
            desc: "Our team is always available to assist you day and night.",
            image: "/images/about/image-3.png",
            bgColor: "bg-[#FCB591]/20",
            borderColor: "border-[#FCB591]/30"
          },
          {
            id: 4,
            title: "Easy to Use",
            desc: "Intuitive interface for seamless bookings.",
            image: "/images/about/image-4.png",
            bgColor: "bg-[#FFEED8]",
            borderColor: "border-[#FFEED8]/50"
          }
        ].map((card) => (
          <div 
            key={card.id} 
            className={`rounded-lg shadow-md overflow-hidden border ${card.borderColor} ${card.bgColor}`}
          >
            <div className="relative h-48 w-full">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="bg-white p-4">
              <h3 className="font-bold text-lg mb-2">{card.title}</h3>
              <p className="text-gray-600 text-sm">{card.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block space-y-4">
        {/* First Row */}
        <div className="flex gap-4">
          {/* Card 1 */}
          <div className="flex-1">
            <div className="bg-[#CB7246]/10 rounded-lg shadow-md overflow-hidden border border-[#CB7246]/20 h-full">
              <div className="relative h-48 w-full">
                <Image
                  src="/images/about/image-1.png"
                  alt="Instant Payment"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="bg-white p-4">
                <h3 className="font-bold text-lg mb-2">Instant Payment</h3>
                <p className="text-gray-600">Secure and fast transactions for hosts and guests.</p>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex-2">
            <div className="bg-[#DC4731]/10 rounded-lg shadow-md overflow-hidden border border-[#DC4731]/20 h-full">
              <div className="relative h-48 w-full">
                <Image
                  src="/images/about/image-2.png"
                  alt="Trusted & Secure"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 66vw"
                />
              </div>
              <div className="bg-white p-4">
                <h3 className="font-bold text-lg mb-2">Trusted & Secure</h3>
                <p className="text-gray-600">Verification processes ensure peace of mind for all users.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="flex gap-4">
          {/* Card 3 */}
          <div className="flex-2">
            <div className="bg-[#FCB591]/20 rounded-lg shadow-md overflow-hidden border border-[#FCB591]/30 h-full">
              <div className="relative h-48 w-full">
                <Image
                  src="/images/about/image-3.png"
                  alt="24/7 Support"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 66vw"
                />
              </div>
              <div className="bg-white p-4">
                <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
                <p className="text-gray-600">Our team is always available to assist you day and night.</p>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="flex-1">
            <div className="bg-[#FFEED8] rounded-lg shadow-md overflow-hidden border border-[#FFEED8]/50 h-full">
              <div className="relative h-48 w-full">
                <Image
                  src="/images/about/image-4.png"
                  alt="Easy to Use"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="bg-white p-4">
                <h3 className="font-bold text-lg mb-2">Easy to Use</h3>
                <p className="text-gray-600">Intuitive interface for seamless bookings.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}