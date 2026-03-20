"use client";

import Link from "next/link";

export default function RiderPolicy() {
  const coverageInfo = {
    premium: "₹149/week",
    maxPayout: "₹2,000/week",
    coverage: "80% of income",
    valid: "Mon-Sun",
  };

  const triggers = [
    {
      icon: "🌧️",
      name: "HEAVY RAIN",
      threshold: "Threshold: 20mm+ in 1hr",
      zone: "Your Zone: Delhi",
      action: "Triggers: Auto Claim",
    },
    {
      icon: "💨",
      name: "POOR AIR QUALITY",
      threshold: "Threshold: AQI >300",
      zone: "Your Zone: Delhi",
      action: "Triggers: Auto Claim",
    },
    {
      icon: "🚫",
      name: "CURFEW/LOCKDOWN",
      threshold: "Threshold: Alert issued",
      zone: "Your Zone: All zones",
      action: "Triggers: Auto Claim",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 pt-24 pb-8">
      <Link href="/rider/dashboard" className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-semibold text-sm mb-6 transition-colors">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        Back to Dashboard
      </Link>
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
        How Insurance Works
      </h1>

      {/* Coverage Info */}
      <div className="mb-6 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-4">
          YOUR COVERAGE (Weekly)
        </h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-2 rounded bg-slate-50 dark:bg-slate-700/30">
            <span className="text-sm text-slate-600 dark:text-slate-400">Premium:</span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {coverageInfo.premium}
            </span>
          </div>
          <div className="flex justify-between items-center p-2 rounded bg-slate-50 dark:bg-slate-700/30">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Max Payout:
            </span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {coverageInfo.maxPayout}
            </span>
          </div>
          <div className="flex justify-between items-center p-2 rounded bg-slate-50 dark:bg-slate-700/30">
            <span className="text-sm text-slate-600 dark:text-slate-400">Coverage:</span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {coverageInfo.coverage}
            </span>
          </div>
          <div className="flex justify-between items-center p-2 rounded bg-slate-50 dark:bg-slate-700/30">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Valid Period:
            </span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {coverageInfo.valid}
            </span>
          </div>
        </div>
      </div>

      {/* Trigger Conditions */}
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
          WHAT TRIGGERS CLAIMS?
        </h2>
        <div className="space-y-3">
          {triggers.map((trigger, idx) => (
            <div
              key={idx}
              className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{trigger.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                    {trigger.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                    {trigger.threshold}
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
                    {trigger.zone}
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                    {trigger.action}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Banner */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
          ⚡ AUTO-PROCESSED
        </h3>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          Claims are verified by our AI engine in less than 5 minutes. No manual
          forms needed! Just focus on your work.
        </p>
      </div>
    </div>
  );
}
