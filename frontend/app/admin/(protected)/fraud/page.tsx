"use client";

import { useState } from "react";

const fraudClusters = [
  {
    id: 1,
    type: "SPIKE_ALERT",
    title: "Delhi Rain Spike",
    count: 234,
    baseline: 78,
    riskLevel: "HIGH",
    description: "Unusual spike in claims 3x baseline",
  },
  {
    id: 2,
    type: "DEVICE_RING",
    title: "Device Ring Detected",
    count: 12,
    baseline: 2,
    riskLevel: "MEDIUM",
    description: "12 accounts sharing same device ID",
  },
  {
    id: 3,
    type: "BEHAVIOR_ANOMALY",
    title: "Rapid Claims Pattern",
    count: 5,
    baseline: 1,
    riskLevel: "HIGH",
    description: "Claims within 30 seconds apart",
  },
];

export default function FraudDashboard() {
  const [selectedCluster, setSelectedCluster] = useState<number | null>(null);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Fraud Detection</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">AI-powered suspicious pattern detection</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="text-sm text-slate-600 dark:text-slate-400">Flagged Today</div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">23</div>
        </div>
        <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="text-sm text-slate-600 dark:text-slate-400">Auto Rejected</div>
          <div className="text-2xl font-bold text-red-600">8</div>
        </div>
        <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="text-sm text-slate-600 dark:text-slate-400">Analyst Approved</div>
          <div className="text-2xl font-bold text-green-600">12</div>
        </div>
      </div>

      {/* Clusters */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Suspicious Clusters</h2>
        {fraudClusters.map((cluster) => (
          <div
            key={cluster.id}
            onClick={() => setSelectedCluster(selectedCluster === cluster.id ? null : cluster.id)}
            className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">{cluster.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">{cluster.description}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                cluster.riskLevel === "HIGH" ? "bg-red-100 text-red-700" : "bg-amber-100 text-amber-700"
              }`}>
                {cluster.riskLevel}
              </span>
            </div>
            <div className="flex gap-12">
              <div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Claims Count</div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{cluster.count}</div>
              </div>
              <div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Baseline</div>
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{cluster.baseline}</div>
              </div>
              <div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Multiplier</div>
                <div className="text-2xl font-bold text-red-600">{(cluster.count / cluster.baseline).toFixed(1)}x</div>
              </div>
            </div>

            {selectedCluster === cluster.id && (
              <div className="mt-6 p-4 bg-slate-100 dark:bg-slate-700 rounded-lg">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700">
                  Investigate
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
