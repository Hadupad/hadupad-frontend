"use client";

import { useState, useRef, useEffect } from 'react';
import AddAccountDetailsModal from './modals/AddAccountDetailsModal';
import AddCardDetailsModal from './modals/AddCardDetailsModal';

export default function PaymentsSection() {
  const [wallet, setWallet] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [showWalletDropdown, setShowWalletDropdown] = useState(false);
  const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);
  
  const walletDropdownRef = useRef(null);
  const paymentDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (walletDropdownRef.current && !walletDropdownRef.current.contains(event.target)) {
        setShowWalletDropdown(false);
      }
      if (paymentDropdownRef.current && !paymentDropdownRef.current.contains(event.target)) {
        setShowPaymentDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSaveAccount = (accountData) => {
    setWallet(accountData);
  };

  const handleSaveCard = (cardData) => {
    setPaymentMethod(cardData);
  };

  const WalletDropdown = () => (
    <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-32">
      <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50">Withdraw</button>
      <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50">Remove</button>
    </div>
  );

  const PaymentDropdown = () => (
    <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-md shadow-lg z-10 w-32">
      <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50">Set default</button>
      <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-50">Remove</button>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="space-y-8">
        {/* Your wallet */}
        <div className="space-y-4">
          {!wallet ? (
            // Empty state
            <>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">Your wallet</h3>
                <p className="text-sm text-gray-600">Add money to your wallet for bookings and refunds using your account number and our secure payment platform.</p>
              </div>
              <button 
                onClick={() => setShowAccountModal(true)}
                className="bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800"
              >
                Add account number
              </button>
            </>
          ) : (
            // Populated state
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  Z
                </div>
                <div>
                  <div className="font-medium text-gray-900">WALLET</div>
                  <div className="text-sm text-gray-500">{wallet.accountNumber}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className="font-medium">₦ 00.00</span>
                <div className="relative" ref={walletDropdownRef}>
                  <button 
                    onClick={() => setShowWalletDropdown(!showWalletDropdown)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ⋮
                  </button>
                  {showWalletDropdown && <WalletDropdown />}
                </div>
              </div>
            </div>
          )}
          
          {wallet && (
            <button 
              onClick={() => setShowAccountModal(true)}
              className="bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800"
            >
              Add money
            </button>
          )}
        </div>
        
        {/* Your payment method */}
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Your payment method</h3>
            <p className="text-sm text-gray-600">Add a payment method using our secure payment system, then start planning your next trip.</p>
          </div>
          
          {paymentMethod && (
            <div className="flex justify-between items-center py-2">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-5 bg-red-500 rounded text-white text-xs flex items-center justify-center font-bold">
                  M
                </div>
                <div>
                  <div className="font-medium text-gray-900">MASTERCARD....{paymentMethod.cardNumber.slice(-4)}</div>
                  <div className="text-sm text-gray-500">Expires {paymentMethod.expiration}</div>
                </div>
              </div>
              <div className="relative" ref={paymentDropdownRef}>
                <button 
                  onClick={() => setShowPaymentDropdown(!showPaymentDropdown)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ⋮
                </button>
                {showPaymentDropdown && <PaymentDropdown />}
              </div>
            </div>
          )}
          
          <button 
            onClick={() => setShowCardModal(true)}
            className="bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800"
          >
            Add payment method
          </button>
        </div>
        
        {/* Coupons */}
        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-900 mb-1">Coupons</h3>
              <p className="text-sm text-gray-600">Your coupons, discounts and more</p>
            </div>
            <span className="text-sm text-gray-500">0</span>
          </div>
          <button className="bg-black text-white px-4 py-2 rounded text-sm font-medium hover:bg-gray-800">
            Add coupon
          </button>
        </div>
      </div>

      {/* Modals */}
      <AddAccountDetailsModal
        isOpen={showAccountModal}
        onClose={() => setShowAccountModal(false)}
        onSave={handleSaveAccount}
      />
      
      <AddCardDetailsModal
        isOpen={showCardModal}
        onClose={() => setShowCardModal(false)}
        onSave={handleSaveCard}
      />
    </div>
  );
}
