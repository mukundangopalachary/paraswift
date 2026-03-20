"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function AdminProtectedRoute({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const router = useRouter();
  const hasChecked = useRef(false);

  useEffect(() => {
    if (hasChecked.current) return;
    hasChecked.current = true;

    const adminToken = localStorage.getItem("adminToken");
    const adminUser = localStorage.getItem("adminUser");

    if (!adminToken || !adminUser) {
      router.replace("/admin/login");
    }
  }, [router]);

  return <>{children}</>;
}
