"use client";

import Masonry from "react-masonry-css";
import Image from "next/image";

const GalleryGrid = () => {
  const images = [
    {
      id: 1,
      src: "/images/started/img1.png",
      alt: "Living room",
    },
    {
      id: 2,
      src: "/images/started/img2.png",
      alt: "Bookshelf",
    },
    {
      id: 3,
      src: "/images/started/img3.png",
      alt: "Staircase",
    },
    {
      id: 4,
      src: "/images/started/img4.png",
      alt: "Bedroom",
    },
  ];

  const breakpointColumnsObj = {
    default: 2,
    1100: 2,
    700: 2,
    500: 1,
  };

  return (
    <div >
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-4 md:gap-6 w-auto"
        columnClassName="space-y-4"
      >
        {images.map((img, index) => (
          <div
            key={img.id}
            className={`rounded-xl overflow-hidden relative w-full ${
              index === 1 ? "h-[100px]" : index === 3 ? "h-[420px]" : "h-[260px]"
            }`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="rounded-xl object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
            />
          </div>
        ))}
      </Masonry>
    </div>
  );
};

export default GalleryGrid;
