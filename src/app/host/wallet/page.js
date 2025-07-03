"use client";

import { useState } from "react";
import Image from "next/image";
import Sidebar from "../../../../components/host/Sidebar";
import Navbar from "../../../../components/host/Navbar";
import SubHeader from "../../../../components/host/wallet/SubHeader";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Sidebar />

      <main className="ml-56 p-6 pt-30 space-y-6">
        <SubHeader />
        
       
      </main>
    </div>
  );
}
