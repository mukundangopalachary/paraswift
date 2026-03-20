"use client";

export default function RiderHome() {
  const riderData = {
    name: "Rajesh Kumar",
    tier: "Gold",
    earnings: "₹2,450",
    status: "active",
    premium: "₹149",
    coverage: "Mon Mar 27",
  };

  const riskForecast = [
    { day: "Tomorrow", condition: "85% Rain", time: "2-4 PM", icon: "🌧️" },
    { day: "Friday", condition: "High AQI (299)", time: "All Day", icon: "💨" },
    { day: "Next Week", condition: "Clear", time: "Good to work", icon: "☀️" },
  ];

  const activeTriggers = [
    { name: "Heavy Rain", threshold: "20mm+", zone: "Delhi" },
    { name: "Air Quality Alert", threshold: "AQI >300", zone: "Delhi" },
    { name: "Curfew Hours", threshold: "Alert issued", zone: "All zones" },
  ];

  const earningSummary = {
    year: "₹45,230",
    month: "₹8,450",
    baseline: "₹650/day",
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* Header with time and user info */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            ☀️ Mar 20, 2026 | 09:30 AM
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-slate-300 dark:bg-slate-600 flex items-center justify-center">
            👤
          </div>
        </div>
      </div>

      {/* User mini card */}
      <div className="mb-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-slate-900 dark:text-white">
              {riderData.name}
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Tier {riderData.tier}
            </p>
          </div>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            {riderData.earnings}
          </p>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          earnings this week
        </p>
      </div>

      {/* Coverage Status Badge */}
      <div
        className={`mb-4 p-4 rounded-lg text-white font-semibold flex items-center justify-between ${
          riderData.status === "active"
            ? "bg-green-600"
            : "bg-red-600"
        }`}
      >
        <span>🟢 COVERAGE ACTIVE</span>
        <span className="text-sm font-normal">Protected until {riderData.coverage}</span>
      </div>

      {/* Premium Card */}
      <div className="mb-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
          📊 WEEKLY PREMIUM
        </h3>
        <div className="mb-4">
          <p className="text-2xl font-bold text-slate-900 dark:text-white">
            {riderData.premium}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">due Monday</p>
        </div>
        <div className="flex gap-2">
          <button className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">
            Pay Now
          </button>
          <button className="flex-1 px-4 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition">
            Plan Details
          </button>
        </div>
      </div>

      {/* Risk Forecast */}
      <div className="mb-4 p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
          ⛈️ RISK FORECAST
        </h3>
        <div className="space-y-2">
          {riskForecast.map((forecast, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-2 rounded bg-slate-50 dark:bg-slate-700/30"
            >
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">
                  {forecast.day}: {forecast.condition}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {forecast.time}
                </p>
              </div>
              <span className="text-lg">{forecast.icon}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Active Triggers */}
      <div className="mb-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
        <h3 className="text-sm font-semibold text-amber-900 dark:text-amber-100 mb-2">
          🚨 ACTIVE TRIGGERS
        </h3>
        <ul className="space-y-1 text-sm text-amber-800 dark:text-amber-200">
          {activeTriggers.map((trigger, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span>•</span>
              <span>
                {trigger.name} ({trigger.threshold}) - {trigger.zone}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Earnings Summary */}
      <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <h3 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
          💰 EARNINGS SUMMARY
        </h3>
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
            <p className="text-xs text-slate-600 dark:text-slate-400">Year</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">
              {earningSummary.year}
            </p>
          </div>
          <div className="text-center p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
            <p className="text-xs text-slate-600 dark:text-slate-400">Month</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">
              {earningSummary.month}
            </p>
          </div>
          <div className="text-center p-3 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
            <p className="text-xs text-slate-600 dark:text-slate-400">Baseline</p>
            <p className="text-lg font-bold text-slate-900 dark:text-white">
              {earningSummary.baseline}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
