"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const analyticsData = [
  { name: "Mon", Earned: 1200, Protected: 0 },
  { name: "Tue", Earned: 1100, Protected: 0 },
  { name: "Wed", Earned: 400,  Protected: 800 },
  { name: "Thu", Earned: 1300, Protected: 0 },
  { name: "Fri", Earned: 950,  Protected: 250 },
  { name: "Sat", Earned: 1400, Protected: 0 },
  { name: "Sun", Earned: 1200, Protected: 0 },
];

const riskForecast = [
  { day: "Tomorrow",  condition: "85% Rain",       time: "2–4 PM",       icon: "🌧️", level: "high" },
  { day: "Friday",    condition: "High AQI (299)", time: "All Day",       icon: "💨", level: "high" },
  { day: "Next Week", condition: "Clear",           time: "Good to work", icon: "☀️", level: "low"  },
];

const activeTriggers = [
  { name: "Heavy Rain",       threshold: "20mm+",     zone: "Delhi" },
  { name: "Air Quality Alert",threshold: "AQI >300",  zone: "Delhi" },
  { name: "Curfew Hours",     threshold: "Alert issued", zone: "All zones" },
];

export default function RiderDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Simulator state
  const [isSimulating, setIsSimulating] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [mockBalance, setMockBalance] = useState(2450);
  const [mockClaims, setMockClaims] = useState<any[]>([]);

  const riderData = {
    tier: "Gold",
    earnings: "₹2,450",
    status: "active",
    premium: "₹149",
    coverage: "Mon Mar 27",
    baseline: "₹650/day",
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) {
        router.replace("/rider/login");
      } else {
        setUser(u);
      }
      setCheckingAuth(false);
    });
    return () => unsub();
  }, [router]);

  const triggerSimulation = () => {
    setIsSimulating(true);
    setTimeout(() => setShowAlert(true), 500);
    setTimeout(() => {
      setMockBalance((prev) => prev + 500);
      setMockClaims((prev) => [
        { date: new Date().toLocaleDateString(), trigger: "Rainfall > 20mm (Simulated)", status: "INSTANTLY PAID", amount: "₹500.00" },
        ...prev,
      ]);
      setIsSimulating(false);
    }, 3500);
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  const userInitial = user?.email?.[0]?.toUpperCase() ?? "R";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-20 pb-24 md:pb-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-6">

        {/* ── TOP ALERT ── */}
        {showAlert && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-white animate-pulse text-xl">⚡</div>
              <div>
                <p className="text-sm font-bold text-amber-500 uppercase tracking-wide">Environmental Event Triggered</p>
                <p className="text-slate-700 dark:text-zinc-200 text-sm mt-0.5">Severe Weather confirmed. Parametric payout executed instantly.</p>
              </div>
            </div>
            <button onClick={() => setShowAlert(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-sm font-bold">✕</button>
          </div>
        )}

        {/* ── HEADER ── */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
              Rider Dashboard
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Welcome, <span className="font-semibold text-slate-700 dark:text-slate-200">{user?.displayName ?? user?.email}</span></p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={triggerSimulation}
              disabled={isSimulating}
              className="px-4 py-2 rounded-full border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-bold text-sm hover:bg-amber-100 dark:hover:bg-amber-800/40 transition active:scale-95 disabled:opacity-40 flex items-center gap-2"
            >
              ⚡ {isSimulating ? "Simulating..." : "Simulate Crisis"}
            </button>
            <Link href="/purchase" className="px-4 py-2 rounded-full bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition shadow-lg shadow-blue-500/20 active:scale-95">
              Buy Policy
            </Link>
          </div>
        </header>

        {/* ── STAT CARDS ── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Balance */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Payout Balance</p>
            <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              ₹{mockBalance.toLocaleString("en-IN")}
            </p>
            {mockClaims.length > 0 && (
              <span className="text-xs text-emerald-500 font-bold">↑ +₹500 from trigger</span>
            )}
          </div>

          {/* Coverage */}
          <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-5 border border-emerald-100 dark:border-emerald-800 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-2">Coverage Status</p>
            <p className="text-xl font-bold text-emerald-700 dark:text-emerald-300">🟢 ACTIVE</p>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">Until {riderData.coverage}</p>
          </div>

          {/* Premium */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Weekly Premium</p>
            <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{riderData.premium}</p>
            <p className="text-xs text-slate-400 mt-1">due Monday</p>
          </div>

          {/* Baseline */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-100 dark:border-slate-700 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">Daily Baseline</p>
            <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">{riderData.baseline}</p>
            <p className="text-xs text-slate-400 mt-1">Tier: {riderData.tier}</p>
          </div>
        </div>

        {/* ── MAIN GRID (desktop: 2-col) ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Analytics Chart — takes 2/3 */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm">
            <div className="mb-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Earnings vs Protection Saved</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400">Parametric payouts issued during rainfall disruptions this week.</p>
            </div>
            <div className="h-56 md:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={analyticsData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="gEarned" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#2563eb" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gProtected" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#10b981" stopOpacity={0.35} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" strokeOpacity={0.4} />
                  <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "12px", fontSize: "12px", color: "#fff" }}
                  />
                  <Area type="monotone" dataKey="Earned"    stroke="#2563eb" strokeWidth={2} fill="url(#gEarned)" />
                  <Area type="monotone" dataKey="Protected" stroke="#10b981" strokeWidth={2} fill="url(#gProtected)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-500" /><span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Earned</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500" /><span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Parametric Protection</span></div>
            </div>
          </div>

          {/* Risk Forecast — 1/3 */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col gap-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">⛈️ Risk Forecast</h2>
            {riskForecast.map((f, i) => (
              <div key={i} className={`flex items-center justify-between p-3 rounded-xl ${f.level === "high" ? "bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800" : "bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800"}`}>
                <div>
                  <p className="text-sm font-bold text-slate-800 dark:text-white">{f.day}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{f.condition}</p>
                  <p className="text-xs text-slate-400 dark:text-slate-500">{f.time}</p>
                </div>
                <span className="text-2xl">{f.icon}</span>
              </div>
            ))}

            <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-700">
              <p className="text-xs font-bold text-slate-500 dark:text-slate-500 uppercase tracking-wider mb-2">🚨 Active Triggers</p>
              {activeTriggers.map((t, i) => (
                <div key={i} className="text-xs text-amber-700 dark:text-amber-400 font-medium py-1">
                  • {t.name} ({t.threshold}) — {t.zone}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── PAYOUTS TABLE + QUICK ACTIONS ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Claims Table — 2/3 */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Recent Parametric Payouts</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase font-bold text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/60">
                  <tr>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Trigger</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {mockClaims.map((c, i) => (
                    <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{c.date}</td>
                      <td className="px-6 py-4 font-semibold text-slate-800 dark:text-white">{c.trigger}</td>
                      <td className="px-6 py-4"><span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-bold">{c.status}</span></td>
                      <td className="px-6 py-4 text-right font-bold text-emerald-600 dark:text-emerald-400">{c.amount}</td>
                    </tr>
                  ))}
                  {mockClaims.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-slate-400 dark:text-slate-500 text-sm">
                        No payouts yet. Click <span className="font-bold text-amber-500">⚡ Simulate Crisis</span> to see how instant payouts work.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions — 1/3 */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col gap-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Quick Actions</h2>

            <Link href="/purchase" className="flex items-center gap-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition group">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center text-xl group-hover:scale-110 transition-transform">💳</div>
              <div>
                <p className="font-bold text-slate-800 dark:text-white text-sm">Buy / Renew Policy</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Dynamic AI-priced coverage</p>
              </div>
            </Link>

            <Link href="/rider/policy" className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition group">
              <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-white flex items-center justify-center text-xl group-hover:scale-110 transition-transform">📋</div>
              <div>
                <p className="font-bold text-slate-800 dark:text-white text-sm">Policy Details</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">What triggers your payouts</p>
              </div>
            </Link>

            <Link href="/rider/claims" className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition group">
              <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-white flex items-center justify-center text-xl group-hover:scale-110 transition-transform">🎯</div>
              <div>
                <p className="font-bold text-slate-800 dark:text-white text-sm">Claims History</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Past payouts & breakdowns</p>
              </div>
            </Link>

            <Link href="/rider/profile" className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-100 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 transition group">
              <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-white flex items-center justify-center text-xl group-hover:scale-110 transition-transform">👤</div>
              <div>
                <p className="font-bold text-slate-800 dark:text-white text-sm">Profile & KYC</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Your settings & info</p>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
