// // "use client";

// // import { useState } from "react";
// // import GuestSignupModal from "./GuestSignupModal"; // make sure this path is correct
// // import Link from "next/link";

// // export default function RegisterMenu({ className = "" }) {
// //   const [showGuestModal, setShowGuestModal] = useState(false);

// //   return (
// //     <div className={`absolute right-0 top-14 bg-white shadow-lg rounded-xl p-4 z-50 flex flex-col gap-4 ${className}`}>
// //       {/* Button to open Guest Signup Modal */}
// //       <button
// //         onClick={() => setShowGuestModal(true)}
// //         className="cursor-pointer text-left hover:text-[#DC4731]"
// //       >
// //         Register as a guest
// //       </button>

// //       <Link href="/login" className="hover:text-[#DC4731]">
// //         Log in
// //       </Link>

// //       <div className="border-t border-gray-300 my-2"></div>

// //       <Link href="/become-host" className="hover:text-[#DC4731]">
// //         Become a host
// //       </Link>

// //       <Link href="/list-property" className="hover:text-[#DC4731]">
// //         List your property
// //       </Link>

// //       {/* Guest Signup Modal */}
// //       {showGuestModal && (
// //         <GuestSignupModal onClose={() => setShowGuestModal(false)} />
// //       )}
// //     </div>
// //   );
// // }


// "use client";

// import Link from "next/link";

// export default function RegisterMenu({ className = "", onGuestRegister }) {
//   return (
//     <div className={`absolute right-0 top-14 bg-white shadow-lg rounded-xl p-4 z-50 flex flex-col gap-4 ${className}`}>
      
//       {/* Guest registration */}
//       <button
//         onClick={() => {
//           console.log("Clicked Register as a Guest");
//           if (onGuestRegister) onGuestRegister();
//         }}
//         className="cursor-pointer text-left hover:text-[#DC4731]"
//       >
//         Register as a guest
//       </button>

//       <Link href="/login" className="hover:text-[#DC4731]">
//         Log in
//       </Link>

//       <div className="border-t border-gray-300 my-2"></div>

//       {/* ⛳️ Test: Add click event to this button */}
//       <button
//         onClick={() => {
//           alert("Become a host clicked!");
//           console.log("Become a host clicked");
//         }}
//         className="text-left hover:text-[#DC4731]"
//       >
//         Become a host
//       </button>

//       <Link href="/list-property" className="hover:text-[#DC4731]">
//         List your property
//       </Link>
//     </div>
//   );
// }


"use client";

import Link from "next/link";

export default function RegisterMenu({ className = "", onGuestClick }) {
  return (
    <div className={`absolute right-0 top-14 bg-white shadow-lg rounded-xl p-4 z-50 flex flex-col gap-4 ${className}`}>
      <button
        onClick={onGuestClick}
        className="cursor-pointer text-left hover:text-[#DC4731]"
      >
        Register as a guest
      </button>
      <Link href="/login" className="hover:text-[#DC4731]">
        Log in
      </Link>
      <div className="border-t border-gray-300 my-2"></div>
      <Link href="/become-host" className="hover:text-[#DC4731]">
        Become a host
      </Link>
      <Link href="/list-property" className="hover:text-[#DC4731]">
        List your property
      </Link>
    </div>
  );
}