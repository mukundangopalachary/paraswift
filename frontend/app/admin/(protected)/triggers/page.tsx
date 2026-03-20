"use client";

import { useState } from "react";

const triggers = [
  {
    id: 1,
    name: "Heavy Rain",
    category: "Weather",
    threshold: "20mm+",
    zones: "Delhi, Mumbai, Bangalore",
    active: true,
  },
  {
    id: 2,
    name: "High AQI",
    category: "Air Quality",
    threshold: "300+",
    zones: "Delhi, Lahore",
    active: true,
  },
  {
    id: 3,
    name: "Curfew Imposed",
    category: "Civic",
    threshold: "Active",
    zones: "All zones",
    active: false,
  },
];

export default function TriggersPage() {
  const [activeTriggers, setActiveTriggers] = useState(triggers.map(t => t.active));

  const toggleTrigger = (id: number) => {
    setActiveTriggers(activeTriggers.map((active, idx) => idx === id ? !active : active));
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Trigger Management</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Configure disruption triggers for payouts</p>
      </div>

      <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-400">Trigger Name</th>
              <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-400">Category</th>
              <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-400">Threshold</th>
              <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-400">Zones</th>
              <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-400">Status</th>
              <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-400">Action</th>
            </tr>
          </thead>
          <tbody>
            {triggers.map((trigger, idx) => (
              <tr key={trigger.id} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
                <td className="p-4 font-semibold text-slate-900 dark:text-white">{trigger.name}</td>
                <td className="p-4 text-slate-700 dark:text-slate-300">{trigger.category}</td>
                <td className="p-4 text-slate-700 dark:text-slate-300">{trigger.threshold}</td>
                <td className="p-4 text-slate-700 dark:text-slate-300 text-sm">{trigger.zones}</td>
                <td className="p-4">
                  <button
                    onClick={() => toggleTrigger(idx)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      activeTriggers[idx] ? "bg-green-100 text-green-700" : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {activeTriggers[idx] ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="p-4">
                  <button className="text-blue-600 dark:text-blue-400 hover:underline font-semibold text-sm">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
