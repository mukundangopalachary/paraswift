"use client";

import Link from 'next/link';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { apiBaseUrl } from '@/lib/apiClient';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export default function RegisterPage() {
  const router = useRouter();

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  // Form state
  const [persona, setPersona] = useState("Food");
  const [zone, setZone] = useState("Zone_A");
  const [aadhaar, setAadhaar] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Handle Google Sign In
  const handleGoogleSignIn = async () => {
    setAuthLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Authentication failed:", error);
      alert("Failed to authenticate with Google. Make sure it is enabled in your Firebase Console.");
    } finally {
      setAuthLoading(false);
    }
  };

  // Handle Onboarding Submit
  const handleCalculateBaseline = async (e: FormEvent) => {
    e.preventDefault();
    if (!aadhaar || aadhaar.length !== 12) {
      alert("Please enter a valid 12-digit Aadhaar number");
      return;
    }

    setSubmitting(true);
    try {
      const token = await auth.currentUser?.getIdToken();
      if (!token) {
        throw new Error("No authentication token found");
      }

      const res = await fetch(`${apiBaseUrl}/users/onboard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          persona_type: persona,
          primary_location_zone: zone,
          aadhaar_url: aadhaar // passing raw aadhaar string to mock field
        })
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.detail || "Failed to onboard user");
      }

      router.push("/rider/dashboard");

    } catch (error: any) {
      console.error("Onboarding failed:", error);
      alert(error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black flex items-center justify-center p-6 selection:bg-brand-200">
      <div className="glass-panel w-full max-w-lg p-8 md:p-10 relative dark:bg-zinc-900/50 dark:border-white/10">
        <Link href="/" className="absolute top-8 left-8 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        </Link>
        <div className="mb-8 text-center sm:text-left mt-8">
          <h1 className="text-3xl font-semibold text-slate-900 dark:text-white tracking-tight mb-2">Complete Profile</h1>
          <p className="text-slate-500 dark:text-zinc-400 font-medium leading-relaxed">
            {isAuthenticated 
              ? "Configure your gig persona to calculate your AI-powered earning baseline." 
              : "Sign in with Google to get started with your parametric insurance profile."}
          </p>
          {!isAuthenticated && (
            <p className="text-slate-500 dark:text-zinc-400 text-sm mt-3">
              Already have an account?{" "}
              <Link href="/rider/login" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                Sign in here
              </Link>
            </p>
          )}
        </div>

        {!isAuthenticated ? (
          <div className="flex justify-center mt-10">
            <button 
              onClick={handleGoogleSignIn}
              disabled={authLoading}
              className="px-6 py-4 w-full bg-white dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 rounded-xl text-slate-700 dark:text-white font-bold hover:bg-slate-50 dark:hover:bg-zinc-700 transition-all flex items-center justify-center gap-3 shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              {authLoading ? "Signing in..." : "Continue with Google"}
            </button>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleCalculateBaseline}>
            {/* Persona Selection */}
            <div className="space-y-3">
              <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300 tracking-wide uppercase">Delivery Persona</label>
              <div className="grid grid-cols-3 gap-3">
                <button 
                  type="button" 
                  onClick={() => setPersona("Food")}
                  className={`py-3 px-2 rounded-xl border-2 font-bold text-sm transition-all shadow-sm active:scale-95 ${persona === "Food" ? "border-brand-500 dark:border-brand-400 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300" : "border-transparent bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 hover:bg-slate-200 dark:hover:bg-zinc-700/80"}`}
                >
                  Food
                </button>
                <button 
                  type="button" 
                  onClick={() => setPersona("E-commerce")}
                  className={`py-3 px-2 rounded-xl border-2 font-bold text-sm transition-all shadow-sm active:scale-95 ${persona === "E-commerce" ? "border-brand-500 dark:border-brand-400 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300" : "border-transparent bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 hover:bg-slate-200 dark:hover:bg-zinc-700/80"}`}
                >
                  E-commerce
                </button>
                <button 
                  type="button" 
                  onClick={() => setPersona("Grocery")}
                  className={`py-3 px-2 rounded-xl border-2 font-bold text-sm transition-all shadow-sm active:scale-95 ${persona === "Grocery" ? "border-brand-500 dark:border-brand-400 bg-brand-50 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300" : "border-transparent bg-slate-100 dark:bg-zinc-800 text-slate-500 dark:text-zinc-400 hover:bg-slate-200 dark:hover:bg-zinc-700/80"}`}
                >
                  Grocery
                </button>
              </div>
            </div>

             {/* Location Zone */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300 tracking-wide uppercase">Primary Work Zone</label>
              <select 
                value={zone}
                onChange={(e) => setZone(e.target.value)}
                className="w-full bg-slate-100 dark:bg-zinc-800 border-none text-slate-700 dark:text-white font-medium text-sm rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-brand-500 outline-none transition-all shadow-inner"
              >
                <option value="Zone_A">Zone A (Downtown/Central)</option>
                <option value="Zone_B">Zone B (Outskirts/Suburbs)</option>
              </select>
            </div>

            {/* KYC */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-zinc-300 tracking-wide uppercase">Aadhaar (KYC reference)</label>
              <input 
                type="text"
                pattern="\d{12}"
                maxLength={12}
                value={aadhaar}
                onChange={(e) => setAadhaar(e.target.value.replace(/\D/g, ''))}
                placeholder="Enter your 12-digit Aadhaar number" 
                className="w-full bg-slate-100 dark:bg-zinc-800 border-none text-slate-700 dark:text-white font-medium text-sm rounded-xl px-4 py-3.5 focus:ring-2 focus:ring-brand-500 outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-zinc-500 shadow-inner"
              />
            </div>

            <button 
              type="submit"
              disabled={submitting}
              className="block text-center w-full py-4 mt-6 rounded-xl bg-brand-600 text-white font-bold text-base tracking-wide hover:bg-brand-700 active:scale-[0.98] transition-all shadow-lg hover:shadow-xl shadow-brand-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? "Calculating & Saving..." : "Calculate Earning Baseline"}
            </button>
          </form>
        )}
        
      </div>
    </div>
  );
}
