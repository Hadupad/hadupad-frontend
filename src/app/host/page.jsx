'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import Sidebar from '../../../components/host/Sidebar';
import Navbar from '../../../components/host/Navbar';
import OverviewCards from '../../../components/host/OverviewCards';
import BookingControls from '../../../components/host/BookingControls';
import RecentPayments from '../../../components/host/RecentPayments';
import BookingCalendar from '../../../components/host/BookingCalendar';
import { getUserProfile } from '@/redux/slices/profileSlice';
import LoadingIndicator from '../../../components/LoadingIndicator';

export default function DashboardPage() {
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

  // Render only for verified host
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar />
      <main className="ml-56 p-6 pt-30 space-y-6">
        <h1 className="text-2xl font-semibold mb-1">
          Welcome, {user?.firstName || 'User'}!
        </h1>
        <p className="text-gray-500 mt-0">
          Guests can reserve your place 24 hours after you publish—here’s how to prepare.
        </p>
        <OverviewCards />
        <div className="grid md:grid-cols-3 gap-6">
          <div className="col-span-1 space-y-6">
            <BookingControls />
            <RecentPayments />
          </div>
          <div className="col-span-2">
            <BookingCalendar />
          </div>
        </div>
      </main>
    </div>
  );
}