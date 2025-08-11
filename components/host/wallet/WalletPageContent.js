import AccountCard from "./AccountCard";
import AmountCard from "./AmountPayableCard"; // reuse for both
import OverviewBalanceCard from "./OverviewBalanceCard";
import WalletActivityCard from "./WalletActivityCard";

export default function WalletPageContent() {
  return (
    <div className=" space-y-6">
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <AccountCard />
        <AmountCard title="Amount Payable" amount="0.00" note="Amount you can remove from the account" />
        <AmountCard title="Amount Available" amount="0.00" note="The fund is locked till every detail has been cleared" />
      </div>

      {/* Bottom cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <OverviewBalanceCard />
        <WalletActivityCard />
      </div>
    </div>
  );
}
