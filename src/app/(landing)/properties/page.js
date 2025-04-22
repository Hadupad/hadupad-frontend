
"use client";

import { useState } from "react";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import Search from "../../../../components/Search";
import OtherProperties from "../../../../components/OtherProperties";
import { MapIcon } from "@heroicons/react/24/solid"; // or outline

const Map = dynamic(() => import("../../../../components/Map"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-gray-200" />,
});

export default function HeroMapSection() {
  const [showMapMobile, setShowMapMobile] = useState(false);

  return (
    <section className="relative h-[100vh] text-white px-4 md:px-12 pt-4 md:pt-[80px] overflow-hidden">
      {/* --- Search at top on mobile --- */}
      {!showMapMobile && (
        <div className="relative z-20 w-full pt-40 md:mt-[-30px] md:text-center md:max-w-4xl md:mx-auto h-auto md:h-full flex flex-col justify-start md:justify-end order-1">
          <Search />
        </div>
      )}

      {/* --- Map and Properties --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 absolute inset-0 z-0 pt-16 md:pt-0">
        {/* Map is hidden on mobile */}
        <div className="hidden md:block w-full h-full">
          <Map />
        </div>

        {/* Other Properties - appears below Search on mobile */}
        <div className="w-full h-full flex items-center justify-center mt-20 order-2 md:mt-0">
          <OtherProperties />
        </div>
      </div>

      {/* Toggle Map Button - Only on mobile */}
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

      {/* Show map only if toggled (mobile only) */}
      {showMapMobile && (
        <div className="md:hidden absolute inset-0 z-40 mt-4" style={{ height: '89%' }}>
          <Map />
        </div>
      )}

      {/* Other properties section visible below the map on mobile */}
      {showMapMobile && (
        <div className="md:hidden mt-[89%] z-50">
          <OtherProperties />
        </div>
      )}
    </section>
  );
}
