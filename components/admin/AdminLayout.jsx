'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import AdminNavbar from './AdminNavbar';
import AdminSidebar from './AdminSidebar';
import AdminMobileNavbar from './AdminMobileNavbar';
import { getUserProfile } from '@/redux/slices/profileSlice';
import LoadingIndicator from '../LoadingIndicator';

export default function AdminLayout({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, loading, error } = useSelector((state) => state.profile);
  const [hasToken, setHasToken] = useState(null);

  // Check for accessToken immediately
  // useEffect(() => {
  //   const token = localStorage.getItem('accessToken');
  //   if (!token) {
  //     router.push('/');
  //   } else {
  //     setHasToken(true);
  //   }
  // }, [router]);

  // // Fetch user profile
  // useEffect(() => {
  //   if (hasToken) {
  //     dispatch(getUserProfile());
  //   }
  // }, [dispatch, hasToken]);

  // Redirect if user is not an admin
  // useEffect(() => {
  //   if (!loading && !error && user && user.userType !== 'admin') {
  //     router.push('/');
  //   }
  // }, [user, loading, error, router]);

  // Prevent rendering until token and admin status are verified
  // if (hasToken === null || !hasToken || loading) return <LoadingIndicator />;
  // if (error) return <div>Error: {error}</div>;
  // if (!user || user.userType !== 'admin') return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      {/* Desktop Layout */}
      <div className="hidden lg:flex pt-[72px] h-[calc(100vh-72px)]">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
      
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <AdminMobileNavbar />
        <main className="pt-20">
          {children}
        </main>
      </div>
    </div>
  );
}
