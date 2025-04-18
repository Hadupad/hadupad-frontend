"use client";

export default function ContactForm() {
  return (
    <section class="px-20 py-50 max-w-7xl mx-auto grid md:grid-cols-2 gap-20   z-10">
      <h1
        className="absolute text-[120px] lg:text-[180px] font-bold text-white -left-7 top-2/3 z-0 pointer-events-none select-none
             [text-shadow:_-1px_-1px_0_rgba(128,128,128,0.1),_1px_-1px_0_rgba(128,128,128,0.1),_-1px_1px_0_rgba(128,128,128,0.1),_1px_1px_0_rgba(128,128,128,0.1)]"
      >
        ontact us
      </h1>
      <div class="space-y-6 py-2 z-10">
        <div class="text-3xl md:text-4xl font-bold">
          <h2> Have an Idea?</h2>

          <h2> Let’s discuss!</h2>
        </div>
        <div class="text-gray-700 space-y-2">
          <p>Thank you for getting in touch!</p>
          <p>Kindly.</p>
          <p>Fill the form, have a great day!</p>
        </div>
      </div>

      <form class="space-y-4 w-full z-10">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your Name"
            class="border-b p-2 outline-none"
          />
          <input
            type="email"
            placeholder="Your Email"
            class="border-b p-2 outline-none"
          />
          <input
            type="text"
            placeholder="Phone Number"
            class="border-b p-2 outline-none"
          />
          <input
            type="text"
            placeholder="Country"
            class="border-b p-2 outline-none"
          />
          <input
            type="text"
            placeholder="Company Name"
            class="border-b p-2 outline-none"
          />
          <input
            type="text"
            placeholder="Interested in"
            class="border-b p-2 outline-none"
          />
        </div>
        <textarea
          rows="4"
          placeholder="Message"
          class="w-full border-b p-2 outline-none"
        ></textarea>
        <button
          type="submit"
          class="bg-[#E7512E] hover:bg-red-600 text-white px-6 py-2 rounded-md transition"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
