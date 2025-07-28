export default function MessageInput() {
  return (
    <div className="p-4 border-t border-gray-200 flex items-center gap-2">
      <button className="text-xl">➕</button>
      <input
        type="text"
        placeholder="Type your message"
        className="flex-1 border border-gray-300 px-4 py-2 rounded-full outline-none"
      />
      <button className="text-xl">😊</button>
      <button className="bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center">
        <span className="text-sm">➤</span>
      </button>
    </div>
  );
}
