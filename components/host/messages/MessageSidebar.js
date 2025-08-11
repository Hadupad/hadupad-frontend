export default function MessageSidebar() {
  const contacts = [
    { name: 'Favour Oyeniyi', message: 'Aerial photography from the bathro', time: '9:41 AM' },
    { name: 'Chioma Ridderland', message: "Hey, what's good?", time: '9:16 AM', unread: true, unreadCount: 80 },
    // more...
  ];

  return (
    <aside className="w-[320px] flex-shrink-0 p-4 overflow-y-auto border-r border-gray-200">
      <input
        className="w-full rounded-full px-4 py-2 border border-gray-300 placeholder:text-gray-400"
        placeholder="Search"
      />

      <div className="mt-4 space-y-3">
        {contacts.map((c, i) => (
          <div key={i} className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-md cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gray-300" />
            <div className="flex-1">
              <div className="flex justify-between">
                <p className="font-semibold text-black">{c.name}</p>
                <span className="text-sm text-gray-500">{c.time}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{c.message}</p>
            </div>
            {c.unread && (
              <span className="text-xs bg-red-500 text-white px-2 rounded-full">{c.unreadCount}</span>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
