"use client";

import { useState } from 'react';
import UpdatePasswordModal from './modals/UpdatePasswordModal';
import AddAuthenticationModal from './modals/AddAuthenticationModal';
import DeactivateAccountModal from './modals/DeactivateAccountModal';

export default function LoginSecuritySection() {
  const [lastPasswordUpdate, setLastPasswordUpdate] = useState('10 days ago');
  const [authenticationMethod, setAuthenticationMethod] = useState(null);
  
  // Modal states
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);

  const handlePasswordUpdate = (passwordData) => {
    // In a real app, this would make an API call
    setLastPasswordUpdate('Just now');
    console.log('Password updated:', passwordData);
  };

  const handleAddAuthentication = (authData) => {
    setAuthenticationMethod(authData);
    console.log('Authentication added:', authData);
  };

  const handleDeactivateAccount = (deactivationData) => {
    // In a real app, this would make an API call to deactivate
    console.log('Account deactivated:', deactivationData);
    alert('Account has been deactivated');
  };

  const formatAuthMethod = (auth) => {
    if (!auth) return 'Add an extra layer of security by adding a two factor authentication method';
    
    switch (auth.method) {
      case 'authenticator':
        return 'Authenticator app enabled';
      case 'sms':
        return `SMS authentication enabled for ${auth.phoneNumber}`;
      case 'email':
        return `Email authentication enabled for ${auth.email}`;
      default:
        return 'Two-factor authentication enabled';
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-6">
        <div className="flex justify-between items-start py-4 border-b border-gray-200">
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Password</h3>
            <p className="text-sm text-gray-600">Last updated {lastPasswordUpdate}</p>
          </div>
          <button 
            onClick={() => setShowPasswordModal(true)}
            className="text-sm text-[#DC4731] hover:underline"
          >
            Update
          </button>
        </div>
        
        <div className="flex justify-between items-start py-4 border-b border-gray-200">
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Authentication</h3>
            <p className="text-sm text-gray-600">{formatAuthMethod(authenticationMethod)}</p>
          </div>
          <button 
            onClick={() => setShowAuthModal(true)} 
            className="text-sm text-red-600 hover:underline"
          >
            Add
          </button>
        </div>
        
        <div className="flex justify-between items-start py-4 border-b border-gray-200">
          <div>
            <h3 className="font-medium text-gray-900 mb-1">Account</h3>
            <p className="text-sm text-gray-600">Deactivate your account</p>
          </div>
          <button 
            onClick={() => setShowDeactivateModal(true)}
            className="text-sm text-red-600 hover:underline"
          >
            Deactivate
          </button>
        </div>
      </div>

      {/* Modals */}
      <UpdatePasswordModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onSave={handlePasswordUpdate}
      />
      
      <AddAuthenticationModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSave={handleAddAuthentication}
      />
      
      <DeactivateAccountModal
        isOpen={showDeactivateModal}
        onClose={() => setShowDeactivateModal(false)}
        onConfirm={handleDeactivateAccount}
      />
    </div>
  );
}
