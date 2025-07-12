import Image from "next/image";

export default function Gallery() {
  // Replace with actual image URLs later
  const images = [
    "/images/properties/1.png",
    "/images/properties/2.png",
    "/images/properties/3.png",
    "/images/properties/4.png",
    "/images/properties/5.png",
  ];

  return (
    <div className="w-[100%] mx-auto mb-8">
      <div className="flex gap-4 h-[478px]">
        {/* Main Image */}
        <div className="flex-1 basis-3/5 h-full rounded-xl overflow-hidden">
          <Image
            src={images[0]}
            alt="Gallery 2"
            className="object-cover w-full h-full rounded-xl"
            width={665} 
            height={478} 
          />
        </div>
        {/* Side Images */}
        <div className="flex flex-col gap-4 basis-2/5 h-full w-full">
          <div className="flex gap-4 h-1/2">
            <div className="flex-1 rounded-xl overflow-hidden">
              <img
                src={images[1]}
                alt="Gallery 2"
                className="object-cover w-full h-full rounded-xl"
              />
            </div>
            <div className="flex-1 rounded-xl overflow-hidden">
              <img
                src={images[2]}
                alt="Gallery 3"
                className="object-cover w-full h-full rounded-xl"
              />
            </div>
          </div>
          <div className="flex gap-4 h-1/2 relative">
            <div className="flex-1 rounded-xl overflow-hidden">
              <img
                src={images[3]}
                alt="Gallery 4"
                className="object-cover w-full h-full rounded-xl"
              />
            </div>
            <div className="flex-1 rounded-xl overflow-hidden relative">
              <img
                src={images[1]}
                alt="Gallery 5"
                className="object-cover w-full h-full rounded-xl"
              />
              {/* Show all photos button */}
              <button className="absolute bottom-3 right-3 bg-white bg-opacity-90 rounded-lg px-4 py-2 flex items-center gap-2 shadow text-gray-800 font-medium">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
                  <rect
                    width="6"
                    height="6"
                    x="3"
                    y="3"
                    fill="currentColor"
                    rx="1"
                  />
                  <rect
                    width="6"
                    height="6"
                    x="15"
                    y="3"
                    fill="currentColor"
                    rx="1"
                  />
                  <rect
                    width="6"
                    height="6"
                    x="3"
                    y="15"
                    fill="currentColor"
                    rx="1"
                  />
                  <rect
                    width="6"
                    height="6"
                    x="15"
                    y="15"
                    fill="currentColor"
                    rx="1"
                  />
                </svg>
                Show all photos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
