import BankForm from "./BankForm";
import CardForm from "./CardForm";

export default function DynamicDialog({ open, onClose, type, user }) {
  if (!open) return null;

  const getTitle = () => {
    switch (type) {
      case "name":
        return "Edit Legal Name";
      case "email":
        return "Edit Email Address";
      case "phone":
        return "Edit Phone Number";
      case "govtId":
        return "Add Government ID";
      case "address":
        return "Edit Address";
      case "emergency":
        return "Add Emergency Contact";
      case "password":
        return "Update Password";
      case "2fa":
        return "Enable Two-Factor Authentication";
      case "deactivate":
        return "Deactivate Account";
      case "card":
        return "Add card details";
      case "bank":
        return "Add account details";
      default:
        return "Edit Info";
    }
  };

  const renderContent = () => {
    switch (type) {
      case "name":
        return (
          <input
            type="text"
            defaultValue={`${user.firstName} ${user.lastName}`}
            className="border p-2 w-full"
          />
        );
      case "email":
        return (
          <input
            type="email"
            defaultValue={user.email}
            className="border p-2 w-full"
          />
        );
      case "phone":
        return (
          <input
            type="tel"
            defaultValue={user.phoneNumber}
            className="border p-2 w-full"
          />
        );
      case "password":
        return (
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Current password"
              className="border p-2 w-full"
            />
            <input
              type="password"
              placeholder="New password"
              className="border p-2 w-full"
            />
          </div>
        );
      case "2fa":
        return (
          <p className="text-sm text-gray-700">
            To enable 2FA, scan a QR code with your authenticator app or get a
            code via email (Coming soon...).
          </p>
        );
      case "deactivate":
        return (
          <p className="text-sm text-red-600">
            Are you sure you want to deactivate your account? This action cannot
            be undone.
          </p>
        );
      case "bank":
        return <BankForm />;
      case "card":
        return <CardForm />;
      default:
        return <p>Coming soon...</p>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg space-y-4">
        <h2 className="text-xl font-semibold">{getTitle()}</h2>
        {renderContent()}
        <div className="flex justify-end gap-2 pt-4">
          <button
            className="text-sm px-4 py-2 border rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button className="text-sm px-4 py-2 bg-[#B94D3A] text-white rounded">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
