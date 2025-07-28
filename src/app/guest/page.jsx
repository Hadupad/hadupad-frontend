import Sidebar from "../../../components/guest/Sidebar";
import Navbar from "../../../components/guest/Navbar";
import OverviewCards from "../../../components/guest/OverviewCards";
import BookingControls from "../../../components/guest/BookingControls";
import RecentPayments from "../../../components/guest/RecentPayments";
import BookingCalendar from "../../../components/guest/BookingCalendar";


export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Sidebar stays fixed */}
      <Sidebar />

      {/* Main content pushes right by sidebar width */}
      <main className="ml-56 p-6 pt-30  space-y-6">
        <h1 className="text-2xl font-semibold mb-1">Welcome, Faith!</h1>
        <p className="text-gray-500 mt-0">
          Guests can reserve your place 24 hours after you publish—here’s how to
          prepare.
        </p>

        <OverviewCards />

        <div className="grid md:grid-cols-3 gap-6">
          {/* Left Side: 1/3 width */}
          <div className="col-span-1 space-y-6">
            <BookingControls />
            <RecentPayments />
          </div>

          {/* Right Side: 2/3 width */}
          <div className="col-span-2">
            <BookingCalendar />
          </div>
        </div>

      </main>
    </div>
  );
}