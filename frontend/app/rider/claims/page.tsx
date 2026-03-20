"use client";

import { useState } from "react";
import Link from "next/link";

export default function RiderClaims() {
  const [selectedClaim, setSelectedClaim] = useState<number | null>(null);

  const activeClaims = [
    {
      id: 1,
      title: "Rain Disruption",
      initiated: "Mar 19, 2:00 PM",
      status: "AI Approved",
      amount: "₹350",
    },
  ];

  const pastClaims = [
    {
      id: 2,
      title: "Curfew Impact",
      date: "Mar 15, 8:00 PM",
      status: "PAID",
      amount: "₹420",
      transaction: "TXN-12345",
    },
    {
      id: 3,
      title: "Pollution Alert",
      date: "Mar 10, 6:00 AM",
      status: "PAID",
      amount: "₹280",
      transaction: "TXN-12344",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 pt-24 pb-8">
      <Link href="/rider/dashboard" className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-semibold text-sm mb-6 transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        Back to Dashboard
      </Link>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        Claims History
      </h1>

      {/* Active Claims */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3">
          🔄 ACTIVE CLAIMS ({activeClaims.length})
        </h2>
        <div className="space-y-3">
          {activeClaims.map((claim) => (
            <div
              key={claim.id}
              className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {claim.title}
                </h3>
                <span className="text-xs font-medium px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                  {claim.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                Initiated: {claim.initiated}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  Est. Payout: {claim.amount}
                </p>
              </div>
              <button
                onClick={() => setSelectedClaim(claim.id)}
                className="mt-3 w-full px-3 py-2 rounded border border-slate-300 dark:border-slate-600 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition"
              >
                View Breakdown
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Past Claims */}
      <div>
        <h2 className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-3">
          ✅ PAST CLAIMS
        </h2>
        <div className="space-y-3">
          {pastClaims.map((claim) => (
            <div
              key={claim.id}
              className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {claim.title}
                </h3>
                <span className="text-xs font-medium px-2 py-1 rounded bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300">
                  ✓ {claim.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
                {claim.date}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-slate-900 dark:text-white">
                  {claim.amount}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {claim.transaction}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Claim Breakdown Modal */}
      {selectedClaim !== null && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-sm w-full max-h-96 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Claim Details
                </h2>
                <button
                  onClick={() => setSelectedClaim(null)}
                  className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  ✕
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                  CALCULATION BREAKDOWN
                </h3>
                <div className="space-y-2 p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Daily Baseline:
                    </span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      ₹650
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Loss Duration:
                    </span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      4 hours
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Coverage %:
                    </span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      80%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Multiplier:
                    </span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      1.0x
                    </span>
                  </div>
                  <div className="border-t border-slate-200 dark:border-slate-600 pt-2 flex justify-between">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">
                      Final Amount:
                    </span>
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      ₹260
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                  Claim Timeline:
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        Trigger Detected
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        2:00 PM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        GPS Verified
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        2:05 PM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        AI Approved
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        2:15 PM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-green-600 dark:text-green-400">✓</span>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">
                        Payout Sent
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        2:20 PM
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedClaim(null)}
                  className="flex-1 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition"
                >
                  Close
                </button>
                <button className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
                  Report Issue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
