"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Navbar from "./Navbar";

export default function ConditionalNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const adminToken = localStorage.getItem("adminToken");

    // If admin is logged in and they're on a non-admin page, kick them to admin dashboard
    if (adminToken && !pathname.startsWith("/admin")) {
      router.replace("/admin/dashboard");
      return;
    }
  }, [pathname, router]);

  // Admin pages have their own AdminTopbar — don't show the floating Navbar there
  if (pathname.startsWith("/admin")) return null;

  return <Navbar />;
}
