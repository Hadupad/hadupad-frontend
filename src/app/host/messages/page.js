// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import Sidebar from "../../../../components/host/Sidebar";
// import Navbar from "../../../../components/host/Navbar";
// import SubHeader from "../../../../components/host/caution-fee/SubHeader";
// import MessageSidebar from "../../../../components/host/messages/Sidebar";
// import ChatWindow from "../../../../components/host/messages/ChatWindow";
// import MessageInput from "../../../../components/host/messages/MessageInput";

// export default function CautionFee() {

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <Sidebar />

//       <main className="ml-56 p-6 pt-30 space-y-6">
//         <SubHeader />
//         <MessageSidebar />
//         <div className="flex flex-col flex-1">
//           <ChatWindow />
//           <MessageInput />
//         </div>
//       </main>
//     </div>
//   );
// }

// "use client";

// import Sidebar from "../../../../components/host/Sidebar"; // Main layout sidebar
// import Navbar from "../../../../components/host/Navbar";
// import SubHeader from "../../../../components/host/caution-fee/SubHeader";

// import MessageSidebar from "../../../../components/host/messages/MessageSidebar"; // <-- Chat sidebar
// import ChatWindow from "../../../../components/host/messages/ChatWindow";
// import MessageInput from "../../../../components/host/messages/MessageInput";

// export default function CautionFee() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Navbar />
//       <Sidebar />

//       <main className="ml-56 p-6 pt-30 space-y-6">
      
//         <div className="flex h-[80vh] bg-black text-white rounded-lg overflow-hidden shadow-lg">
//           {/* Chat Sidebar (contacts) */}
//           <MessageSidebar />

//           {/* Chat area */}
//           <div className="flex flex-col flex-1">
//             <ChatWindow />
//             <MessageInput />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";

import Sidebar from "../../../../components/host/Sidebar"; // Main layout sidebar
import Navbar from "../../../../components/host/Navbar";
import SubHeader from "../../../../components/host/caution-fee/SubHeader";

import MessageSidebar from "../../../../components/host/messages/MessageSidebar"; // <-- Chat sidebar
import ChatWindow from "../../../../components/host/messages/ChatWindow";
import MessageInput from "../../../../components/host/messages/MessageInput";

export default function CautionFee() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Sidebar />

      <main className="ml-56 p-6 space-y-6">
        <SubHeader />

        <div className="flex h-[80vh] border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <MessageSidebar />
          <div className="flex flex-col flex-1">
            <ChatWindow />
            <MessageInput />
          </div>
        </div>
      </main>
    </div>
  );
}
