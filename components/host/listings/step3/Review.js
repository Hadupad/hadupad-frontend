"use client";
import Image from "next/image";
import SaveExitButton from "../SaveExitButton";

export default function Review({ handleSaveExit, onBack }) {
  return (
    <>
      <SaveExitButton onClick={(handleSaveExit, onBack)} />
      <div className="flex  -m-8">
        <div className="flex-1 p-8">
          <div className="mb-6">
            <h2 className="text-xl font-semibold">Review your listing</h2>
            <p className="text-xs text-gray-500 ml-2">
              Here’s what the guests will see
            </p>
          </div>

          <div className="flex gap-15">
            <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 w-fit">
              {" "}
              <div className="cursor-pointer p-0 rounded-xl shadow-none hover:opacity-90 transition-all duration-200 w-64">
                <div className="relative rounded-xl  overflow-hidden">
                  <Image
                    src="/images/properties/1.png"
                    alt="House"
                    width={300}
                    height={200}
                    className="w-full h-[200px] object-cover rounded-xl"
                  />
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between text-black text-sm">
                    <p>Jabi, Abuja</p>
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4 fill-black" viewBox="0 0 24 24">
                        <path d="M12 .587l3.668 7.568L24 9.75l-6 5.849L19.335 24 12 20.065 4.665 24 6 15.599 0 9.75l8.332-1.595z" />
                      </svg>
                      4.8
                    </span>
                  </div>

                  <div className="flex items-center text-sm text-[#FF4444] gap-4 py-1 font-semibold">
                    <span className="flex items-center gap-1">
                      <Image
                        src="/images/icons/bed.png"
                        alt="Bed"
                        width={16}
                        height={16}
                      />
                      3 Beds
                    </span>
                    <span className="flex items-center gap-1">
                      <Image
                        src="/images/icons/bath.png"
                        alt="Bath"
                        width={16}
                        height={16}
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
            <div>
              <h3 className="font-semibold mb-2 pt-10">What's next for you</h3>

              <ul className="text-sm text-gray-700 space-y-4">
                <li className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <input type="radio" name="step" />
                    <span className="font-bold">
                      Confirm few details and publish
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 ml-6 w-55">
                    We’ll let you know if you need to verify your identity by
                    mail
                  </p>
                </li>
                <li className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <input type="radio" name="step" />
                    <span className="font-bold">Set up your calendar</span>
                  </div>
                  <p className="text-xs text-gray-500 ml-6 w-55">
                    Choose which date your listings are available. Guests will
                    be able to see this
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div className="fixed bottom-0 left-56 w-[calc(100%-14rem)] border-t border-gray-300 px-6 py-4 flex justify-between items-center z-50 shadow">
            <button
              onClick={onBack}
              className="text-black underline text-sm font-semibold hover:text-gray-700 cursor-pointer"
            >
              Back
            </button>

            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded text-sm font-semibold cursor-pointer">
              publish
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
