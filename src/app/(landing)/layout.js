"use client";

import { usePathname } from "next/navigation";
import NavBar from "../../../components/NavBar";
import Footer from "../../../components/Footer";

export default function LandingLayout({ children }) {
  const pathname = usePathname();

  const hideNavbarRoutes = ["/register", "/login"];
  const shouldHideNavbar = hideNavbarRoutes.includes(pathname);

  return (
    <>
      {!shouldHideNavbar && <NavBar />}
      <main>{children}</main>
      <Footer />
    </>
  );
}
