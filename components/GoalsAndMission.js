import React from "react";
import Image from "next/image";

const GoalsAndMission = () => {
  return (
    <section className="px-6 md:px-12 py-30 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-4xl font-semibold">
          Effortless Stay, Vibrant Living
        </h2>
        <div className="flex justify-center mt-3">
          <Image
            src="/images/about/scribble.png"
            alt="Scribble underline"
            width={283.63}
            height={40}
            className="h-6 md:h-8 w-auto"
          />
        </div>
      </div>

      <div className="flex flex-col gap-12">
        {/* Goal Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-50">
          {/* Text - comes first on mobile */}
          <div className="md:w-1/2 md:self-center order-1">
            <h3 className="text-xl font-bold mb-1">Our Goal</h3>
            <div className="h-[2px] w-20 bg-[#DC4731] mb-3"></div>
            <p className="text-sm font-medium text-gray-700">
              Ut enim ad minima veniam, quis nostrum exercitationem ullam
              corporis suscipit laboriosam, nisi ut al Ut enim ad minima veniam,
              quis nostrum exercitationem ullam corporis suscipit laboriosam,
              nisi ut al
            </p>
          </div>

          {/* Image - comes second on mobile */}
          <div className="md:w-1/2 flex order-2">
            <div className="bg-[#DC4731] rounded-full p-4 w-fit mx-auto md:mx-0">
              <Image
                src="/images/about/frame-1.png"
                width={464.56}
                height={450}
                alt="Goal Image"
                className="w-[200px] h-[200px] object-cover rounded-full"
              />
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-50">
  {/* Image - comes second on mobile, first on desktop */}
  <div className="md:w-1/2 flex order-2 md:order-1">
    <div className="bg-[#DC4731] rounded-full p-4 w-fit mx-auto md:mx-0">
      <Image
        src="/images/about/frame-2.png"
        width={464.56}
        height={450}
        alt="Mission Image"
        className="w-[200px] h-[200px] object-cover rounded-full"
      />
    </div>
  </div>

  {/* Text - comes first on mobile, second on desktop */}
  <div className="md:w-1/2 md:self-center order-1 md:order-2">
    <h3 className="text-xl font-bold mb-1">Our Mission</h3>
    <div className="h-[2px] w-20 bg-[#DC4731] mb-3"></div>
    <p className="text-sm font-medium text-gray-700">
      Ut enim ad minima veniam, quis nostrum exercitationem ullam
      corporis suscipit laboriosam, nisi ut al Ut enim ad minima veniam,
      quis nostrum exercitationem ullam corporis suscipit laboriosam,
      nisi ut al
    </p>
  </div>
</div>

      </div>
    </section>
  );
};

export default GoalsAndMission;