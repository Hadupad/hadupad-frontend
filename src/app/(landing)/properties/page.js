"use client";

import { useState, useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import Search from "../../../../components/Search";
import OtherProperties from "../../../../components/OtherProperties";
import { MapIcon } from "@heroicons/react/24/solid";

const Map = dynamic(() => import("../../../../components/Map"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-200" />,
});

export default function HeroMapSection() {
  const [showMapMobile, setShowMapMobile] = useState(false);
  const scrollRef = useRef(null);

  const handleInnerScroll = (e) => {
    const el = e.target;
    const isAtBottom = el.scrollHeight - el.scrollTop <= el.clientHeight + 1;

    if (isAtBottom) {
      document.body.style.overflow = "auto"; // Allow page scroll
    } else {
      document.body.style.overflow = "hidden"; // Lock page scroll
    }
  };

  useEffect(() => {
    // Lock scroll on page load
    document.body.style.overflow = "hidden";

    return () => {
      // Reset when component unmounts
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <section className="relative h-[100vh] text-white px-4 md:px-12 pt-4 md:pt-[80px] overflow-hidden">
      {/* --- Search at top on mobile --- */}
      {!showMapMobile && (
        <div className="relative z-20 w-full pt-40 md:mt-[-30px] md:text-center md:max-w-4xl md:mx-auto h-auto md:h-full flex flex-col justify-start md:justify-end order-1">
          <Search />
        </div>
      )}

      {/* --- Map and Properties Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 absolute inset-0 z-0 pt-16 md:pt-0">
        {/* Map only on desktop */}
        <div className="hidden md:block w-full h-full">
          <Map />
        </div>

        {/* Scrollable OtherProperties Section */}
        {/* <div
          className="w-full h-full flex justify-center mt-20 order-2 md:mt-0 overflow-y-auto max-h-[calc(100vh-100px)] px-2"
          onScroll={handleInnerScroll}
          ref={scrollRef}
        > */}
        <div
          className="w-full h-full flex justify-center mt-20 order-2 md:mt-0 overflow-y-auto max-h-[calc(100vh-100px)] px-2"
          style={{ scrollbarGutter: "stable" }}
          onScroll={handleInnerScroll}
          ref={scrollRef}
        >
          <OtherProperties />
        </div>
      </div>

      {/* --- Toggle Map Button - Mobile Only --- */}
      <div className="md:hidden fixed bottom-20 left-1/2 -translate-x-1/2 z-50">
        <button
          onClick={() => setShowMapMobile(!showMapMobile)}
          className="bg-black text-white px-6 py-3 rounded-3xl shadow-lg flex items-center gap-2"
        >
          {showMapMobile ? (
            "Hide Map"
          ) : (
            <>
              <span>Map</span>
              <MapIcon className="w-5 h-5 text-white" />
            </>
          )}
        </button>
      </div>

      {/* --- Mobile Map View --- */}
      {showMapMobile && (
        <div
          className="md:hidden absolute inset-0 z-40 mt-4"
          style={{ height: "89%" }}
        >
          <Map />
        </div>
      )}

      {/* --- Scrollable Mobile Properties Section --- */}
      {showMapMobile && (
        <div
          className="md:hidden mt-[89%] z-50 overflow-y-auto max-h-[calc(100vh-100px)] px-2"
          onScroll={handleInnerScroll}
          ref={scrollRef}
        >
          <OtherProperties />
        </div>
      )}
    </section>
  );
}
