"use client";

import { useState } from "react";

const flaggedClaims = [
  {
    id: "CLM-001",
    rider: "Raj Kumar",
    amount: 350,
    trustScore: 45,
    gpsSignal: "weak",
    behavior: "anomaly",
    priority: "high",
  },
  {
    id: "CLM-002",
    rider: "Priya Singh",
    amount: 280,
    trustScore: 78,
    gpsSignal: "strong",
    behavior: "normal",
    priority: "low",
  },
];

export default function AnalystQueue() {
  const [selectedClaim, setSelectedClaim] = useState<string | null>(null);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Analyst Queue</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Review flagged claims for approval</p>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-400">Claim ID</th>
              <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-400">Rider</th>
              <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-400">Amount</th>
              <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-400">Trust %</th>
              <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-400">GPS Signal</th>
              <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-400">Behavior</th>
              <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-400">Action</th>
            </tr>
          </thead>
          <tbody>
            {flaggedClaims.map((claim) => (
              <tr key={claim.id} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
                <td className="p-4 text-slate-900 dark:text-white font-semibold">{claim.id}</td>
                <td className="p-4 text-slate-900 dark:text-white">{claim.rider}</td>
                <td className="p-4 text-slate-900 dark:text-white font-semibold">₹{claim.amount}</td>
                <td className="p-4">
                  <span className={`text-sm font-semibold ${claim.trustScore > 70 ? "text-green-600" : "text-red-600"}`}>
                    {claim.trustScore}%
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    claim.gpsSignal === "strong" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                  }`}>
                    {claim.gpsSignal}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    claim.behavior === "normal" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {claim.behavior}
                  </span>
                </td>
                <td className="p-4">
                  <button
                    onClick={() => setSelectedClaim(selectedClaim === claim.id ? null : claim.id)}
                    className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
                  >
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedClaim && (
        <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Claim Details</h2>
            <button
              onClick={() => setSelectedClaim(null)}
              className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              ✕
            </button>
          </div>
          <div className="space-y-2 mb-6 text-slate-700 dark:text-slate-300">
            <p><strong>Claim ID:</strong> {selectedClaim}</p>
            <p><strong>Fraud Signals:</strong> Multiple alerts detected</p>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700">
              ✓ Approve
            </button>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700">
              ✗ Reject
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
              ⏸ Investigate
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
