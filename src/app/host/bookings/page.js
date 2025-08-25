"use client";

import { useState } from "react";
import SubHeader from "../../../../components/host/bookings/SubHeader";
import Tabs from "../../../../components/host/bookings/Tabs";
import BookingSettingsModal from "../../../../components/host/bookings/BookingSettingsModal";

export default function Bookings() {
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  const handleSettingsClick = () => {
    setIsSettingsModalOpen(true);
  };

  const handleCloseSettings = () => {
    setIsSettingsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <SubHeader onSettingsClick={handleSettingsClick} />
      <Tabs />
      <BookingSettingsModal 
        isOpen={isSettingsModalOpen} 
        onClose={handleCloseSettings} 
      />
    </div>
  );
}
