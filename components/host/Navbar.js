"use client";

import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserProfile } from "@/redux/slices/profileSlice";
import LoadingIndicator from "components/LoadingIndicator";

export default function Navbar() {

  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getUserProfile);
  }, [dispatch])

  if (loading) return <LoadingIndicator /> ;
  if (error) return <div>Error {error}</div>

  return (
    <nav className="w-full fixed flex justify-between items-center p-4 bg-white border-b z-50">
      {/* Left: Logo */}
      <Link href="/host" className="flex items-center">
        <Image
          src="/images/logo/icon.png"
          alt="Logo"
          width={40}
          height={40}
          className="object-contain"
        />
      </Link>

      {/* Right: User profile */}
      <div className="flex items-center gap-2">
        <Image
          src={user?.profilePicture}
          alt=""
          width={32}
          height={32}
          className="rounded-full object-cover"
        />
        <div>
          <p className="text-sm font-semibold">{user?.firstName || "Unknown First Name"} {user?.lastName || "Unknown Last Name"}</p>
          <p className="text-xs text-green-500">{user?.userType || "Unknown"}</p>
        </div>
      </div>
    </nav>
  );
}
