"use client";

import { redirect } from "next/navigation";

export default function HostMessages() {
  // Redirect to the unified messages page
  redirect('/messages');
}
