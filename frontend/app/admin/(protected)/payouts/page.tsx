"use client";

const payouts = [
  { id: 1, rider: "Raj Kumar", amount: 350, status: "completed", date: "2026-03-20" },
  { id: 2, rider: "Priya Singh", amount: 280, status: "completed", date: "2026-03-20" },
  { id: 3, rider: "Amit Patel", amount: 420, status: "pending", date: "2026-03-20" },
];

export default function PayoutsPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Payouts</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Payout history & payment gateway status</p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="text-sm text-slate-600 dark:text-slate-400">Approved Total</div>
          <div className="text-3xl font-bold text-green-600">₹18.5M</div>
          <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">2,840 payouts</div>
        </div>
        <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="text-sm text-slate-600 dark:text-slate-400">Rejected Total</div>
          <div className="text-3xl font-bold text-red-600">₹2.3M</div>
          <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">340 claims</div>
        </div>
        <div className="p-6 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="text-sm text-slate-600 dark:text-slate-400">Pending</div>
          <div className="text-3xl font-bold text-amber-600">₹890K</div>
          <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">45 payouts</div>
        </div>
      </div>

      {/* Payout Log */}
      <div className="overflow-x-auto bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-400">Rider</th>
              <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-400">Amount</th>
              <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-400">Status</th>
              <th className="p-4 text-left font-semibold text-slate-600 dark:text-slate-400">Date</th>
            </tr>
          </thead>
          <tbody>
            {payouts.map((payout) => (
              <tr key={payout.id} className="border-b border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700">
                <td className="p-4 font-semibold text-slate-900 dark:text-white">{payout.rider}</td>
                <td className="p-4 font-semibold text-slate-900 dark:text-white">₹{payout.amount}</td>
                <td className="p-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    payout.status === "completed" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                  }`}>
                    {payout.status}
                  </span>
                </td>
                <td className="p-4 text-slate-600 dark:text-slate-400">{payout.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
