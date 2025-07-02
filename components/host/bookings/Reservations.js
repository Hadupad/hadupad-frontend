// 'use client';

// import { useState } from 'react';
// import { FaSortUp, FaSortDown } from 'react-icons/fa';
// import useReservations from '../../../hooks/useReservations';

// const tabs = [
//   { label: 'All Bookings', value: 'all' },
//   { label: 'Upcoming', value: 'upcoming' },
//   { label: 'Completed', value: 'completed' },
//   { label: 'Cancelled', value: 'cancelled' },
// ];

// export default function BookingsPage() {
//   const { reservations, loading } = useReservations();
//   const [activeTab, setActiveTab] = useState('upcoming');
//   const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

//   const filteredReservations =
//     activeTab === 'all'
//       ? reservations
//       : reservations.filter((res) => res.status === activeTab);

//   const handleSort = (key) => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   const sortedReservations = [...filteredReservations].sort((a, b) => {
//     if (!sortConfig.key) return 0;

//     const valA = a[sortConfig.key]?.toString().toLowerCase?.() || '';
//     const valB = b[sortConfig.key]?.toString().toLowerCase?.() || '';

//     if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
//     if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
//     return 0;
//   });

//   const renderSortableHeader = (label, key) => (
//     <th
//       className="px-4 py-3 cursor-pointer select-none"
//       onClick={() => handleSort(key)}
//     >
//       <div className="flex items-center gap-1">
//         {label}
//         <span className="flex flex-col ml-1 leading-tight">
//           <FaSortUp
//             className={`text-[10px] ${
//               sortConfig.key === key && sortConfig.direction === 'asc'
//                 ? 'text-black'
//                 : 'text-gray-300'
//             }`}
//           />
//           <FaSortDown
//             className={`-mt-1 text-[10px] ${
//               sortConfig.key === key && sortConfig.direction === 'desc'
//                 ? 'text-black'
//                 : 'text-gray-300'
//             }`}
//           />
//         </span>
//       </div>
//     </th>
//   );

//   return (
//     <div className="min-h-screen px-6 py-10">
//       {/* Tabs */}
//       <div className="flex items-center justify-between mb-6 border w-full overflow-hidden p-2">
//         {tabs.map((tab) => (
        //   <button
        //     key={tab.value}
        //     onClick={() => setActiveTab(tab.value)}
        //     className={`px-20 py-2 text-sm font-semibold transition ${
        //       activeTab === tab.value
        //         ? 'bg-[#EF4F24] text-white'
        //         : 'text-gray-400 '
        //     }`}
        //   >
        //     {tab.label}
        //   </button>
//         ))}
//       </div>

//       {/* Table */}
//       <div className="w-full overflow-x-auto rounded-lg border border-gray-100">
//         <table className="min-w-full text-sm text-left">
//           <thead className="bg-[#F3F3F3] text-black">
//             <tr>
//               <th className="px-4 py-3">
//                 <input type="checkbox" />
//               </th>
//               {renderSortableHeader('Name (Listing, Guest)', 'listingName')}
//               {renderSortableHeader('Ref no.', 'ref')}
//               {renderSortableHeader('Price', 'price')}
//               {renderSortableHeader('Nights', 'nights')}
//               {renderSortableHeader('Date', 'date')}
//               <th className="px-4 py-3">Status</th>
//             </tr>
//           </thead>
//           <tbody className="text-gray-700">
//             {loading ? (
//               <tr>
//                 <td colSpan="7" className="text-center py-8 text-gray-400">
//                   Loading...
//                 </td>
//               </tr>
//             ) : sortedReservations.length === 0 ? (
//               <tr>
//                 <td colSpan="7" className="text-center py-8 text-gray-400">
//                   No reservations found.
//                 </td>
//               </tr>
//             ) : (
//               sortedReservations.map((res) => (
//                 <tr
//                   key={res.id}
//                   className="border-t border-gray-100 hover:bg-gray-50 transition"
//                 >
//                   <td className="px-4 py-4">
//                     <input type="checkbox" />
//                   </td>
//                   <td className="px-4 py-4">
//                     <div className="flex items-center gap-3">
//                       <img
//                         src="https://i.pravatar.cc/100"
//                         alt="guest"
//                         className="w-10 h-10 rounded-full object-cover"
//                       />
//                       <span>{res.listingName}</span>
//                     </div>
//                   </td>
//                   <td className="px-4 py-4">{res.ref || 'R2iopJk'}</td>
//                   <td className="px-4 py-4">{res.price.toLocaleString()}</td>
//                   <td className="px-4 py-4">{res.nights}</td>
//                   <td className="px-4 py-4">{res.date}</td>
//                   <td className="px-4 py-4 flex gap-2">
//                     <button className="bg-[#EF4F24] px-4 py-1 rounded-lg text-sm text-white">
//                       Accept
//                     </button>
//                     <button className="bg-[#D9D9D9] text-black px-4 py-1 rounded-lg text-sm">
//                       Decline
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


