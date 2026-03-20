"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../../lib/firebase';
import ProtectedRoute from '../../components/ProtectedRoute';
import { CloudRain, Wind, AlertCircle, Sparkles, Check } from 'lucide-react';

export default function PurchasePage() {
  const router = useRouter();
  const [quote, setQuote] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  // Dynamic Simulator State
  const [simulatedRain, setSimulatedRain] = useState(10); // mm threshold
  const [simulatedWind, setSimulatedWind] = useState(40); // kmh threshold
  const [dynamicPremium, setDynamicPremium] = useState(0);

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const token = await auth.currentUser?.getIdToken();
        if (!token) return;
        
        const res = await fetch("http://127.0.0.1:8000/api/v1/policies/quote", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (res.ok) {
          const data = await res.json();
          setQuote(data);
          setDynamicPremium(data.premium_amount || 0);
        } else {
            console.error(await res.text());
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) fetchQuote();
    });
    return () => unsubscribe();
  }, []);

  // Update premium dynamically using straightforward triggers
  useEffect(() => {
     if (!quote) return;
     // Base premium + simulated threshold offsets
     const scale = (simulatedRain / 10) + (simulatedWind / 40);
     setDynamicPremium((quote.premium_amount * 0.7) + (quote.premium_amount * 0.3 * scale));
  }, [simulatedRain, simulatedWind, quote]);

  const handlePurchase = async () => {
    setPurchasing(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) return;

      const res = await fetch("http://127.0.0.1:8000/api/v1/policies/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          payment_token: "mock_success_token_123",
          premium_amount: dynamicPremium || quote?.premium_amount || 0
        })
      });

      if (res.ok) {
        router.push("/dashboard");
      } else {
        alert("Purchase failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setPurchasing(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="w-full flex-1 flex items-center justify-center p-6 pt-32 md:p-12 md:pt-36 selection:bg-brand-200 relative min-h-screen">
        <Link href="/dashboard" className="absolute top-24 md:top-32 left-6 md:left-12 p-3 rounded-full bg-white dark:bg-zinc-800 shadow-sm hover:shadow-md text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-all active:scale-95 border border-transparent dark:border-zinc-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        </Link>
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          
          {/* Quote & AI Adjuster Panel */}
          <div className="lg:col-span-3 flex flex-col justify-center space-y-8">
            <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-500 text-xs font-bold tracking-wide mb-6 shadow-sm">
                   <Sparkles size={14} /> AI Dynamic Pricing Engine
                </div>
                
                <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 dark:text-white tracking-tight leading-tight mb-4">
                  Adjust coverage to match <span className="text-brand-600 dark:text-brand-400">your risk.</span>
                </h1>
                
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                  Our model scales premiums based on the triggers you select. Safer thresholds mean cheaper policies.
                </p>
            </div>

            {/* Slider Adjusters */}
            <div className="space-y-6">
                <div className="glass-panel p-5 space-y-3">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-slate-800 dark:text-white font-bold text-sm">
                            <CloudRain size={18} className="text-blue-500" /> Rainfall Payout Trigger
                        </div>
                        <span className="text-xs font-bold bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-md">&gt; {simulatedRain} mm/hr</span>
                    </div>
                    <input 
                       type="range" min="5" max="30" step="1" 
                       value={simulatedRain} 
                       onChange={(e) => setSimulatedRain(Number(e.target.value))}
                       className="w-full h-1.5 bg-slate-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    />
                    <p className="text-xs text-slate-400 dark:text-zinc-500">How much rain does it take to activate your safety net?</p>
                </div>

                <div className="glass-panel p-5 space-y-3">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-slate-800 dark:text-white font-bold text-sm">
                            <Wind size={18} className="text-teal-500" /> Wind Speed Payout Trigger
                        </div>
                        <span className="text-xs font-bold bg-teal-100 dark:bg-teal-900/40 text-teal-600 dark:text-teal-400 px-2 py-1 rounded-md">&gt; {simulatedWind} km/h</span>
                    </div>
                    <input 
                       type="range" min="20" max="80" step="5" 
                       value={simulatedWind} 
                       onChange={(e) => setSimulatedWind(Number(e.target.value))}
                       className="w-full h-1.5 bg-slate-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-teal-500"
                    />
                    <p className="text-xs text-slate-400 dark:text-zinc-500">Protect earnings during dangerous wind/storm advisory environments.</p>
                </div>
            </div>

            <div className="space-y-2 relative">
               <div className="absolute left-0 top-0 bottom-0 w-px bg-slate-200 dark:bg-zinc-800"></div>
               
               <div className="flex justify-between items-center py-4 pl-6 relative">
                 <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-brand-400"></div>
                 <span className="text-slate-500 dark:text-slate-400 font-semibold tracking-wide text-sm uppercase flex items-center gap-1.5"><Check size={14} /> Total Coverage Limit</span>
                 <span className="text-slate-900 dark:text-white font-bold text-lg tracking-tight">₹{loading ? "..." : (quote?.coverage_limit || 0).toFixed(2)}</span>
               </div>
            </div>
          </div>

          {/* Checkout Card */}
          <div className="lg:col-span-2 glass-panel p-8 md:p-10 flex flex-col justify-center relative overflow-hidden h-fit">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
              
             <p className="text-sm font-bold text-slate-400 dark:text-slate-500 tracking-widest uppercase mb-2">Weekly Premium</p>
             <h2 className="text-6xl font-semibold text-slate-900 dark:text-white tracking-tighter mb-8 flex items-baseline animate-in fade-in">
               ₹{loading ? "..." : dynamicPremium.toFixed(2).split('.')[0]}
               <span className="text-3xl text-slate-400 dark:text-slate-500 font-medium">.{loading ? "00" : dynamicPremium.toFixed(2).split('.')[1]}</span>
             </h2>
             
             <div className="space-y-4 mb-8">
                <div className="flex items-center gap-4 text-sm text-slate-700 dark:text-slate-300 font-semibold bg-white dark:bg-zinc-800/50 p-4 rounded-xl shadow-sm border border-slate-100/50 dark:border-white/5">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-500 shrink-0"></div> Instant zero-touch payouts
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-700 dark:text-slate-300 font-semibold bg-white dark:bg-zinc-800/50 p-4 rounded-xl shadow-sm border border-slate-100/50 dark:border-white/5">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-500 shrink-0"></div> No Claims Adjuster forms required
                </div>
             </div>

             <button 
                onClick={handlePurchase}
                disabled={loading || purchasing}
                className="block text-center w-full py-5 rounded-2xl bg-brand-600 text-white font-bold text-lg tracking-wide hover:bg-brand-500 active:scale-[0.98] transition-all shadow-xl hover:shadow-2xl shadow-brand-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
             >
              {purchasing ? "Processing..." : "Confirm & Pay"}
            </button>
            
            <p className="text-center text-xs text-emerald-500 mt-5 font-bold flex items-center justify-center gap-1.5 uppercase tracking-wide">
               <AlertCircle size={14} />
               Price adjusts based on sliders above
            </p>
          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}
