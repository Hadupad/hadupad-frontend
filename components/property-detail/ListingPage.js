"use client";
import Gallery from "./Gallery";
import Tabs from "./Tabs";
import BookingCard from "./BookingCard";
import HostInfo from "./HostInfo";
import Reviews from "./Reviews";

export default function ListingPage() {
  return (
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Gallery />
        <Tabs />
        <HostInfo />
        <Reviews />
      </div>
      <div className="sticky top-4 h-fit">
        <BookingCard />
      </div>
    </div>
  );
}