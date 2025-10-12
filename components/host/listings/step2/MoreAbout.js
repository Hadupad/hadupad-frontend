'use client';

import { useState } from "react";
import { FaWifi, FaTv, FaCar } from "react-icons/fa";
import { FaSnowflake, FaUmbrellaBeach } from "react-icons/fa6";
import { MdKitchen } from "react-icons/md";
import { GiWashingMachine, GiOfficeChair } from "react-icons/gi";
import { TbSwimming } from "react-icons/tb";
import BottomNav from "../BottomNav";
import SaveExitButton from "../SaveExitButton";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updateAmenitiesAsync } from '@/redux/slices/amenitiesSlice';

export default function MoreAbout({ onNext, onBack, handleSaveExit }) {
  const { property } = useSelector((state) => state.property);
  const { amenities, loading, error } = useSelector((state) => state.amenities);
  const [selectedAmenities, setSelectedAmenities] = useState(amenities || []);

  const dispatch = useDispatch();

  const amenitiesList = [
    { name: "Wifi", icon: <FaWifi size={24} /> },
    { name: "TV", icon: <FaTv size={24} /> },
    { name: "Kitchen", icon: <MdKitchen size={24} /> },
    { name: "Washer", icon: <GiWashingMachine size={24} /> },
    { name: "Car Parking", icon: <FaCar size={24} /> },
    { name: "Workspace", icon: <GiOfficeChair size={24} /> },
    { name: "Air Conditioning", icon: <FaSnowflake size={24} /> },
    { name: "Swimming Pool", icon: <TbSwimming size={24} /> },
    { name: "Relaxation Area", icon: <FaUmbrellaBeach size={24} /> }
  ];

  const toggleAmenity = (amenityName) => {
    setSelectedAmenities(prev => 
      prev.includes(amenityName)
        ? prev.filter(name => name !== amenityName)
        : [...prev, amenityName]
    );
  };

  const handleNext = () => {
    if (!property?.id) {
      toast.error('Property ID not found. Please start over.');
      return;
    }

    dispatch(updateAmenitiesAsync({
      propertyId: property.id,
      data: { amenities: selectedAmenities, moveToNextStep: true },
    }))
      .unwrap()
      .then(() => {
        toast.success('Amenities updated successfully');
        onNext();
      })
      .catch((err) => {
        toast.error(err || 'Failed to update amenities');
      });
  };

  return (
    <>
      {/* <SaveExitButton onClick={handleSaveExit} /> */}
      
      <div className="w-full flex flex-col items-center">
        <h2 className="text-2xl font-bold mt-1 mb-2">
          Which amenities do you offer?
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12 w-full max-w-2xl">
          {amenitiesList.map((amenity) => (
            <button
              key={amenity.name}
              onClick={() => toggleAmenity(amenity.name)}
              className={`p-4 border rounded-xl flex flex-col items-center gap-2 ${
                selectedAmenities.includes(amenity.name) 
                  ? "border-black bg-gray-50" 
                  : "border-gray-300"
              }`}
            >
              {amenity.icon}
              <span className="text-sm text-center">{amenity.name}</span>
            </button>
          ))}
        </div>

      <BottomNav
  onBack={onBack}
  onNext={handleNext}
  nextLabel="Continue"
  loading={loading} // Pass the loading state
/>
      </div>
    </>
  );
}