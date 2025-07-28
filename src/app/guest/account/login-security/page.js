"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SecuritySetting from "../../../../../components/accounts/SecuritySetting";
import DynamicDialog from "../../../../../components/accounts/DynamicDialog"; // reuse it!

export default function LoginSecurity() {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState(null);

  const handleOpenDialog = (type) => {
    setDialogType(type);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <button
        className="text-sm text-gray-500 mb-4 sm:hidden flex items-center"
        onClick={() => router.push("/account")}
      >
        ←↞
      </button>

      <SecuritySetting
        title="Password"
        description="Last updated 10 days ago"
        buttonLabel="Update"
        buttonColor="text-red-500"
        onClick={() => handleOpenDialog("password")}
      />

      <SecuritySetting
        title="Authentication"
        description="Add an extra layer of security by adding a two factor authentication method"
        buttonLabel="Add"
        onClick={() => handleOpenDialog("2fa")}
      />

      <SecuritySetting
        title="Account"
        description="Deactivate your account"
        buttonLabel="Deactivate"
        onClick={() => handleOpenDialog("deactivate")}
      />

      <DynamicDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        type={dialogType}
      />
    </div>
  );
}
