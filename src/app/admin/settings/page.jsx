'use client';

import { useState } from 'react';
import { Download, Edit, Save, ChevronDown } from 'lucide-react';

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general');
  const [isTabDropdownOpen, setIsTabDropdownOpen] = useState(false);
  const [platformName, setPlatformName] = useState('');
  const [defaultCurrency, setDefaultCurrency] = useState('NGN - NIGERIAN NAIRA');
  const [timezone, setTimezone] = useState('GMT +1');
  const [contactEmail, setContactEmail] = useState('');
  const [contactNumber, setContactNumber] = useState('+234-906-252-7593');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  
  const [hostServiceFee, setHostServiceFee] = useState('');
  const [guestServiceFee, setGuestServiceFee] = useState('CUST 204963');
  const [bookingFee, setBookingFee] = useState('');
  const [transactionFee, setTransactionFee] = useState('CUST 204963');

  const tabs = [
    { id: 'general', label: 'General Settings' },
    { id: 'fees', label: 'Fees' },
    { id: 'policies', label: 'Policies' },
    { id: 'localization', label: 'Localization' },
    { id: 'payment', label: 'Payment Methods' }
  ];

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">System Configuration</h1>
        </div>
        <button className="flex items-center gap-2 px-3 md:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Download className="w-4 h-4" />
          <span className="hidden md:inline">Download Report</span>
        </button>
      </div>

      {/* Mobile Tab Dropdown */}
      <div className="md:hidden relative">
        <button
          onClick={() => setIsTabDropdownOpen(!isTabDropdownOpen)}
          className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-lg bg-white"
        >
          <span className="text-sm font-medium">
            {tabs.find(tab => tab.id === activeTab)?.label}
          </span>
          <ChevronDown className="w-4 h-4" />
        </button>
        {isTabDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setIsTabDropdownOpen(false);
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                  activeTab === tab.id ? 'bg-red-50 text-red-600' : 'text-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Tabs */}
      <div className="hidden md:block border-b border-gray-200">
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-red-500 text-red-600 bg-red-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'general' && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">General Settings</h3>
              
              <div className="space-y-6">
                {/* Platform Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Platform Name
                  </label>
                  <input
                    type="text"
                    value={platformName}
                    onChange={(e) => setPlatformName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter platform name"
                  />
                </div>

                {/* Default Currency */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Currency
                  </label>
                  <select
                    value={defaultCurrency}
                    onChange={(e) => setDefaultCurrency(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="NGN - NIGERIAN NAIRA">NGN - NIGERIAN NAIRA</option>
                    <option value="USD - US DOLLAR">USD - US DOLLAR</option>
                    <option value="EUR - EURO">EUR - EURO</option>
                    <option value="GBP - BRITISH POUND">GBP - BRITISH POUND</option>
                  </select>
                </div>

                {/* Timezone */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  >
                    <option value="GMT +1">GMT +1</option>
                    <option value="GMT +0">GMT +0</option>
                    <option value="GMT -5">GMT -5</option>
                    <option value="GMT +8">GMT +8</option>
                  </select>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Email
                    </label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter contact email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Number
                    </label>
                    <input
                      type="tel"
                      value={contactNumber}
                      onChange={(e) => setContactNumber(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Maintenance Mode */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="maintenance"
                    checked={maintenanceMode}
                    onChange={(e) => setMaintenanceMode(e.target.checked)}
                    className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label htmlFor="maintenance" className="ml-2 block text-sm text-gray-900">
                    Enable Maintenance Mode
                  </label>
                </div>

                {/* Save Button */}
                <div className="flex justify-center pt-4">
                  <button className="flex items-center gap-2 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fees' && (
            <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
              {/* Fee Management */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Fee management</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Host Service Fee
                    </label>
                    <input
                      type="text"
                      value={hostServiceFee}
                      onChange={(e) => setHostServiceFee(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter host service fee"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Guest Service Fee
                    </label>
                    <input
                      type="text"
                      value={guestServiceFee}
                      onChange={(e) => setGuestServiceFee(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Commission Fees */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Commission Fees</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Booking Fee
                    </label>
                    <input
                      type="text"
                      value={bookingFee}
                      onChange={(e) => setBookingFee(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter booking fee"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Transaction Fee
                    </label>
                    <input
                      type="text"
                      value={transactionFee}
                      onChange={(e) => setTransactionFee(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Tax Settings */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Tax Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      VAT Rate (%)
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter VAT rate"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Service Tax (%)
                    </label>
                    <input
                      type="number"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Enter service tax"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'policies' && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Platform Policies</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cancellation Policy
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter cancellation policy details..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Terms of Service
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter terms of service..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Privacy Policy
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter privacy policy..."
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'localization' && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Localization Settings</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Default Language
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    <option value="en">English</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                    <option value="de">German</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date Format
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                    <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                    <option value="yyyy-mm-dd">YYYY-MM-DD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Number Format
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    <option value="1,234.56">1,234.56</option>
                    <option value="1.234,56">1.234,56</option>
                    <option value="1 234,56">1 234,56</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Methods</h3>
              <div className="space-y-4">
                {['Credit/Debit Cards', 'PayPal', 'Bank Transfer', 'Mobile Money', 'Cryptocurrency'].map((method) => (
                  <div key={method} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                        defaultChecked={method === 'Credit/Debit Cards' || method === 'PayPal'}
                      />
                      <label className="ml-3 text-sm font-medium text-gray-900">
                        {method}
                      </label>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Picture Section - Desktop Only */}
        <div className="hidden lg:block bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile picture</h3>
          <div className="text-center">
            <div className="mx-auto w-32 h-32 bg-gray-200 rounded-full mb-4 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <button className="flex items-center gap-2 mx-auto px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Edit className="w-4 h-4" />
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
