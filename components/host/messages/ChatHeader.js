export default function ChatHeader({ conversation }) {
  if (!conversation) {
    return null;
  }

  return (
    <div className="p-4 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-3">
        <img 
          src={conversation.avatar} 
          alt={conversation.name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <p className="font-semibold text-gray-900">{conversation.name}</p>
          <span className="text-sm text-green-600">Online for 10 mins</span>
        </div>
      </div>
    </div>
  );
}
