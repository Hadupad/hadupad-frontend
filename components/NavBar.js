
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import RegisterMenu from "./auth/RegisterMenu";
import GuestSignupModal from "./auth/GuestSignupModal";

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [registerMenuOpen, setRegisterMenuOpen] = useState(false);
  const [guestModalOpen, setGuestModalOpen] = useState(false);
  const pathname = usePathname();
  const registerMenuRef = useRef(null);

  // Close menus when navigating
  useEffect(() => {
    setMobileMenuOpen(false);
    setRegisterMenuOpen(false);
  }, [pathname]);

  // Close register menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (registerMenuRef.current && !registerMenuRef.current.contains(event.target)) {
        setRegisterMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGuestClick = () => {
    setRegisterMenuOpen(false);
    setGuestModalOpen(true);
  };

  return (
    <header className="bg-white fixed w-full z-50">
      <nav className="shadow-lg shadow-black/50 w-full mx-auto px-[5%] flex items-center justify-between h-[80px]">
        {/* Logo */}
        <Link href="/">
          <img className="w-10 h-10" src="/images/logo/icon.png" alt="Logo" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className={pathname === "/" ? "text-[#DC4731] font-semibold" : "hover:text-[#DC4731]"}>
            Home
          </Link>
          <Link href="/properties" className={pathname === "/properties" ? "text-[#DC4731] font-semibold" : "hover:text-[#DC4731]"}>
            Properties
          </Link>
          <Link href="/about-us" className={pathname === "/about-us" ? "text-[#DC4731] font-semibold" : "hover:text-[#DC4731]"}>
            About Us
          </Link>
          <Link href="/contact" className={pathname === "/contact" ? "text-[#DC4731] font-semibold" : "hover:text-[#DC4731]"}>
            Contact
          </Link>
          <Link href="/faqs" className={pathname === "/faqs" ? "text-[#DC4731] font-semibold" : "hover:text-[#DC4731]"}>
            FAQs
          </Link>
        </div>

        {/* Register Button */}
        <div className="relative" ref={registerMenuRef}>
          <button
            onClick={() => setRegisterMenuOpen(!registerMenuOpen)}
            className="flex items-center gap-2 bg-white text-[#DC4731] px-5 py-2 rounded-full shadow-lg"
          >
            <img src="/images/logo/li_user.png" alt="User" className="w-5 h-5" />
            <span className="hidden md:inline">Register</span>
          </button>

          {registerMenuOpen && (
            <RegisterMenu onGuestClick={handleGuestClick} className="w-[220px]" />
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full bg-white shadow-md"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6 text-[#DC4731]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-[#DC4731]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg p-4 z-40">
            <div className="flex flex-col gap-4">
              <Link href="/" className={pathname === "/" ? "text-[#DC4731] font-semibold" : "hover:text-[#DC4731]"}>
                Home
              </Link>
              <Link href="/properties" className={pathname === "/properties" ? "text-[#DC4731] font-semibold" : "hover:text-[#DC4731]"}>
                Properties
              </Link>
              <Link href="/about-us" className={pathname === "/about-us" ? "text-[#DC4731] font-semibold" : "hover:text-[#DC4731]"}>
                About Us
              </Link>
              <Link href="/contact" className={pathname === "/contact" ? "text-[#DC4731] font-semibold" : "hover:text-[#DC4731]"}>
                Contact
              </Link>
              <Link href="/faqs" className={pathname === "/faqs" ? "text-[#DC4731] font-semibold" : "hover:text-[#DC4731]"}>
                FAQs
              </Link>
            </div>
          </div>
        )}

        {/* Guest Signup Modal */}
        {guestModalOpen && <GuestSignupModal onClose={() => setGuestModalOpen(false)} />}
      </nav>
    </header>
  );
}

// "use client";

// import { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import RegisterMenu from "./auth/RegisterMenu"; // Import your new RegisterMenu component

// export default function NavBar() {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isRegisterMenuOpen, setIsRegisterMenuOpen] = useState(false);
//   const pathname = usePathname();

//   const registerMenuRef = useRef(null);

//   const isFAQPage = pathname === "/faqs";
//   const isPropertiesPage = pathname === "/properties";

//   useEffect(() => {
//     function handleClickOutside(event) {
//       if (
//         registerMenuRef.current &&
        // !registerMenuRef.current.contains(event.target)
