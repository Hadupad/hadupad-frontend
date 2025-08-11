import ChatHeader from './ChatHeader';
import MessageBubble from './MessageBubble';

export default function ChatWindow() {
  return (
    <div className="flex flex-col flex-1">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <MessageBubble text="Hi, did you get the deposit?" time="2:14 PM" />
        <MessageBubble text="Okay, I need access to the rooms" time="2:16 PM" />
        <MessageBubble text="Keys aren't available at the moment" time="2:18 PM" />
        <MessageBubble mine text="Hey, I did, thanks" time="2:16 PM" />
        <MessageBubble mine text="Oh no, they're on the shelf in the living room beside the plant" time="2:20 PM" />
        <MessageBubble
          text="Check this"
          time="2:22 PM"
          media={{ caption: "Aerial photograph from the bathroom", image: "/plant.jpg" }}
        />
      </div>
    </div>
  );
}
