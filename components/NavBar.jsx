'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { X, Menu, LogOut } from 'lucide-react';
import RegisterMenu from './auth/RegisterMenu';
import AuthModalContainer from './auth/AuthModalContainer';
import LogoutModal from './LogoutModal';
import LoadingIndicator from './LoadingIndicator';
import { getUserProfile } from '@/redux/slices/profileSlice';
import { resetLoginState } from '@/redux/slices/loginSlice';
import { persistor } from '@/redux/store';

export default function NavBar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.profile);
  const { user: loginUser } = useSelector((state) => state.login);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [registerMenuOpen, setRegisterMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [userType, setUserType] = useState('user');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const registerMenuRef = useRef(null);

  // Check login status and fetch user profile
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
    if (token) {
      dispatch(getUserProfile());
    }
  }, [dispatch, loginUser]);

  // Close menus on pathname change
  useEffect(() => {
    setMobileMenuOpen(false);
    setRegisterMenuOpen(false);
  }, [pathname]);

  // Handle click outside for register menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        registerMenuRef.current &&
        !registerMenuRef.current.contains(event.target)
      ) {
        setRegisterMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGuestClick = () => {
    setRegisterMenuOpen(false);
    setUserType('user');
    setAuthModalOpen(true);
  };

  const handleBecomeHostClick = () => {
    setRegisterMenuOpen(false);
    setUserType('host');
    setAuthModalOpen(true);
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      localStorage.clear();
      dispatch(resetLoginState());
      persistor.purge(); // Clear persist:root from localStorage
      setIsLoggedIn(false);
      setLogoutModalOpen(false);
      setIsLoggingOut(false);
    }, 800); // Match LoadingIndicator animation duration
  };

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/properties', label: 'Properties' },
    { href: '/about-us', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
    { href: '/faqs', label: 'FAQs' },
  ];

  return (
    <header className="bg-white fixed w-full z-50 shadow-md shadow-black/20">
      <nav className="w-full mx-auto px-[5%] flex items-center justify-between h-[80px] z-50">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <img className="w-10 h-10" src="/images/logo/icon.png" alt="Logo" />
          <span className="ml-2 font-bold text-xl hidden sm:block">
            Hadupad
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={
                pathname === href
                  ? 'text-[#DC4731] font-semibold'
                  : 'text-gray-700 hover:text-[#DC4731] transition-colors'
              }
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Register or User Profile */}
        <div className="relative" ref={registerMenuRef}>
          {isLoggedIn && user && !loading ? (
            // Logged-in user profile
            <div className="hidden md:flex items-center gap-2 bg-white px-5 py-2 rounded-full shadow-lg hover:shadow-md transition-shadow">
              <Link href="/host" className="flex items-center gap-2">
                <img
                  src={user?.profilePicture || '/images/logo/li_user.png'}
                  alt=""
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span className="text-sm font-semibold">
                  {user.firstName || 'User'} {user.lastName || ''}
                </span>
              </Link>
              <button
                onClick={() => setLogoutModalOpen(true)}
                className="ml-2 text-gray-700 hover:text-[#DC4731] transition-colors"
                aria-label="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            // Register button for non-logged-in users
            <button
              onClick={() => setRegisterMenuOpen(!registerMenuOpen)}
              className="hidden md:flex items-center gap-2 bg-white text-[#DC4731] px-5 py-2 rounded-full shadow-lg hover:shadow-md transition-shadow"
            >
              <img
                src="/images/logo/li_user.png"
                alt="User"
                className="w-5 h-5"
              />
              <span>Register</span>
            </button>
          )}

          {/* Mobile Buttons */}
          <div className="md:hidden flex items-center gap-4">
            {isLoggedIn && user && !loading ? (
              <div className="flex items-center gap-2 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-shadow">
                <Link
                  href="/host"
                  className="flex items-center justify-center"
                  aria-label="User profile"
                >
                  <img
                    src={user?.profilePicture || '/images/logo/li_user.png'}
                    alt=""
                    className="w-6 h-6 rounded-full object-cover"
                  />
                </Link>
                <button
                  onClick={() => setLogoutModalOpen(true)}
                  className="text-gray-700 hover:text-[#DC4731] transition-colors"
                  aria-label="Logout"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setRegisterMenuOpen(!registerMenuOpen)}
                className="flex items-center justify-center bg-white text-[#DC4731] p-2 rounded-full shadow-md hover:shadow-lg transition-shadow"
                aria-label="User menu"
              >
                <img
                  src="/images/logo/li_user.png"
                  alt="User"
                  className="w-6 h-6"
                />
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
              aria-label="Main menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Register Dropdown */}
          {registerMenuOpen && !isLoggedIn && (
            <div className="absolute top-full right-0 z-50 mt-2">
              <RegisterMenu
                onGuestClick={handleGuestClick}
                onBecomeHostClick={handleBecomeHostClick}
              />
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center gap-8 px-6 pt-20 pb-10 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute top-5 right-5 text-[#DC4731] p-2"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>

            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className={
                  pathname === href
                    ? 'text-[#DC4731] text-xl font-semibold'
                    : 'text-gray-700 text-xl hover:text-[#DC4731] transition-colors'
                }
              >
                {label}
              </Link>
            ))}
          </div>
        )}

        {/* Auth Modal */}
        <AuthModalContainer
          isOpen={authModalOpen}
          onClose={() => setAuthModalOpen(false)}
          userType={userType}
        />

        {/* Logout Confirmation Modal */}
        <LogoutModal
          isOpen={logoutModalOpen}
          onClose={() => setLogoutModalOpen(false)}
          onConfirm={handleLogout}
        />

        {/* Loading Indicator */}
        {isLoggingOut && <LoadingIndicator />}
      </nav>
    </header>
  );
}