import React from "react";

export default function CardForm() {
  return (
    <div>
      <form className="space-y-4">
        {/* Card Logos */}
        <div className="flex gap-2 items-center">
          <img src="/images/icons/visa.jpg" alt="Visa" className="h-6" />
          <img src="/images/icons/stripe.jpg" alt="Stripe" className="h-6" />
          <img src="/images/icons/paypal.jpg" alt="PayPal" className="h-6" />
          <img src="/images/icons/mastercard.jpg" alt="Mastercard" className="h-6" />
          <img src="/images/icons/Gpay.jpg" alt="Google Pay" className="h-6" />
        </div>

        {/* Card Number */}
        <div>
          <label className="text-sm">Card Number</label>
          <input
            type="text"
            placeholder="XXXX - XXXX - XXXX - XXXX"
            className="w-full border px-4 py-2 rounded"
          />
        </div>

        {/* Expiration and CVV */}
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="text-sm">Expiration</label>
            <input
              type="text"
              placeholder="MM/YY"
              defaultValue="02/27"
              className="w-full border px-4 py-2 rounded"
            />
          </div>
          <div className="flex-1">
            <label className="text-sm">CVV</label>
            <input
              type="text"
              placeholder="123"
              className="w-full border px-4 py-2 rounded"
            />
          </div>
        </div>

        {/* Billing Address */}
        <div>
          <label className="text-sm font-semibold">Billing address</label>
          <input
            type="text"
            placeholder="Street address"
            className="w-full border px-4 py-2 rounded mt-1"
          />
        </div>
        <input
          type="text"
          placeholder="Apt or suite number"
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="text"
          placeholder="e.g Abuja"
          className="w-full border px-4 py-2 rounded"
        />

        {/* State and Zip */}
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="State"
            className="flex-1 border px-4 py-2 rounded"
          />
          <input
            type="text"
            placeholder="Zip code"
            className="flex-1 border px-4 py-2 rounded"
          />
        </div>

        {/* Country/Region */}
        <div>
          <label className="text-sm">Country/Region</label>
          <select className="w-full border px-4 py-2 rounded">
            <option>Nigeria (+234)</option>
            {/* Add more countries if needed */}
          </select>
        </div>
      </form>
    </div>
  );
}
