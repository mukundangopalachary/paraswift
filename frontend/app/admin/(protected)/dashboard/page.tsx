"use client";

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { AlertTriangle, Users, FileText, DollarSign } from "lucide-react";

const mockData = [
  { name: "Mon", claims: 45, approved: 42, flagged: 3 },
  { name: "Tue", claims: 52, approved: 49, flagged: 3 },
  { name: "Wed", claims: 48, approved: 45, flagged: 3 },
  { name: "Thu", claims: 61, approved: 58, flagged: 3 },
  { name: "Fri", claims: 55, approved: 52, flagged: 3 },
  { name: "Sat", claims: 67, approved: 63, flagged: 4 },
  { name: "Sun", claims: 58, approved: 54, flagged: 4 },
];

export default function AdminDashboard() {
  const [timeframe, setTimeframe] = useState("week");

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Real-time monitoring & analytics</p>
        </div>
        <select
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value)}
          className="px-4 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
        >
          <option>day</option>
          <option>week</option>
          <option>month</option>
        </select>
      </div>

      {/* KPI Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">Active Users</div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">12,450</div>
          <div className="text-sm text-green-600 mt-2">↑ 3.2% this week</div>
        </div>
        <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">Active Policies</div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">8,932</div>
          <div className="text-sm text-green-600 mt-2">↑ 2.1% this week</div>
        </div>
        <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">Payouts Today</div>
          <div className="text-3xl font-bold text-slate-900 dark:text-white">₹2.3M</div>
          <div className="text-sm text-green-600 mt-2">↑ 12.3% vs yesterday</div>
        </div>
        <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">Fraud Alerts</div>
          <div className="text-3xl font-bold text-red-600">7</div>
          <div className="text-sm text-red-600 mt-2 flex items-center gap-1">
            <AlertTriangle size={14} /> High alerts: 3
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Claims Processing</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="approved" fill="#10b981" />
              <Bar dataKey="flagged" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Payout Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="claims" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <h2 className="font-semibold text-slate-900 dark:text-white mb-4">Recent Payouts</h2>
        <Table />
      </div>
    </div>
  );
}

function Table() {
  const payouts = [
    { id: 1, rider: "Raj Kumar", amount: 350, status: "completed", time: "2 mins ago" },
    { id: 2, rider: "Priya Singh", amount: 280, status: "completed", time: "15 mins ago" },
    { id: 3, rider: "Amit Patel", amount: 420, status: "pending", time: "32 mins ago" },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700">
            <th className="text-left py-3 px-2 font-semibold text-slate-600 dark:text-slate-400">Rider</th>
            <th className="text-left py-3 px-2 font-semibold text-slate-600 dark:text-slate-400">Amount</th>
            <th className="text-left py-3 px-2 font-semibold text-slate-600 dark:text-slate-400">Status</th>
            <th className="text-left py-3 px-2 font-semibold text-slate-600 dark:text-slate-400">Time</th>
          </tr>
        </thead>
        <tbody>
          {payouts.map((payout) => (
            <tr key={payout.id} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50">
              <td className="py-3 px-2 text-slate-900 dark:text-white">{payout.rider}</td>
              <td className="py-3 px-2 font-semibold text-slate-900 dark:text-white">₹{payout.amount}</td>
              <td className="py-3 px-2">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  payout.status === "completed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                }`}>
                  {payout.status}
                </span>
              </td>
              <td className="py-3 px-2 text-slate-600 dark:text-slate-400">{payout.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
