"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname.includes(path);
  };

  const navItems = [
    { href: "/rider/dashboard", icon: "🏠", label: "Home", id: "dashboard" },
    { href: "/rider/policy", icon: "📋", label: "Policy", id: "policy" },
    { href: "/rider/claims", icon: "🎯", label: "Claims", id: "claims" },
    { href: "/rider/profile", icon: "👤", label: "Profile", id: "profile" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 md:hidden">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const active = isActive(item.id);
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center justify-center w-16 h-16 transition-colors ${
                active
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
              }`}
            >
              <span className="text-2xl mb-1">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