// 'use client';

// import { useState } from 'react';
// import { FaSortUp, FaSortDown } from 'react-icons/fa';
// import { FaEye, FaPrint, FaTrash } from 'react-icons/fa';
// import useReservations from '../../../hooks/useReservations';

// const tabs = [
//   { label: 'All Bookings', value: 'all' },
//   { label: 'Upcoming', value: 'upcoming' },
//   { label: 'Completed', value: 'completed' },
//   { label: 'Cancelled', value: 'cancelled' },
// ];

// export default function BookingsPage() {
//   const { reservations, loading } = useReservations();
//   const [activeTab, setActiveTab] = useState('all');
//   const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
//   const [selectAll, setSelectAll] = useState(false);

//   const filteredReservations =
//     activeTab === 'all'
//       ? reservations
//       : reservations.filter((res) => res.status === activeTab);

//   const handleSort = (key) => {
//     let direction = 'asc';
//     if (sortConfig.key === key && sortConfig.direction === 'asc') {
//       direction = 'desc';
//     }
//     setSortConfig({ key, direction });
//   };

//   const handleSelectAll = (e) => {
//     setSelectAll(e.target.checked);
//   };

//   const sortedReservations = [...filteredReservations].sort((a, b) => {
//     if (!sortConfig.key) return 0;
//     const valA = a[sortConfig.key]?.toString().toLowerCase?.() || '';
//     const valB = b[sortConfig.key]?.toString().toLowerCase?.() || '';
//     if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
//     if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
//     return 0;
//   });

//   const renderSortableHeader = (label, key) => (
//     <th className="px-4 py-3 cursor-pointer select-none" onClick={() => handleSort(key)}>
//       <div className="flex items-center gap-1">
//         {label}
//         <span className="flex flex-col ml-1 leading-tight">
//           <FaSortUp
//             className={`text-[10px] ${
//               sortConfig.key === key && sortConfig.direction === 'asc' ? 'text-black' : 'text-gray-300'
//             }`}
//           />
//           <FaSortDown
//             className={`-mt-1 text-[10px] ${
//               sortConfig.key === key && sortConfig.direction === 'desc' ? 'text-black' : 'text-gray-300'
//             }`}
//           />
//         </span>
//       </div>
//     </th>
//   );

