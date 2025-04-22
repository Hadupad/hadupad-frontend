"use client";

import LetsTalk from "../../../../components/LetsTalk";
import ContactForm from "../../../../components/ContactForm";

export default function Contact() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section
        className="relative z-0 bg-cover bg-center bg-no-repeat h-[90vh] flex items-center justify-center text-white px-6 md:px-12 pt-[80px]"
        style={{
          backgroundImage: "url('/images/hero/hero.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/70 z-10"></div>

        <div className="container mx-auto py-8 relative z-20 px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Text - comes first on mobile */}
            <div className="w-full md:w-1/2 order-1 md:order-1 text-center md:text-left px-4 md:px-8">
              <h2 className="text-white text-4xl md:text-6xl font-bold leading-tight mb-4">
                Contact Us
              </h2>
            </div>

            {/* Image - comes second on mobile */}
            <div className="w-full md:w-1/2 order-2 md:order-2 px-4 md:px-0">
              <image
                src="/images/contact/heart.png"
                width={283.63}
                height={40}
                alt="Heart icon"
                className="w-auto h-auto max-w-full mx-auto brightness-100 filter mt-4 md:mt-0"
              />
            </div>
          </div>
        </div>
      </section>

      <LetsTalk />
    
      <ContactForm />
    </div>
  );
}
