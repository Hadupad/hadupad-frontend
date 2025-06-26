import Sidebar from "../../../components/host/Sidebar";
import Navbar from "../../../components/host/Navbar";
import OverviewCards from "../../../components/host/OverviewCards";
import BookingControls from "../../../components/host/BookingControls";
import RecentPayments from "../../../components/host/RecentPayments";
import BookingCalendar from "../../../components/host/BookingCalendar";

// export default function DashboardPage() {
//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Top navbar full width */}
//       <Navbar />

//       {/* Sidebar below navbar, then main content */}
//       <div className="flex flex-col md:flex-row">
//         {/* Sidebar vertically stacked */}
//         <Sidebar className="w-full md:w-60" />

//         {/* Main content beside sidebar on desktop, below on mobile */}
//         <main className="flex-1 p-6 space-y-6">
//           <h1 className="text-2xl font-semibold">Welcome, Faith!</h1>
//           <p className="text-gray-500">Guests can reserve your place 24 hours after you publish—here’s how to prepare.</p>
//           <OverviewCards />
//           <BookingControls />
//           <div className="grid md:grid-cols-2 gap-6">
//             <RecentPayments />
//             <BookingCalendar />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// }

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
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Side: stacked */}
          <div className="space-y-6">
            <BookingControls />
            <RecentPayments />
          </div>

          {/* Right Side: timeline */}
          <BookingCalendar />
        </div>
      </main>
    </div>
  );
}