//   return (
//        <div className="min-h-screen px-6 py-10">
//       {/* Tabs */}
//       <div className="flex items-center justify-between mb-6 border w-full overflow-hidden p-2 ">
//         {tabs.map((tab) => (
//         //   <button
//         //     key={tab.value}
//         //     onClick={() => {
//         //       setActiveTab(tab.value);
//         //       setSelectAll(false);
//         //     }}
//         //     className={`px-6 py-2 text-sm font-semibold transition ${
//         //       activeTab === tab.value
//         //         ? 'bg-[#EF4F24] text-white '
//         //         : 'text-gray-400'
//         //     }`}
//         //   >
//         //     {tab.label}
//         //   </button>
//         <button
//             key={tab.value}
//             onClick={() => setActiveTab(tab.value)}
//             className={`px-20 py-2 text-sm font-semibold transition ${
//               activeTab === tab.value
//                 ? 'bg-[#EF4F24] text-white'
//                 : 'text-gray-400 '
//             }`}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       {/* Table */}
//       <div className="w-full overflow-x-auto">
//         <table className="min-w-full text-sm text-left">
//           <thead className="bg-[#F3F3F3] text-black">
//             <tr>
//               <th className="px-4 py-3">
//                 <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
//               </th>
//               {renderSortableHeader('Name (Listing, Guest)', 'listingName')}
//               {renderSortableHeader('Ref no.', 'ref')}
//               {renderSortableHeader('Price', 'price')}
//               {renderSortableHeader('Nights', 'nights')}
//               {renderSortableHeader('Date', 'date')}
//               <th className="px-4 py-3">Status</th>
//               {activeTab === 'all' && <th className="px-4 py-3">Action</th>}
//             </tr>
//           </thead>
//           <tbody className="text-gray-700">
//             {loading ? (
//               <tr>
//                 <td colSpan="8" className="text-center py-8 text-gray-400">
//                   Loading...
//                 </td>
//               </tr>
//             ) : sortedReservations.length === 0 ? (
//               <tr>
//                 <td colSpan="8" className="text-center py-8 text-gray-400">
//                   No reservations found.
//                 </td>
//               </tr>
//             ) : (
//               sortedReservations.map((res) => (
//                 <tr key={res.id} className="border-t border-gray-100 hover:bg-gray-50 transition">
//                   <td className="px-4 py-4">
//                     <input type="checkbox" checked={selectAll} readOnly />
//                   </td>
//                   <td className="px-4 py-4">
//                     <div className="flex items-center gap-3">
//                       <img
//                         src="https://i.pravatar.cc/100"
//                         alt="guest"
//                         className="w-10 h-10 rounded-full object-cover"
//                       />
//                       <span>{res.listingName}</span>
//                     </div>
//                   </td>
//                   <td className="px-4 py-4">{res.ref || 'R2iopJk'}</td>
//                   <td className="px-4 py-4">{res.price.toLocaleString()}</td>
//                   <td className="px-4 py-4">{res.nights}</td>
//                   <td className="px-4 py-4">{res.date}</td>
//                   <td className="px-4 py-4">
//                     <span
//                       className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                         res.status === 'upcoming'
//                           ? 'bg-gray-300 text-black'
//                           : res.status === 'completed'
//                           ? 'bg-green-300 text-black'
//                           : res.status === 'cancelled'
//                           ? 'bg-red-300 text-black'
//                           : 'bg-yellow-200 text-black'
//                       }`}
//                     >
//                       {res.status.charAt(0).toUpperCase() + res.status.slice(1)}
//                     </span>
//                   </td>
//                   {activeTab === 'all' && (
//                     <td className="px-4 py-4 flex items-center gap-4 text-lg text-gray-500">
//                       <FaEye className="cursor-pointer hover:text-black" />
//                       <FaPrint className="cursor-pointer hover:text-black" />
//                       <FaTrash className="cursor-pointer hover:text-black" />
//                     </td>
//                   )}
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }


'use client';

import { useState } from 'react';
import { FaSortUp, FaSortDown, FaEye, FaPrint, FaTrash } from 'react-icons/fa';
import useReservations from '../../../hooks/useReservations';

