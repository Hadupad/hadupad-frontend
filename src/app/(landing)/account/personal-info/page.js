"use client";

import { useState, useEffect } from "react";
import InfoSection from "../../../../../components/accounts/InfoSection";
import DynamicDialog from "../../../../../components/accounts/DynamicDialog";

export default function PersonalInfoPage() {
  const [userData, setUserData] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("hadupad_user");
    if (storedUser) {
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  if (!userData) return <p>Loading...</p>;

  const basicUserInfo = {
    name: `${userData.firstName} ${userData.lastName}`,
    email: userData.email,
    phoneNumber: userData.phoneNumber,
  };

  const handleOpenDialog = (type) => {
    setDialogType(type);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto p-6">
      <InfoSection
        title="Legal name"
        value={basicUserInfo.name}
        onClick={() => handleOpenDialog("name")}
      />
      <InfoSection
        title="Email address"
        value={basicUserInfo.email}
        onClick={() => handleOpenDialog("email")}
      />
      <InfoSection
        title="Phone numbers"
        value={basicUserInfo.phoneNumber}
        onClick={() => handleOpenDialog("phone")}
      />
      <InfoSection
        title="Government ID"
        onClick={() => handleOpenDialog("govtId")}
      />
      <InfoSection
        title="Address"
        onClick={() => handleOpenDialog("address")}
      />
      <InfoSection
        title="Emergency contact"
        onClick={() => handleOpenDialog("emergency")}
      />

      <DynamicDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        type={dialogType}
        user={userData}
      />
    </div>
  );
}
