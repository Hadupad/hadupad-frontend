import SettingsTabs from "./SettingsTab"
export default function Settings() {
  return (
    <div className="p-6">
      {/* Add your other content here */}
      <h2 className="text-lg font-semibold mb-4">Settings</h2>
      <p className="text-gray-500">
        These apply to all nights, unless you customize them by date.
      </p>
    <SettingsTabs />
    </div>
  );
}
