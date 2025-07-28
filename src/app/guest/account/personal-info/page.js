"use client";

import { useState } from "react";
import InfoSection from "../../../../../components/accounts/InfoSection";
import DynamicDialog from "../../../../../components/accounts/DynamicDialog";

export default function PersonalInfoPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState(null);

  const handleOpenDialog = (type) => {
    setDialogType(type);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto p-6">
      <InfoSection
        title="Legal name"
        value="(not provided)"
        onClick={() => handleOpenDialog("name")}
      />
      <InfoSection
        title="Email address"
        value="(not provided)"
        onClick={() => handleOpenDialog("email")}
      />
      <InfoSection
        title="Phone numbers"
        value="(not provided)"
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
        user={null} // Or omit this prop if optional
      />
    </div>
  );
}
