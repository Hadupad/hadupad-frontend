'use client';

import Header from '../../../../components/property-detail/PropertyHeader';
import PropertyGallery from '../../../../components/property-detail/PropertyGallery';
// import Tabs from '../../../../components/property-detail/Tabs';
import BookingCard from '../../../../components/property-detail/BookingCard';

export default function ApartmentPage() {
  // Static data (will be replaced with dynamic data later)
  const apartmentData = {
    title: "Modern, Classy Apartment in The Bui",
    reviews: 7,
    rating: 5.0,
    location: "Zarekara - Juku, Abisha, Niguchi",
    guests: 3,
    bedrooms: 1,
    baths: 1,
    description: "Enhanced clean... (add full description)",
    amenities: ["Wifi", "Kitchen", "Parking"], // Add all
  };

  return (
    <div className="mx-auto px-2 md:px-10 py-8 pt-30">
      <Header data={apartmentData} />
      <PropertyGallery />
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-3/4">
          {/* <Tabs data={apartmentData} /> */}
        </div>
        <div className="w-full md:w-1/4 max-w-sm md:block hidden">
          <BookingCard />
        </div>
      </div>
    </div>
  );
}
