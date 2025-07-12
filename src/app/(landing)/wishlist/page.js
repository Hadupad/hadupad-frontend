"use client";
import SubHeader from "../../../../components/wishlist/SubHeader";
import WishlistProperties from "../../../../components/wishlist/WishlistProperties";

export default function WishlistPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-50 py-8">
      <SubHeader />
      <WishlistProperties />
    </div>
  );
}