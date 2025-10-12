"use client";

import { redirect } from "next/navigation";

export default function GuestMessages() {
  // Redirect to the unified messages page
  redirect('/messages');
}
