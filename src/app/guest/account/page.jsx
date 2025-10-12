"use client";

import { useState } from 'react';
import Navbar from '../../../../components/NavBar';
import PersonalInfoSection from '../../../../components/accounts/PersonalInfoSection';
import LoginSecuritySection from '../../../../components/accounts/LoginSecuritySection';
import PaymentsSection from '../../../../components/accounts/PaymentsSection';

const AccountPage = () => {
  const [activeTab, setActiveTab] = useState('personal-info');
  const [isMobileView, setIsMobileView] = useState(false);

  const tabs = [
    { id: 'personal-info', name: 'Personal Information' },
    { id: 'login-security', name: 'Login & Security' },
    { id: 'payments', name: 'Payments' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'personal-info':
        return <PersonalInfoSection />;
      case 'login-security':
        return <LoginSecuritySection />;
      case 'payments':
        return <PaymentsSection />;
      default:
        return <PersonalInfoSection />;
    }
  };

  // Mobile section navigation handler
  const handleMobileSectionClick = (tabId) => {
    setActiveTab(tabId);
    setIsMobileView(true);
  };

  const handleMobileBack = () => {
    setIsMobileView(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Desktop View */}
      <main className="hidden md:block py-[50px] px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Account Header */}
          <div className="mt-20 mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Account</h1>
            <p className="text-gray-600">
              <span className="font-medium">Faith Oyeniyi</span>, faithoyeniyi21@gmail.com
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-8">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-[#DC4731] text-[#DC4731]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="bg-white">
            {renderContent()}
          </div>
        </div>
      </main>

      {/* Mobile View */}
      <main className="md:hidden">
        {!isMobileView ? (
          // Mobile Account Overview
          <div className="pt-24 px-4 pb-6">
            {/* Mobile Header */}
            <div className="text-left mb-8 mt-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Account</h1>
              <p className="text-gray-600">
                <span className="font-medium">Faith Oyeniyi</span>, faithoyeniyi21@gmail.com
              </p>
            </div>

            {/* Mobile Section Cards - 2x2 Grid Layout */}
            <div className="grid grid-cols-2 gap-4">
              {/* Personal Information Card */}
              <div 
                onClick={() => handleMobileSectionClick('personal-info')}
                className="bg-gray-50 rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="text-center">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">Personal Information</h3>
                  <p className="text-xs text-gray-600">More information about you.</p>
                </div>
              </div>

              {/* Login & Security Card */}
              <div 
                onClick={() => handleMobileSectionClick('login-security')}
                className="bg-gray-50 rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="text-center">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">Login & Security</h3>
                  <p className="text-xs text-gray-600">More information about you.</p>
                </div>
              </div>

              {/* Payments Card - Full Width Bottom */}
              <div 
                onClick={() => handleMobileSectionClick('payments')}
                className="col-span-2 bg-gray-50 rounded-lg p-6 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="text-center">
                  <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                      <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 mb-2">Payments</h3>
                  <p className="text-xs text-gray-600">More information about you.</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Mobile Section Detail View
          <div className="pt-24">
            {/* Mobile Section Header with Back Button */}
            <div className="flex items-center px-4 py-4 border-b border-gray-200 mt-6">
              <button 
                onClick={handleMobileBack}
                className="mr-4 p-1"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-xl font-semibold text-gray-900">
                {tabs.find(tab => tab.id === activeTab)?.name}
              </h1>
            </div>

            {/* Mobile Section Content */}
            <div className="px-4 py-6">
              {renderContent()}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AccountPage;
