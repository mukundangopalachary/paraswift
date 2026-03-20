"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

export default function RiderProfile() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        router.replace("/rider/login");
      } else {
        setUser(u);
      }
      setLoading(false);
    });
    return () => unsub();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  const displayName = user?.displayName ?? "Rider";
  const email = user?.email ?? "";
  const photoURL = user?.photoURL;
  const initial = displayName[0]?.toUpperCase() ?? "R";
  // Google provides the name; try to derive first+last  
  const nameParts = displayName.split(" ");
  const firstName = nameParts[0] ?? "";
  const lastName = nameParts.slice(1).join(" ") ?? "";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 pb-24 md:pb-10">
      <div className="max-w-2xl mx-auto px-4 space-y-6">

        {/* Back */}
        <Link href="/rider/dashboard" className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-semibold text-sm transition-colors">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
          Back to Dashboard
        </Link>

        {/* Profile Header Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm flex items-center gap-6">
          {photoURL ? (
            <img
              src={photoURL}
              alt={displayName}
              referrerPolicy="no-referrer"
              className="w-20 h-20 rounded-full border-4 border-white dark:border-slate-700 shadow-lg"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg flex-shrink-0">
              {initial}
            </div>
          )}
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{displayName}</h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-0.5">{email}</p>
            <span className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-bold">
              ✓ Google Verified
            </span>
          </div>
        </div>

        {/* Account Details */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-base font-bold text-slate-800 dark:text-white">Account Details</h2>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-700">
            <div className="flex justify-between items-center px-6 py-4">
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">First Name</span>
              <span className="text-sm font-semibold text-slate-900 dark:text-white">{firstName || "—"}</span>
            </div>
            <div className="flex justify-between items-center px-6 py-4">
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Last Name</span>
              <span className="text-sm font-semibold text-slate-900 dark:text-white">{lastName || "—"}</span>
            </div>
            <div className="flex justify-between items-center px-6 py-4">
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Email</span>
              <span className="text-sm font-semibold text-slate-900 dark:text-white">{email}</span>
            </div>
            <div className="flex justify-between items-center px-6 py-4">
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">User ID</span>
              <span className="text-xs font-mono text-slate-400 dark:text-slate-500 truncate max-w-48">{user?.uid}</span>
            </div>
            <div className="flex justify-between items-center px-6 py-4">
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Auth Provider</span>
              <span className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                Google
              </span>
            </div>
            <div className="flex justify-between items-center px-6 py-4">
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Email Verified</span>
              <span className={`text-sm font-semibold ${user?.emailVerified ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
                {user?.emailVerified ? "✓ Verified" : "⚠ Not Verified"}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Method (placeholder) */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700">
            <h2 className="text-base font-bold text-slate-800 dark:text-white">Payment Method</h2>
          </div>
          <div className="px-6 py-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-lg">💳</div>
            <div>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">UPI — raj...@okaxis</p>
              <p className="text-xs text-slate-400 dark:text-slate-500">Primary payout method</p>
            </div>
            <button className="ml-auto text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline">Change</button>
          </div>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold transition active:scale-95 shadow-lg shadow-red-500/20"
        >
          Log Out
        </button>

      </div>
    </div>
  );
}
