'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { X, Menu, LogOut, ChevronDown, Calendar, Heart, MessageCircle, User, HelpCircle } from 'lucide-react';
import RegisterMenu from './auth/RegisterMenu.jsx';
import LogoutModal from './modal/LogoutModal';
import LoadingIndicator from './LoadingIndicator';
import { getUserProfile } from '@/redux/slices/profileSlice';
import { resetLoginState } from '@/redux/slices/loginSlice';
import { persistor } from '@/redux/store';

// User Dropdown Component
const UserDropdown = ({ user, isOpen, onToggle, onNavigate, onLogout }) => {
  const guestMenuItems = [
    { href: '/guest/bookings', label: 'My Bookings', icon: Calendar },
    { href: '/guest/wishlist', label: 'Wishlist', icon: Heart },
    { href: '/guest/messages', label: 'Messages', icon: MessageCircle },
    { href: '/guest/account', label: 'Account', icon: User },
    { href: '/help', label: 'Help centre', icon: HelpCircle },
  ];

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-shadow"
      >
        <span className="text-sm font-semibold text-[#DC4731]">
          {user.firstName || 'User'} {user.lastName || ''}
        </span>
        <ChevronDown size={16} className="text-[#DC4731]" />
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 z-50 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100">
          <div className="py-2">
            {guestMenuItems.map(({ href, label, icon: Icon }) => (
              <button
                key={href}
                onClick={() => onNavigate(href)}
                className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
              >
                <Icon size={16} />
                <span>{label}</span>
              </button>
            ))}
            <hr className="my-1 border-gray-100" />
            <button
              onClick={onLogout}
              className="flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors w-full text-left"
            >
              <LogOut size={16} />
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state) => state.profile);
  const { user: loginUser } = useSelector((state) => state.login);
  
  // Simplified state management
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [registerMenuOpen, setRegisterMenuOpen] = useState(false);
  const [userType, setUserType] = useState('user');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  
  const menuRef = useRef(null);

  const handleNavigate = (path) => {
    setUserMenuOpen(false);
    setMobileMenuOpen(false);
    window.location.href = path;
  };

  // Check login status and fetch user profile
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLoggedIn(true);
      dispatch(getUserProfile());
    } else {
      setIsLoggedIn(false);
      // Redirect to landing page if no token found
      if (pathname.startsWith('/guest') || pathname.startsWith('/host')) {
        window.location.href = '/';
      }
    }
  }, [dispatch, loginUser, pathname]);

  // Handle host redirection
  useEffect(() => {
    if (isLoggedIn && user && user.userType === 'host' && !pathname.startsWith('/host')) {
      router.push('/host');
    }
  }, [isLoggedIn, user, router]);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setUserMenuOpen(false);
    setRegisterMenuOpen(false);
  }, [pathname]);

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
        setRegisterMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAuthClick = (type) => {
    setRegisterMenuOpen(false);
    setUserType(type);
    // Handle auth modal opening logic here
  };

  const handleLogout = () => {
    setIsLoggingOut(true);
    setUserMenuOpen(false);
    setTimeout(() => {
      localStorage.clear();
      dispatch(resetLoginState());
      persistor.purge();
      setIsLoggedIn(false);
      setLogoutModalOpen(false);
      setIsLoggingOut(false);
    }, 800);
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

        {/* User Actions */}
        <div className="flex items-center gap-4" ref={menuRef}>
          {isLoggedIn && user && !loading ? (
            // Signed in user
            user.userType === 'user' ? (
              <div className="hidden md:block">
                <UserDropdown
                  user={user}
                  isOpen={userMenuOpen}
                  onToggle={() => setUserMenuOpen(!userMenuOpen)}
                  onNavigate={handleNavigate}
                  onLogout={() => setLogoutModalOpen(true)}
                />
              </div>
            ) : (
              // Host user
              <div className="hidden md:flex items-center gap-2 bg-white px-5 py-2 rounded-full shadow-lg hover:shadow-md transition-shadow">
                <Link href="/host" className="flex items-center gap-2">
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
            )
          ) : (
            // Not signed in user - Desktop
            <button
              onClick={() => setRegisterMenuOpen(!registerMenuOpen)}
              className="hidden md:flex items-center gap-2 bg-white text-[#DC4731] px-5 py-2 rounded-full shadow-lg hover:shadow-md transition-shadow"
            >
              <img src="/images/logo/li_user.png" alt="User" className="w-5 h-5" />
              <span>Register</span>
            </button>
          )}

          {/* Mobile Actions */}
          <div className="md:hidden flex items-center gap-4">
            {isLoggedIn && user && !loading ? (
              // Signed in user - Mobile
              <UserDropdown
                user={user}
                isOpen={userMenuOpen}
                onToggle={() => setUserMenuOpen(!userMenuOpen)}
                onNavigate={handleNavigate}
                onLogout={() => setLogoutModalOpen(true)}
              />
            ) : (
              // Not signed in user - Mobile
              <>
                <button
                  onClick={() => setRegisterMenuOpen(!registerMenuOpen)}
                  className="flex items-center justify-center bg-white text-[#DC4731] p-2 rounded-full shadow-md hover:shadow-lg transition-shadow"
                  aria-label="User menu"
                >
                  <img src="/images/logo/li_user.png" alt="User" className="w-6 h-6" />
                </button>
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
                  aria-label="Main menu"
                >
                  {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </>
            )}
          </div>

          {/* Register Dropdown */}
          {registerMenuOpen && !isLoggedIn && (
            <div className="absolute top-full right-0 z-50 mt-2">
              <RegisterMenu
                onGuestClick={() => handleAuthClick('user')}
                onBecomeHostClick={() => handleAuthClick('host')}
              />
            </div>
          )}
        </div>

        {/* Mobile Menu - Only for non-logged-in users */}
        {mobileMenuOpen && !isLoggedIn && (
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