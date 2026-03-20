"use client";

import { usePathname } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import BottomNav from "@/components/rider/BottomNav";

export default function RiderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Login and register pages are public — don't wrap them in ProtectedRoute
  const isPublicPage = pathname === "/rider/login" || pathname === "/rider/register";

  if (isPublicPage) {
    return <>{children}</>;
  }

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900">
        <main className="flex-1 pb-20 md:pb-0">
          {children}
        </main>
        <BottomNav />
      </div>
    </ProtectedRoute>
  );
}
