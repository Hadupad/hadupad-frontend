"use client";
import Image from "next/image";
import SaveExitButton from "../SaveExitButton";

export default function Review({ handleSaveExit, onBack }) {
  return (
    <>
      <SaveExitButton onClick={(handleSaveExit, onBack)} />
      <div className="flex flex-col lg:flex-row -m-4 sm:-m-8">
        <div className="flex-1 p-4 sm:p-8">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold">Review your listing</h2>
            <p className="text-xs text-gray-500 ml-0 sm:ml-2">
              Here's what the guests will see
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-15">
            <div className="bg-white rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100 w-full lg:w-fit mx-auto lg:mx-0">
              {" "}
              <div className="cursor-pointer p-0 rounded-xl shadow-none hover:opacity-90 transition-all duration-200 w-full max-w-sm lg:w-64 mx-auto lg:mx-0">
                <div className="relative rounded-xl overflow-hidden">
                  <Image
                    src="/images/properties/1.png"
                    alt="House"
                    width={300}
                    height={200}
                    className="w-full h-[180px] sm:h-[200px] object-cover rounded-xl"
                  />
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between text-black text-sm">
                    <p className="font-medium">Jabi, Abuja</p>
                    <span className="flex items-center gap-1">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 fill-black" viewBox="0 0 24 24">
                        <path d="M12 .587l3.668 7.568L24 9.75l-6 5.849L19.335 24 12 20.065 4.665 24 6 15.599 0 9.75l8.332-1.595z" />
                      </svg>
                      4.8
                    </span>
                  </div>

                  <div className="flex items-center text-xs sm:text-sm text-[#FF4444] gap-3 sm:gap-4 py-1 font-semibold">
                    <span className="flex items-center gap-1">
                      <Image
                        src="/images/icons/bed.png"
                        alt="Bed"
                        width={14}
                        height={14}
                        className="w-3 h-3 sm:w-4 sm:h-4"
                      />
                      3 Beds
                    </span>
                    <span className="flex items-center gap-1">
                      <Image
                        src="/images/icons/bath.png"
                        alt="Bath"
                        width={14}
                        height={14}
                        className="w-3 h-3 sm:w-4 sm:h-4"
                      />
                      3 Baths
                    </span>
                  </div>

                  <p className="text-black text-sm font-medium">
                    ₦30,000
                    <span className="text-[#222222] font-normal"> /night</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Next Steps Section */}
            <div className="w-full lg:w-auto mt-6 lg:mt-0">
              <h3 className="font-semibold mb-3 sm:mb-2 pt-4 lg:pt-10 text-base sm:text-lg">What's next for you</h3>

              <ul className="text-sm text-gray-700 space-y-3 sm:space-y-4">
                <li className="flex flex-col gap-1">
                  <div className="flex items-start gap-2">
                    <input type="radio" name="step" className="mt-1" />
                    <span className="font-bold text-sm sm:text-base">
                      Confirm few details and publish
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 ml-6 max-w-xs lg:w-55">
                    We'll let you know if you need to verify your identity by
                    mail
                  </p>
                </li>
                <li className="flex flex-col gap-1">
                  <div className="flex items-start gap-2">
                    <input type="radio" name="step" className="mt-1" />
                    <span className="font-bold text-sm sm:text-base">Set up your calendar</span>
                  </div>
                  <p className="text-xs text-gray-500 ml-6 max-w-xs lg:w-55">
                    Choose which date your listings are available. Guests will
                    be able to see this
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="fixed bottom-0 left-0 lg:left-56 w-full lg:w-[calc(100%-14rem)] border-t border-gray-300 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center z-50 bg-white shadow">
            <button
              onClick={onBack}
              className="text-black underline text-xs sm:text-sm font-semibold hover:text-gray-700 cursor-pointer"
            >
              Back
            </button>

            <button className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 rounded text-xs sm:text-sm font-semibold cursor-pointer min-w-[70px] sm:min-w-[80px]">
              Publish
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
