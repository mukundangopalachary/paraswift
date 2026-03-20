"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden relative selection:bg-blue-200 dark:bg-black">
      {/* Soft Background Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-150 h-150 bg-blue-100/60 dark:bg-blue-900/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-175 h-175 bg-amber-50/70 dark:bg-amber-900/20 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pt-24 pb-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100/50 text-blue-700 text-xs font-semibold tracking-wide mb-8 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping w-full h-full absolute rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Live Coverage Monitoring
        </div>

        <h1 className="text-5xl md:text-7xl font-semibold text-slate-900 dark:text-white tracking-tight max-w-4xl leading-[1.1] mb-8">
          Reliable income protection for the{" "}
          <span className="text-blue-600 dark:text-blue-400 relative whitespace-nowrap">
            modern worker.
            <svg
              className="absolute w-full h-3 -bottom-1 left-0 text-blue-200 dark:text-blue-800"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <path
                d="M0 5 Q 50 15 100 5"
                stroke="currentColor"
                strokeWidth="8"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </h1>

        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mb-12 leading-relaxed font-light">
          Automated payouts for weather disruptions and unforeseen curfews. No
          claim forms. No waiting. Just fair coverage when you need it.
        </p>

        {/* CTA Buttons - Two Roles */}
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-16">
          <Link
            href="/rider/home"
            className="px-8 py-4 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/30 active:scale-95 text-base sm:text-lg text-center"
          >
            → Rider Dashboard
          </Link>
          <Link
            href="/admin/login"
            className="px-8 py-4 rounded-full bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 active:scale-95 text-base sm:text-lg shadow-sm text-center"
          >
            → Admin Panel
          </Link>
        </div>

        {/* Feature Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 w-full">
          <div className="p-6 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur border border-slate-200/30 dark:border-slate-700/30">
            <div className="text-3xl mb-3">🚀</div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
              For Riders
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Track insurance, view claims, and get paid automatically when
              disruptions happen.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur border border-slate-200/30 dark:border-slate-700/30">
            <div className="text-3xl mb-3">⚡</div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
              For Admins
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Monitor triggers, detect fraud, review claims, and manage payouts
              with AI assistance.
            </p>
          </div>
          <div className="p-6 rounded-xl bg-white/50 dark:bg-slate-800/50 backdrop-blur border border-slate-200/30 dark:border-slate-700/30">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
              Secure & Fast
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Firebase-backed infrastructure with real-time updates and AI fraud
              detection.
            </p>
          </div>
        </div>

        {/* Flow Diagram */}
        <div className="w-full max-w-2xl p-8 rounded-2xl bg-white/50 dark:bg-slate-800/50 backdrop-blur border border-slate-200/30 dark:border-slate-700/30">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6 text-center">
            How It Works
          </h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                1
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                Weather/civic disruptions detected by system
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                2
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                AI analyzes: GPS, behavior, device, historical patterns
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                3
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                Auto-claims generated for affected riders
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                4
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                Fraud alerts sent to analyst queue for human review
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                5
              </div>
              <p className="text-slate-700 dark:text-slate-300">
                Approved claims = instant payouts to riders
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-slate-200 dark:border-slate-800 mt-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 text-center text-sm text-slate-600 dark:text-slate-400">
          <p>
            Paraswift AI-Powered Parametric Insurance Platform | Built for India's
            Gig Economy
          </p>
        </div>
      </div>
    </main>
  );
}
