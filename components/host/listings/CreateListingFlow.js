"use client";

import { useState } from "react";

import CreateStep1 from "./CreateStep1";
import PropertyTypeSelector from "./step1/PropertyTypeSelector";
import PlacePrivacySelector from "./step1/PlacePrivacySelector";
import AddressInput from "./step1/AddressInput";
import FullAddressForm from "./step1/FullAddressForm";
import MapWithAddress from "./step1/MapWithAddress";
import RoomCounters from "./step1/RoomCounters";

import CreateStep2 from "./CreateStep2";
import MoreAbout from "./step2/MoreAbout";
import HousePhotos from "./step2/HousePhotos";
import HousePhotosView from "./step2/HousePhotosView";
import Title from "./step2/Title";
import Description from "./step2/Description";

import CreateStep3 from "./CreateStep3";
import BookingSetting from "./step3/BookingSetting";
import PriceSetting from "./step3/PriceSettings";
import PriceSettingDiscounts from "./step3/PriceSettingsDiscounts";
import Review from "./step3/Review";

import { useRouter } from "next/navigation";


export default function CreateListingFlow() {
  const [step, setStep] = useState(0);
  const [photos, setPhotos] = useState([]);
  const router = useRouter();

  const next = () => setStep((prev) => prev + 1);
  const back = () => setStep((prev) => Math.max(0, prev - 1));

  const renderContent = () => {
    switch (step) {
      case 0:
        return <CreateStep1 onNext={next} />;
      case 1:
        return <PropertyTypeSelector onNext={next} onBack={back} />;
      case 2:
        return <PlacePrivacySelector onNext={next} onBack={back} />;
      case 3:
        return <AddressInput onNext={next} onBack={back} />;
      case 4:
        return <FullAddressForm onNext={next} onBack={back} />;
      case 5:
        return <MapWithAddress onNext={next} onBack={back} />;
      case 6:
        return <RoomCounters onNext={next} onBack={back} />;
      case 7:
        return <CreateStep2 onNext={next} onBack={back} />;
      case 8:
        return <MoreAbout onNext={next} onBack={back} />;
      case 9:
        return (
          <HousePhotos
            onNext={next}
            onBack={back}
            photos={photos}
            setPhotos={setPhotos}
            
          />
        );

      case 10:
        return (
          <HousePhotosView
            onNext={next}
            onBack={back}
            photos={photos}
          />
        );

      case 11:
        return <Title onNext={next} onBack={back} />;
      case 12:
        return <Description onNext={next} onBack={back} />;
      case 13:
        return <CreateStep3 onNext={next} onBack={back} />;
      case 14:
        return <BookingSetting onNext={next} onBack={back} />;
      case 15:
        return <PriceSetting onNext={next} onBack={back} />;
      case 16:
        return <PriceSettingDiscounts onNext={next} onBack={back} />;
      case 17:
        return <Review onNext={() => router.push("/host/listings")} onBack={back} />;
      default:
        return null;
    }
  };

  return <div className="px-6">{renderContent()}</div>;
}
