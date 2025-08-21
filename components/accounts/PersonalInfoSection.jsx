"use client";

import { useState } from 'react';
import EditLegalNameModal from './modals/EditLegalNameModal';
import EditEmailModal from './modals/EditEmailModal';
import AddPhoneModal from './modals/AddPhoneModal';
import AddGovernmentIdModal from './modals/AddGovernmentIdModal';
import EditAddressModal from './modals/EditAddressModal';
import AddEmergencyContactModal from './modals/AddEmergencyContactModal';

export default function PersonalInfoSection() {
  const [legalName, setLegalName] = useState('Faith Oyeniyi');
  const [email, setEmail] = useState('faithoyeniyi21@gmail.com');
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [governmentId, setGovernmentId] = useState(null);
  const [address, setAddress] = useState(null);
  const [emergencyContacts, setEmergencyContacts] = useState([]);

  // Modal states
  const [showLegalNameModal, setShowLegalNameModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [showGovernmentIdModal, setShowGovernmentIdModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showEmergencyContactModal, setShowEmergencyContactModal] = useState(false);

  const handleSaveLegalName = (name) => {
    setLegalName(name);
  };

  const handleSaveEmail = (newEmail) => {
    setEmail(newEmail);
  };

  const handleSavePhone = (phone) => {
    setPhoneNumbers([...phoneNumbers, phone]);
  };

  const handleSaveGovernmentId = (id) => {
    setGovernmentId(id);
  };

  const handleSaveAddress = (newAddress) => {
    setAddress(newAddress);
  };

  const handleSaveEmergencyContact = (contact) => {
    setEmergencyContact(contact);
  };

  const formatAddress = (addr) => {
    if (!addr) return 'Not provided';
    return `${addr.street}, ${addr.city}, ${addr.state} ${addr.zipCode}, ${addr.country}`;
  };

  const formatGovernmentId = (id) => {
    if (!id) return 'Not provided';
    return `${id.type.replace('_', ' ').toUpperCase()}: ${id.number}`;
  };

  const formatEmergencyContact = (contact) => {
    if (!contact) return 'Not provided';
    return `${contact.name} (${contact.relationship}) - ${contact.phoneNumber}`;
  };

  return (
    <div className="space-y-8">
      {/* Mobile Profile Header */}
      <div className="md:hidden text-center mb-8">
        <div className="w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden">
          <img 
            src="/images/hero/profile-placeholder.jpg" 
            alt="Faith Oyeniyi"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Ccircle cx='40' cy='40' r='40' fill='%23f3f4f6'/%3E%3Cpath d='M40 36c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm0 4c6.6 0 12 5.4 12 12v8H28v-8c0-6.6 5.4-12 12-12z' fill='%236b7280'/%3E%3C/svg%3E";
            }}
          />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-1">{legalName}</h2>
        <div className="flex items-center justify-center text-gray-600">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
          <span className="text-sm">Texas, U.S.A</span>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-start py-4 border-b border-gray-200">
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Legal name</h3>
            <p className="text-sm text-gray-600">{legalName}</p>
          </div>
          <button 
            onClick={() => setShowLegalNameModal(true)}
            className="text-sm text-red-600 hover:underline"
          >
            Edit
          </button>
        </div>
        
        <div className="flex justify-between items-start py-4 border-b border-gray-200">
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Email address</h3>
            <p className="text-sm text-gray-600">{email}</p>
          </div>
          <button 
            onClick={() => setShowEmailModal(true)}
            className="text-sm text-red-600 hover:underline"
          >
            Edit
          </button>
        </div>
        
        <div className="flex justify-between items-start py-4 border-b border-gray-200">
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Phone numbers</h3>
            {phoneNumbers.length > 0 ? (
              <div className="space-y-1">
                {phoneNumbers.map((phone, index) => (
                  <p key={index} className="text-sm text-gray-600">{phone}</p>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600">Add a number so confirmed guests and Airbnb can get in touch. You can add other numbers and choose how they're used.</p>
            )}
          </div>
          <button 
            onClick={() => setShowPhoneModal(true)}
            className="text-sm text-red-600 hover:underline"
          >
            Add
          </button>
        </div>
        
        <div className="flex justify-between items-start py-4 border-b border-gray-200">
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Government ID</h3>
            <p className={`text-sm ${governmentId ? 'text-gray-600' : 'text-gray-500'}`}>
              {formatGovernmentId(governmentId)}
            </p>
          </div>
          <button 
            onClick={() => setShowGovernmentIdModal(true)} 
            className="text-sm text-red-600 hover:underline"
          >
            Add
          </button>
        </div>
        
        <div className="flex justify-between items-start py-4 border-b border-gray-200">
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Address</h3>
            <p className={`text-sm ${address ? 'text-gray-600' : 'text-gray-500'}`}>
              {formatAddress(address)}
            </p>
          </div>
          <button 
            onClick={() => setShowAddressModal(true)}
            className="text-sm text-red-600 hover:underline"
          >
            Add
          </button>
        </div>
        
        <div className="flex justify-between items-start py-4 border-b border-gray-200">
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Emergency contact</h3>
            <p className={`text-sm ${emergencyContacts.length > 0 ? 'text-gray-600' : 'text-gray-500'}`}>
              {emergencyContacts.length > 0 ? formatEmergencyContact(emergencyContacts[0]) : 'Not provided'}
            </p>
          </div>
          <button onClick={() => setShowEmergencyContactModal(true)} className="text-sm text-red-600 hover:underline">Add</button>
        </div>
      </div>

      {/* Modals */}
      <EditLegalNameModal
        isOpen={showLegalNameModal}
        onClose={() => setShowLegalNameModal(false)}
        currentName={legalName}
        onSave={handleSaveLegalName}
      />
      
      <EditEmailModal
        isOpen={showEmailModal}
        onClose={() => setShowEmailModal(false)}
        currentEmail={email}
        onSave={handleSaveEmail}
      />
      
      <AddPhoneModal
        isOpen={showPhoneModal}
        onClose={() => setShowPhoneModal(false)}
        onSave={handleSavePhone}
      />
      
      <AddGovernmentIdModal
        isOpen={showGovernmentIdModal}
        onClose={() => setShowGovernmentIdModal(false)}
        onSave={handleSaveGovernmentId}
      />
      
      <EditAddressModal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        currentAddress={address}
        onSave={handleSaveAddress}
      />
      
      <AddEmergencyContactModal
        isOpen={showEmergencyContactModal}
        onClose={() => setShowEmergencyContactModal(false)}
        onSave={handleSaveEmergencyContact}
      />
    </div>
  );
}
