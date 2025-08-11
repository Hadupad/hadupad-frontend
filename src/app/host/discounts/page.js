"use client";

import Sidebar from "../../../../components/host/Sidebar";
import Navbar from "../../../../components/host/Navbar";
import SubHeader from "../../../../components/host/discounts/SubHeader";
import Tabs from "../../../../components/host/discounts/Tabs";

export default function CautionFee() {
  return (
   <div className="min-h-screen bg-gray-50">
         <Navbar />
         <Sidebar />
   
         <main className="ml-56 p-6 pt-30 space-y-6">
           <SubHeader />
           <Tabs />
         </main>
       </div>
  );
}
