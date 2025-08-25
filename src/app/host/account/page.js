"use client";

import { useState } from "react";
import EditLegalNameModal from "../../../../components/accounts/modals/EditLegalNameModal";
import EditEmailModal from "../../../../components/accounts/modals/EditEmailModal";
import AddPhoneModal from "../../../../components/accounts/modals/AddPhoneModal";
import AddGovernmentIdModal from "../../../../components/accounts/modals/AddGovernmentIdModal";
import EditAddressModal from "../../../../components/accounts/modals/EditAddressModal";
import AddEmergencyContactModal from "../../../../components/accounts/modals/AddEmergencyContactModal";
import UpdatePasswordModal from "../../../../components/accounts/modals/UpdatePasswordModal";
import AddAuthenticationModal from "../../../../components/accounts/modals/AddAuthenticationModal";
import DeactivateAccountModal from "../../../../components/accounts/modals/DeactivateAccountModal";

const tabs = [
  { name: "Personal information", value: "personal" },
  { name: "Login & Security", value: "security" },
  { name: "Notifications", value: "notifications" },
];

export default function HostAccountPage() {
  const [activeTab, setActiveTab] = useState("personal");
  
  // User data state
  const [userData, setUserData] = useState({
    legalName: "Faith Oyeniyi",
    email: "faithoyeniyi21@gmail.com",
    phoneNumber: "",
    governmentId: null,
    address: null,
    emergencyContact: null,
  });

  // Modal states
  const [modals, setModals] = useState({
    editLegalName: false,
    editEmail: false,
    addPhone: false,
    addGovernmentId: false,
    editAddress: false,
    addEmergencyContact: false,
    updatePassword: false,
    addAuthentication: false,
    deactivateAccount: false,
  });

  const openModal = (modalName) => {
    setModals(prev => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName) => {
    setModals(prev => ({ ...prev, [modalName]: false }));
  };

  // Modal save handlers
  const handleSaveLegalName = (name) => {
    setUserData(prev => ({ ...prev, legalName: name }));
  };

  const handleSaveEmail = (email) => {
    setUserData(prev => ({ ...prev, email }));
  };

  const handleSavePhone = (phone) => {
    setUserData(prev => ({ ...prev, phoneNumber: phone }));
  };

  const handleSaveGovernmentId = (id) => {
    setUserData(prev => ({ ...prev, governmentId: id }));
  };

  const handleSaveAddress = (address) => {
    setUserData(prev => ({ ...prev, address }));
  };

  const handleSaveEmergencyContact = (contact) => {
    setUserData(prev => ({ ...prev, emergencyContact: contact }));
  };

  const handleUpdatePassword = (passwordData) => {
    console.log("Password updated:", passwordData);
  };

  const handleAddAuthentication = (authData) => {
    console.log("Authentication added:", authData);
  };

  const handleDeactivateAccount = (deactivationData) => {
    console.log("Account deactivated:", deactivationData);
  };

  const renderPersonalInformation = () => (
    <div className="space-y-6">
      {/* Mobile Profile Header - only show on mobile for personalDetails */}
      <div className="lg:hidden">
        {activeTab === "personalDetails" && (
          <div className="text-center py-6 border-b">
            <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-3 overflow-hidden">
              <img 
                src="https://i.pravatar.cc/80?img=1" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">{userData.legalName}</h2>
            <p className="text-gray-500 text-sm flex items-center justify-center mt-1">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              Texas, U.S.A
            </p>
          </div>
        )}
      </div>

      {/* Legal name */}
      <div className="flex justify-between items-start py-4 border-b border-gray-100">
        <div>
          <h3 className="text-base font-medium text-gray-900">Legal name</h3>
          <p className="text-sm text-gray-500 mt-1">{userData.legalName}</p>
        </div>
        <button 
          onClick={() => openModal('editLegalName')}
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Edit
        </button>
      </div>

      {/* Email address */}
      <div className="flex justify-between items-start py-4 border-b border-gray-100">
        <div>
          <h3 className="text-base font-medium text-gray-900">Email address</h3>
          <p className="text-sm text-gray-500 mt-1">{userData.email}</p>
        </div>
        <button 
          onClick={() => openModal('editEmail')}
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Edit
        </button>
      </div>

      {/* Phone numbers */}
      <div className="flex justify-between items-start py-4 border-b border-gray-100">
        <div>
          <h3 className="text-base font-medium text-gray-900">Phone numbers</h3>
          {userData.phoneNumber ? (
            <p className="text-sm text-gray-500 mt-1">{userData.phoneNumber}</p>
          ) : (
            <p className="text-sm text-gray-500 mt-1">Add a number</p>
          )}
        </div>
        <button 
          onClick={() => openModal('addPhone')}
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Add
        </button>
      </div>

      {/* Government ID */}
      <div className="flex justify-between items-start py-4 border-b border-gray-100">
        <div>
          <h3 className="text-base font-medium text-gray-900">Government ID</h3>
          {userData.governmentId ? (
            <p className="text-sm text-gray-500 mt-1">{userData.governmentId.type} - {userData.governmentId.number}</p>
          ) : (
            <p className="text-sm text-gray-500 mt-1">Must be provided</p>
          )}
        </div>
        <button 
          onClick={() => openModal('addGovernmentId')}
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Add
        </button>
      </div>

      {/* Address */}
      <div className="flex justify-between items-start py-4 border-b border-gray-100">
        <div>
          <h3 className="text-base font-medium text-gray-900">Address</h3>
          {userData.address ? (
            <p className="text-sm text-gray-500 mt-1">
              {userData.address.street}, {userData.address.city}, {userData.address.state} {userData.address.zipCode}, {userData.address.country}
            </p>
          ) : (
            <p className="text-sm text-gray-500 mt-1">Not provided</p>
          )}
        </div>
        <button 
          onClick={() => openModal('editAddress')}
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Add
        </button>
      </div>

      {/* Shared Contact */}
      <div className="flex justify-between items-start py-4">
        <div>
          <h3 className="text-base font-medium text-gray-900">Shared Contact</h3>
          {userData.emergencyContact ? (
            <p className="text-sm text-gray-500 mt-1">
              {userData.emergencyContact.name} ({userData.emergencyContact.relationship}) - {userData.emergencyContact.phoneNumber}
            </p>
          ) : (
            <p className="text-sm text-gray-500 mt-1">Not provided</p>
          )}
        </div>
        <button 
          onClick={() => openModal('addEmergencyContact')}
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Add
        </button>
      </div>
    </div>
  );

  const renderLoginSecurity = () => (
    <div className="space-y-0">
      {/* Password */}
      <div className="flex justify-between items-start py-4 border-b border-gray-100">
        <div>
          <h3 className="text-base font-medium text-gray-900">Password</h3>
          <p className="text-sm text-gray-500 mt-1">Last updated 10 days ago</p>
        </div>
        <button 
          onClick={() => openModal('updatePassword')}
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Update
        </button>
      </div>

      {/* Authentication */}
      <div className="flex justify-between items-start py-4 border-b border-gray-100">
        <div>
          <h3 className="text-base font-medium text-gray-900">Authentication</h3>
          <p className="text-sm text-gray-500 mt-1">
            Add an extra layer of security by adding a two factor authentication method
          </p>
        </div>
        <button 
          onClick={() => openModal('addAuthentication')}
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Add
        </button>
      </div>

      {/* Account */}
      <div className="flex justify-between items-start py-4">
        <div>
          <h3 className="text-base font-medium text-gray-900">Account</h3>
          <p className="text-sm text-gray-500 mt-1">Deactivate your account</p>
        </div>
        <button 
          onClick={() => openModal('deactivateAccount')}
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Deactivate
        </button>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-4">
      {/* Account Security Alert */}
      <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg">
        <div className="flex items-start">
          <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
            <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-red-800 text-sm">Account Security Alert:</h4>
            <p className="text-sm text-red-700 mt-1">
              Suspicious login detected. Check your email to secure your account.
            </p>
          </div>
        </div>
      </div>

      {/* Referral Program */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-start">
          <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
            <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 text-sm">Refer a Friend, Get Rewards:</h4>
            <p className="text-sm text-gray-600 mt-1">
              Invite friends to join - both you and your friends get rewards!
            </p>
            <button className="text-sm text-blue-600 hover:text-blue-700 mt-2 font-medium">
              Refer a friend
            </button>
          </div>
        </div>
      </div>

      {/* Another Security Alert */}
      <div className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg">
        <div className="flex items-start">
          <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
            <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-red-800 text-sm">Account Security Alert:</h4>
            <p className="text-sm text-red-700 mt-1">
              Suspicious login detected. Check your email to secure your account.
            </p>
          </div>
        </div>
      </div>

      {/* Another Referral Program */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-start">
          <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center mr-3 flex-shrink-0 mt-0.5">
            <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 text-sm">Refer a Friend, Get Rewards:</h4>
            <p className="text-sm text-gray-600 mt-1">
              Invite friends to join - both you and your friends get rewards!
            </p>
            <button className="text-sm text-blue-600 hover:text-blue-700 mt-2 font-medium">
              Refer a friend
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "personal":
        return renderPersonalInformation();
      case "personalDetails":
        return renderPersonalInformation();
      case "security":
        return renderLoginSecurity();
      case "notifications":
        return renderNotifications();
      default:
        return renderPersonalInformation();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile View */}
      <div className="lg:hidden">
        {/* Show main account page when on personal tab */}
        {activeTab === "personal" && (
          <div className="bg-white min-h-screen">
            {/* Account Content */}
            <div className="px-5 pt-8 pb-12">
              {/* Account Title and User Info */}
              <div className="mb-10">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">Account</h1>
                <p className="text-gray-600 text-sm">
                  {userData.legalName}, {userData.email}
                </p>
              </div>

              {/* Account Sections Grid */}
              <div className="space-y-6">
                {/* Top Row - Personal Information and Login & Security */}
                <div className="grid grid-cols-2 gap-6">
                  <button 
                    onClick={() => setActiveTab("personalDetails")}
                    className="bg-gray-100 rounded-xl p-6 text-left h-36 flex flex-col justify-between"
                  >
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mb-2">
                      <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm mb-1">Personal Information</h3>
                      <p className="text-xs text-gray-500">More information about you.</p>
                    </div>
                  </button>

                  <button 
                    onClick={() => setActiveTab("security")}
                    className="bg-gray-100 rounded-xl p-6 text-left h-36 flex flex-col justify-between"
                  >
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mb-2">
                      <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 text-sm mb-1">Login & Security</h3>
                      <p className="text-xs text-gray-500">More information about you.</p>
                    </div>
                  </button>
                </div>

                {/* Bottom Row - Notifications */}
                <button 
                  onClick={() => setActiveTab("notifications")}
                  className="w-full bg-gray-100 rounded-xl p-6 text-left h-28 flex items-center"
                >
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm mb-1">Notifications</h3>
                    <p className="text-xs text-gray-500">Alerts, verification and more</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Content for other tabs */}
        {activeTab !== "personal" && (
          <div className="bg-white min-h-screen">
            <div className="bg-white border-b px-4 py-3 flex items-center">
              <button onClick={() => setActiveTab("personal")} className="mr-3">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <h1 className="text-lg font-semibold">
                {activeTab === "personalDetails"
                  ? "Personal Information"
                  : activeTab === "security"
                  ? "Login & Security"
                  : "Notifications"}
              </h1>
            </div>
            <div className="p-4">
              {renderTabContent()}
            </div>
          </div>
        )}
      </div>

      {/* Desktop View */}
      <div className="hidden lg:block px-4 lg:px-6 py-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8 mt-8 md:mt-16">
            <h1 className="text-2xl lg:text-3xl font-semibold text-gray-900 mb-2">
              Account
            </h1>
            <p className="text-gray-600">
              Faith Oyeniyi , faithoyeniyi21@gmail.com
            </p>
          </div>

          {/* Tabs */}
          <div className="flex space-x-0 lg:space-x-6 border-b mb-6 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`pb-3 px-1 lg:px-0 border-b-2 text-sm font-medium transition whitespace-nowrap ${
                  activeTab === tab.value
                    ? "border-red-500 text-black"
                    : "border-transparent text-gray-500 hover:text-black"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-lg shadow-sm p-6 lg:p-8">
            {renderTabContent()}
          </div>
        </div>
      </div>

      {/* Modals */}
      <EditLegalNameModal
        isOpen={modals.editLegalName}
        onClose={() => closeModal('editLegalName')}
        onSave={handleSaveLegalName}
        currentName={userData.legalName}
      />

      <EditEmailModal
        isOpen={modals.editEmail}
        onClose={() => closeModal('editEmail')}
        onSave={handleSaveEmail}
        currentEmail={userData.email}
      />

      <AddPhoneModal
        isOpen={modals.addPhone}
        onClose={() => closeModal('addPhone')}
        onSave={handleSavePhone}
      />

      <AddGovernmentIdModal
        isOpen={modals.addGovernmentId}
        onClose={() => closeModal('addGovernmentId')}
        onSave={handleSaveGovernmentId}
      />

      <EditAddressModal
        isOpen={modals.editAddress}
        onClose={() => closeModal('editAddress')}
        onSave={handleSaveAddress}
        currentAddress={userData.address}
      />

      <AddEmergencyContactModal
        isOpen={modals.addEmergencyContact}
        onClose={() => closeModal('addEmergencyContact')}
        onSave={handleSaveEmergencyContact}
      />

      <UpdatePasswordModal
        isOpen={modals.updatePassword}
        onClose={() => closeModal('updatePassword')}
        onSave={handleUpdatePassword}
      />

      <AddAuthenticationModal
        isOpen={modals.addAuthentication}
        onClose={() => closeModal('addAuthentication')}
        onSave={handleAddAuthentication}
      />

      <DeactivateAccountModal
        isOpen={modals.deactivateAccount}
        onClose={() => closeModal('deactivateAccount')}
        onSave={handleDeactivateAccount}
      />
    </div>
  );
}
