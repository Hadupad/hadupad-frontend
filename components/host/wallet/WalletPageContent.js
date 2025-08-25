import AccountCard from "./AccountCard";
import AmountPayableCard from "./AmountPayableCard";
import OverviewBalanceCard from "./OverviewBalanceCard";
import WalletActivityCard from "./WalletActivityCard";

export default function WalletPageContent() {
  return (
    <div className="space-y-8 px-4 md:px-6">
      {/* Top cards row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AccountCard />
        <AmountPayableCard title="Amount Payable" amount="0.00" note="Amount you can remove from the account" />
        <AmountPayableCard title="Amount Available" amount="0.00" note="The fund is locked till every detail has been cleared" />
      </div>

      {/* Bottom cards row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <OverviewBalanceCard />
        <WalletActivityCard />
      </div>
    </div>
  );
}
