"use client";
import { useState } from "react";
import PaymentSection from "../../../../../components/accounts/PaymentSection";
import DynamicDialog from "../../../../../components/accounts/DynamicDialog";

export default function PaymentsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState("");

  const openDialog = (type) => {
    setDialogType(type);
    setDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <PaymentSection
        title="Your wallet"
        description="Add money to your wallet for bookings and refunds using your account number and our secure payment platform"
        buttonLabel="Add account number"
        onClick={() => openDialog("bank")}
      />

      <PaymentSection
        title="Your payment method"
        description="Add a payment method using our secure payment system, then start planning your next trip."
        buttonLabel="Add payment method"
        onClick={() => openDialog("card")}
      />

      <PaymentSection
        title="Coupons"
        description="Your coupons, discounts and more"
        buttonLabel="Add coupon"
        onClick={() => openDialog("coupon")}
      />

      <DynamicDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        type={dialogType}
      />
    </div>
  );
}
