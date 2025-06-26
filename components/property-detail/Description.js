"use client";
import { useState } from "react";
import { Calendar } from "../../src/components/ui/calendar";

export default function Description() {
  const fullText = `Come and stay in this superb bungalow, in the heart of the historic center of Abuja. 
  Spacious and bright, exposed with stone, you will enjoy all the charms of the city thanks to its ideal location. 
  Close to the famous Jabi Lake Mall, many local shops, bars and restaurants, you can access the apartment by tram A and C and bus routes 27 and 44.`;

  const [showMore, setShowMore] = useState(false);
  const charLimit = 300;
  const shouldTruncate = fullText.length > charLimit;
  const [date, setDate] = useState({ from: undefined, to: undefined });

  const displayedText = showMore ? fullText : fullText.slice(0, charLimit);
  const clearDate = () => {
    setDate({ from: undefined, to: undefined });
  };
  return (
    <>
      <section className="px-0space-y-10">
        {/* Description Text */}
        <div className="text-base text-gray-800 leading-relaxed max-w-3xl text-left mx-0">
          <p>
            {displayedText}
            {!showMore && shouldTruncate && "..."}
          </p>
          <br></br>
          {shouldTruncate && (
            <button
              className="text-sm font-medium text-black underline inline-flex items-center gap-1"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? "Show less" : "Show more"}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              > 
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          )}
        </div>
        <br></br>

        {/* Divider */}
        <div className="border-t border-gray-200 pt-5"></div>

        {/* Where You’ll Sleep Section*/}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Where you’ll sleep</h2>

          <div className="w-full max-w-sm">
            <div className="overflow-hidden rounded-xl">
              <img
                src="/images/properties/1.png"
                alt="Bedroom"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="mt-3">
              <p className="font-semibold text-black">Bedroom</p>
              <p className="text-sm text-gray-600">1 queen bed</p>
            </div>
          </div>
        </div>
        <hr className="my-8 border-t border-gray-200" />

        <div>
          <div>
            {date?.from && date?.to ? (
              <>
                <h1 className="mt-2 text-2xl font-semibold">
                  {`${Math.round(
                    (date.to - date.from) / (1000 * 60 * 60 * 24)
                  )} night${
                    Math.round(
                      (date.to - date.from) / (1000 * 60 * 60 * 24)
                    ) !== 1
                      ? "s"
                      : ""
                  } in Abuja`}
                </h1>
                <p>
                  {" "}
                  {`${date.from.toDateString()} - ${date.to.toDateString()}`}
                </p>
              </>
            ) : date?.from ? (
              date.from.toDateString()
            ) : (
              "None"
            )}
          </div>
          <Calendar
            mode="range"
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
            fromDate={new Date()}
            className="rounded-md border shadow"
          />
          <div className="flex justify-center">
            <button
              className="pt-1 text-sm underline text-black hover:text-[#DC4731] transition"
              onClick={clearDate}
            >
              Clear dates
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
