import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';

export default function ChatWindow({ selectedConversation }) {
  if (!selectedConversation) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-gray-50">
        <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
          <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <p className="text-gray-500 text-lg">You currently have no channels</p>
      </div>
    );
  }

  const messages = [
    {
      id: 1,
      text: "Hi, did you get the deposit?",
      time: "2:14 PM",
      sender: selectedConversation,
      mine: false
    },
    {
      id: 2,
      text: "Okay, I need access to the rooms",
      time: "2:16 PM",
      sender: selectedConversation,
      mine: false
    },
    {
      id: 3,
      text: "Keys aren't available at the moment",
      time: "2:18 PM",
      sender: selectedConversation,
      mine: false
    },
    {
      id: 4,
      text: "Hey, I did, thanks",
      time: "2:16 PM",
      mine: true
    },
    {
      id: 5,
      text: "Oh no, they're on the shelf in the living room beside the plant",
      time: "2:20 PM",
      mine: true
    },
    {
      id: 6,
      text: "Check this",
      time: "2:22 PM",
      sender: selectedConversation,
      mine: false,
      media: { 
        caption: "Aerial photograph from the bathroom", 
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=200&fit=crop" 
      }
    }
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      <ChatHeader conversation={selectedConversation} />
      <div className="flex-1 overflow-y-auto p-4 bg-white min-h-0">
        <div className="space-y-3">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              text={message.text}
              time={message.time}
              mine={message.mine}
              sender={message.sender}
              media={message.media}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