const tabs = [
  { label: 'All Bookings', value: 'all' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Completed', value: 'completed' },
  { label: 'Cancelled', value: 'cancelled' },
];

export default function BookingsPage() {
  const { reservations, loading } = useReservations();
  const [activeTab, setActiveTab] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [selectAll, setSelectAll] = useState(false);

  const filteredReservations =
    activeTab === 'all'
      ? reservations
      : reservations.filter((res) => res.status === activeTab);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSelectAll = (e) => {
    setSelectAll(e.target.checked);
  };

  const sortedReservations = [...filteredReservations].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const valA = a[sortConfig.key]?.toString().toLowerCase?.() || '';
    const valB = b[sortConfig.key]?.toString().toLowerCase?.() || '';
    if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
    if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const renderSortableHeader = (label, key) => (
    <th className="px-4 py-3 cursor-pointer select-none" onClick={() => handleSort(key)}>
      <div className="flex items-center gap-1">
        {label}
        <span className="flex flex-col ml-1 leading-tight">
          <FaSortUp
            className={`text-[10px] ${
              sortConfig.key === key && sortConfig.direction === 'asc'
                ? 'text-black'
                : 'text-gray-300'
            }`}
          />
          <FaSortDown
            className={`-mt-1 text-[10px] ${
              sortConfig.key === key && sortConfig.direction === 'desc'
                ? 'text-black'
                : 'text-gray-300'
            }`}
          />
        </span>
      </div>
    </th>
  );

  return (
    <div className="min-h-screen px-6 py-10">
      {/* Tabs */}
     {!loading && sortedReservations.length > 0 && (
  <div className="flex items-center justify-between mb-6 border w-full overflow-hidden p-2">
    {tabs.map((tab) => (
      <button
        key={tab.value}
        onClick={() => {
          setActiveTab(tab.value);
          setSelectAll(false);
        }}
        className={`px-20 py-2 text-sm font-semibold transition ${
          activeTab === tab.value ? 'bg-[#EF4F24] text-white' : 'text-gray-400'
        }`}
      >
        {tab.label}
      </button>
    ))}
  </div>
)}


      {/* Table or Empty State */}
      {loading ? (
        <div className="text-center py-8 text-gray-400">Loading...</div>
      ) : sortedReservations.length === 0 ? (
        <div className="text-center py-12 text-gray-400 text-lg font-medium">
          No bookings found.
        </div>
      ) : (
        <div className="w-full overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#F3F3F3] text-black">
              <tr>
                <th className="px-4 py-3">
                  <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                </th>
                {renderSortableHeader('Name (Listing, Guest)', 'listingName')}
                {renderSortableHeader('Ref no.', 'ref')}
                {renderSortableHeader('Price', 'price')}
                {renderSortableHeader('Nights', 'nights')}
                {renderSortableHeader('Date', 'date')}
                <th className="px-4 py-3">Status</th>
                {activeTab === 'all' && <th className="px-4 py-3">Action</th>}
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {sortedReservations.map((res) => (
                <tr key={res.id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-4 py-4">
                    <input type="checkbox" checked={selectAll} readOnly />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src="https://i.pravatar.cc/100"
                        alt="guest"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <span>{res.listingName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">{res.ref || 'R2iopJk'}</td>
                  <td className="px-4 py-4">{res.price.toLocaleString()}</td>
                  <td className="px-4 py-4">{res.nights}</td>
                  <td className="px-4 py-4">{res.date}</td>
                  <td className="px-4 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        res.status === 'upcoming'
                          ? 'bg-gray-300 text-black'
                          : res.status === 'completed'
                          ? 'bg-green-300 text-black'
                          : res.status === 'cancelled'
                          ? 'bg-red-300 text-black'
                          : 'bg-yellow-200 text-black'
                      }`}
                    >
                      {res.status.charAt(0).toUpperCase() + res.status.slice(1)}
                    </span>
                  </td>
                  {activeTab === 'all' && (
                    <td className="px-4 py-4 flex items-center gap-4 text-lg text-gray-500">
                      <FaEye className="cursor-pointer hover:text-black" />
                      <FaPrint className="cursor-pointer hover:text-black" />
                      <FaTrash className="cursor-pointer hover:text-black" />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
