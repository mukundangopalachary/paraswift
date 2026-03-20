"use client";

import { useState } from "react";

const ridersList = [
  { id: 1, name: "Raj Kumar", phone: "9876543210", coverage: "Active", tier: "Pro", claims: 3, paid: "₹8.2K" },
  { id: 2, name: "Priya Singh", phone: "9876543211", coverage: "Active", tier: "Plus", claims: 1, paid: "₹2.1K" },
  { id: 3, name: "Amit Patel", phone: "9876543212", coverage: "Pending", tier: "Basic", claims: 0, paid: "₹0" },
];

export default function RidersPage() {
  const [selectedRider, setSelectedRider] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRiders = ridersList.filter(rider =>
    rider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rider.phone.includes(searchTerm)
  );

  return (
    <div className="p-6 space-y-6">
      <div >
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Riders Database</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Manage delivery partners & coverage</p>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or phone..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
      />

      {/* Table */}
      <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-400">Name</th>
              <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-400">Phone</th>
              <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-400">Coverage</th>
              <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-400">Tier</th>
              <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-400">Claims</th>
              <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-400">Paid</th>
              <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-400">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredRiders.map((rider) => (
              <tr key={rider.id} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
                <td className="p-4 font-semibold text-slate-900 dark:text-white">{rider.name}</td>
                <td className="p-4 text-slate-700 dark:text-slate-300">{rider.phone}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    rider.coverage === "Active" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                  }`}>
                    {rider.coverage}
                  </span>
                </td>
                <td className="p-4 text-slate-700 dark:text-slate-300">{rider.tier}</td>
                <td className="p-4 text-slate-700 dark:text-slate-300">{rider.claims}</td>
                <td className="p-4 font-semibold text-slate-900 dark:text-white">{rider.paid}</td>
                <td className="p-4">
                  <button
                    onClick={() => setSelectedRider(selectedRider === rider.id ? null : rider.id)}
                    className="text-blue-600 dark:text-blue-400 hover:underline font-semibold text-sm"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Rider Detail Modal */}
      {selectedRider !== null && (
        <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">Rider Profile</h2>
          <div className="grid md:grid-cols-2 gap-4 text-slate-700 dark:text-slate-300">
            <p><strong>Name:</strong> {ridersList.find(r => r.id === selectedRider)?.name}</p>
            <p><strong>Phone:</strong> {ridersList.find(r => r.id === selectedRider)?.phone}</p>
            <p><strong>Coverage:</strong> {ridersList.find(r => r.id === selectedRider)?.coverage}</p>
            <p><strong>Tier:</strong> {ridersList.find(r => r.id === selectedRider)?.tier}</p>
          </div>
          <button
            onClick={() => setSelectedRider(null)}
            className="mt-4 px-4 py-2 bg-slate-300 dark:bg-slate-700 rounded-lg"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
