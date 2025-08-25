'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import MobileNavbar from './MobileNavbar';
import { getUserProfile } from '@/redux/slices/profileSlice';
import LoadingIndicator from '../LoadingIndicator';

export default function HostLayout({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, loading, error } = useSelector((state) => state.profile);
  const [hasToken, setHasToken] = useState(null);

  // Check for accessToken immediately
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      router.push('/');
    } else {
      setHasToken(true);
    }
  }, [router]);

  // Fetch user profile
  useEffect(() => {
    if (hasToken) {
      dispatch(getUserProfile());
    }
  }, [dispatch, hasToken]);

  // Redirect if user is not a host
  useEffect(() => {
    if (!loading && !error && user && user.userType !== 'host') {
      router.push('/');
    }
  }, [user, loading, error, router]);

  // Prevent rendering until token and host status are verified
  if (hasToken === null || !hasToken || loading) return <LoadingIndicator />;
  if (error) return <div>Error: {error}</div>;
  if (!user || user.userType !== 'host') return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <Navbar />
        <Sidebar />
        <main className="ml-56 p-6 pt-30">
          {children}
        </main>
      </div>
      
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <MobileNavbar />
        <main className="p-4 pt-20">
          {children}
        </main>
      </div>
    </div>
  );
}