//       ) {
//         setIsRegisterMenuOpen(false);
//       }
//     }

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     // Close the menu when navigating to a new page
//     setIsOpen(false);
//   }, [pathname]); // Close the menu on pathname change

//   return (
//     <header className="bg-white fixed w-full z-50">
//       <nav className="shadow-lg shadow-black/50 w-full mx-auto px-[5%] flex items-center justify-between h-[80px] relative">
//         {/* Logo */}
//         <div>
//           <img
//             className="cursor-pointer w-10 h-10"
//             src="/images/logo/icon.png"
//             alt="HADUPAD LOGO"
//           />
//         </div>

//         {/* Navigation links */}
//         {/* <div
//   className={`absolute md:static left-0 right-0 top-[80px] md:top-0 bg-white md:bg-transparent transition-all duration-500 ease-in-out ${
//     isOpen ? "h-screen overflow-auto" : "h-0 overflow-hidden"
//   } md:flex flex-col md:flex-row items-center justify-center gap-8 md:gap-[4vw] z-40`}
// > */}
{/* <div
  className={`absolute md:static left-0 right-0 top-[80px] md:top-0 bg-white md:bg-transparent transition-all duration-500 ease-in-out
    ${isOpen ? "h-screen overflow-auto" : "h-0 overflow-hidden"}
    md:h-auto md:overflow-visible md:flex flex-col md:flex-row items-center justify-center gap-8 md:gap-[4vw] z-40`}
> */}


//           <ul className="flex flex-col md:flex-row items-center gap-8 md:gap-[4vw] font-medium">
//             <li>
//               <Link
//                 href="/"
//                 className={`${
//                   pathname === "/" ? "text-[#DC4731] font-semibold" : "text-black hover:text-[#DC4731]"
//                 }`}
//               >
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href="/properties"
//                 className={`${
//                   pathname === "/properties" ? "text-[#DC4731] font-semibold" : "text-black hover:text-[#DC4731]"
//                 }`}
//               >
//                 Properties
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href="/about-us"
//                 className={`${
//                   pathname === "/about-us" ? "text-[#DC4731] font-semibold" : "text-black hover:text-[#DC4731]"
//                 }`}
//               >
//                 About Us
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href="/contact"
//                 className={`${
//                   pathname === "/contact" ? "text-[#DC4731] font-semibold" : "text-black hover:text-[#DC4731]"
//                 }`}
//               >
//                 Contact
//               </Link>
//             </li>
//             <li>
//               <Link
//                 href="/faqs"
//                 className={`${
//                   pathname === "/faqs" ? "text-[#DC4731] font-semibold" : "text-black hover:text-[#DC4731]"
//                 }`}
//               >
//                 FAQs
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Desktop Register Button */}
//         <div className="hidden md:flex relative" ref={registerMenuRef}>
//           <button
//             onClick={() => setIsRegisterMenuOpen(!isRegisterMenuOpen)}
//             className="cursor-pointer bg-white text-[#DC4731] px-5 py-2 rounded-full shadow-lg flex items-center gap-[10px]"
//           >
//             <img
//               src="/images/logo/li_user.png"
//               alt="User Icon"
//               className="w-5 h-5"
//             />
//             <span className="font-normal">Register</span>
//           </button>

//           {/* Dropdown menu */}
//           {isRegisterMenuOpen && (
//             <RegisterMenu className="w-[220px]" />
//           )}
//         </div>

//         {/* Mobile Register Button + Hamburger */}
//         <div className="flex md:hidden items-center gap-3 relative" ref={registerMenuRef}>
//           {/* Small register button (only icon) */}
//           <button
//             onClick={() => setIsRegisterMenuOpen(!isRegisterMenuOpen)}
//             className="px-5 py-2 rounded-2xl bg-white shadow-md"
//           >
//             <img
//               src="/images/logo/li_user.png"
//               alt="User Icon"
//               className="w-5 h-5"
//             />
//           </button>

//           {/* Mobile Dropdown menu */}
//           {isRegisterMenuOpen && (
//             <RegisterMenu className="w-[220px]" />
//           )}

//           {/* Hamburger Button */}
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="px-4 py-3 rounded-full bg-white shadow-md flex items-center justify-center"
//           >
//             <svg
//               className="w-5 h-5 text-[#DC4731]"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               {isOpen ? (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               ) : (
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               )}
//             </svg>
//           </button>
//         </div>
//       </nav>
//     </header>
//   );
// }

