"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Home } from "lucide-react";

export default function Map() {
  const [isClient, setIsClient] = useState(false);
  const [L, setL] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("leaflet").then((leaflet) => {
        setL(leaflet.default);
      });
      setIsClient(true);
    }
  }, []);

  if (!isClient || !L) return null;

  const customIcon = L.icon({
    iconUrl: "/images/icons/homeicon-removebg-preview.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  return (
    <div className="h-96 w-full rounded-md overflow-hidden shadow-md z-0">
      <MapContainer
        center={[9.0579, 7.4951]}
        zoom={13}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[9.0579, 7.4951]} icon={customIcon}>
          <Popup className="flex items-center">
            <Home className="w-4 h-4 text-red-500 mr-1" />
            <span>You're here!</span>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
