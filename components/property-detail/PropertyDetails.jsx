"use client";

import {
  Home,
  Sparkles,
  Key,
  Calendar,
  Star,
  Shield,
  MessageCircle,
  Clock,
} from "lucide-react";
import PropTypes from "prop-types";

export default function PropertyDetails({ property }) {
  // Dynamic property details
  const propertyName = property?.name || "Untitled Property";
  const guestCount = property?.maxGuestCount || 2;
  const bedrooms = property?.bedrooms || 1;
  const beds = property?.beds || 0;
  const baths = property?.baths || 0;
  const city = property?.city || "Unknown city";
  const hostName = property?.host?.name || "Unknown Host";
  const reviewCount = property?.rating || 0;
  const averageRating = property?.averageRating || 0;
  const reviews = property?.reviews || [];

  // console.log('host data:', property?.host);

  // Map amenities to features
  const features = [
    {
      icon: Home,
      title: "Entire home",
      description: "You'll have the apartment to yourself",
      enabled: property?.guestAccommodationType
        ?.toLowerCase()
        .includes("entire"),
    },
    {
      icon: Sparkles,
      title: "Enhanced Clean",
      description: "This Host committed to enhanced cleaning process.",
      enabled: property?.amenities?.some((amenity) =>
        amenity.toLowerCase().includes("clean")
      ),
    },
    {
      icon: Key,
      title: "Self check-in",
      description: "Check yourself in with the keypad",
      enabled: property?.bookingType === "instant",
    },
    {
      icon: Calendar,
      title: "Free cancellation",
      description: "Free cancellation before the next available date",
      enabled: property?.availability?.isAvailableNow,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Property Title and Basic Info */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          {propertyName} in {city}
        </h1>
        <p className="text-gray-600">
          {guestCount} guest{guestCount !== 1 ? "s" : ""} · {bedrooms} bedroom
          {bedrooms !== 1 ? "s" : ""} · {beds} bed{beds !== 1 ? "s" : ""} ·{" "}
          {baths} bath{baths !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Property Features */}
      <div className="space-y-4 py-6 border-t border-gray-200">
        {features.map(
          (feature, index) =>
            feature.enabled && (
              <div key={index} className="flex items-start gap-4">
                <feature.icon className="w-6 h-6 text-gray-700 mt-1" />
                <div>
                  <h3 className="font-medium text-gray-900">{feature.title}</h3>
                  <p className="text-sm text-gray-600">
                    {feature.description}{" "}
                    {/* {feature.title === "Enhanced Clean" && (
                      <button className="text-gray-900 underline ml-1">Show more</button>
                    )} */}
                  </p>
                </div>
              </div>
            )
        )}
      </div>

      {/* Host Section */}
      <div className="py-6 border-t border-gray-200">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
            {property?.host?.profilePicture ? (
              <img
                src={property?.host?.profilePicture}
                alt={`${hostName} profile`}
                className="w-full h-full object-cover rounded-full"
                onError={(e) => {
                  console.log(
                    "Profile picture failed to load:",
                    property.host.profilePicture
                  );
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            <span
              className="text-gray-600 font-medium text-lg"
              style={{
                display: property?.host?.profilePicture ? "none" : "flex",
              }}
            >
              {hostName[0] || "H"}
            </span>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900">
              Hosted by {hostName}
            </h3>
            <p className="text-sm text-gray-600">Joined recently</p>
          </div>
        </div>

        <div className="flex items-center gap-6 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-red-500 fill-current" />
            <span className="text-sm text-gray-700">{reviewCount} Reviews</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="w-4 h-4 text-gray-700" />
            <span className="text-sm text-gray-700">Identity verified</span>
          </div>
        </div>

        <p className="text-gray-700 mb-4">
          Our hosts are committed to providing great stays for guests.
        </p>

        <div className="space-y-2 mb-6">
          <p className="text-sm text-gray-700">Response rate: N/A</p>
          <p className="text-sm text-gray-700">Response time: N/A</p>
        </div>

        <button className="px-6 py-2 border border-gray-900 rounded-lg text-gray-900 font-medium hover:bg-gray-50 transition-colors">
          Contact Host
        </button>

        <div className="flex items-start gap-3 mt-6 p-4 bg-gray-50 rounded-lg">
          <Shield className="w-5 h-5 text-gray-700 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-gray-700">
            To protect your payment, never transfer money or communicate outside
            of the Hadupad website or app.
          </p>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="py-6 border-t border-gray-200">
        <div className="flex items-center gap-2 mb-6">
          <Star className="w-5 h-5 text-red-500 fill-current" />
          <span className="text-lg font-medium">
            {reviewCount > 0
              ? `${averageRating.toFixed(1)} · ${reviewCount} reviews`
              : "No reviews yet"}
          </span>
        </div>

        {reviewCount > 0 ? (
          <>
            {/* Individual Reviews */}
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-600 font-medium text-sm">
                      {review.name?.[0] || "G"}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900">
                        {property?.host?.name || "Guest"}
                      </span>
                      <span className="text-sm text-gray-600">
                        {review.date || "Recent"}
                      </span>
                    </div>
                    <p className="text-gray-700 text-sm">
                      {review.comment || "No comment provided."}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              {/* <button className="text-sm text-gray-700 underline">Show more ↓</button> */}
            </div>

            {/* <button className="mt-4 px-6 py-2 border border-gray-900 rounded-lg text-gray-900 font-medium hover:bg-gray-50 transition-colors">
              Show all {reviewCount} reviews
            </button> */}
          </>
        ) : (
          <p className="text-gray-700 text-sm">
            This property has no reviews yet. Be the first to review!
          </p>
        )}
      </div>
    </div>
  );
}

PropertyDetails.propTypes = {
  property: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    location: PropTypes.string,
    rating: PropTypes.number,
    averageRating: PropTypes.number,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        date: PropTypes.string,
        comment: PropTypes.string,
      })
    ),
    beds: PropTypes.number,
    baths: PropTypes.number,
    bedrooms: PropTypes.number,
    price: PropTypes.number,
    description: PropTypes.string,
    amenities: PropTypes.arrayOf(PropTypes.string),
    placeType: PropTypes.string,
    guestAccommodationType: PropTypes.string,
    streetAddress: PropTypes.string,
    aptSuiteNumber: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    country: PropTypes.string,
    zipCode: PropTypes.string,
    maxGuestCount: PropTypes.number,
    host: PropTypes.shape({
      name: PropTypes.string,
      profilePicture: PropTypes.string,
      id: PropTypes.string,
      phoneNumber: PropTypes.string,
    }),
    instantBookingEnabled: PropTypes.bool,
    approveBookingEnabled: PropTypes.bool,
    bookingType: PropTypes.string,
    unavailableDates: PropTypes.arrayOf(PropTypes.string),
    availability: PropTypes.shape({
      isAvailableNow: PropTypes.bool,
      nextAvailableDate: PropTypes.string,
    }),
  }).isRequired,
};
