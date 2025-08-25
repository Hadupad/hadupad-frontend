"use client";

import SubHeader from "../../../../components/host/wallet/SubHeader";
import WalletPageContent from "../../../../components/host/wallet/WalletPageContent";

export default function Wallet() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6 mt-8 md:mt-14">
        <SubHeader />
        <WalletPageContent />
      </div>
    </div>
  );
}
