"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function RiderLogin() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  // Check if already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setChecking(false);
      if (user) {
        router.push("/rider/dashboard");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      if (result.user) {
        // Check if user has been onboarded on the backend
        const token = await result.user.getIdToken();
        try {
          const res = await fetch("http://127.0.0.1:8000/api/v1/users/me/dashboard", {
            headers: { Authorization: `Bearer ${token}` }
          });
          if (res.ok) {
            // Existing user — go to dashboard
            router.push("/rider/dashboard");
          } else {
            // 404 or error — new user, needs onboarding
            router.push("/rider/register");
          }
        } catch {
          // Backend unreachable — default to dashboard
          router.push("/rider/dashboard");
        }
      }
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes("popup-closed-by-user")) {
          setError("Sign-in was cancelled. Please try again.");
        } else if (err.message.includes("popup-blocked")) {
          setError("Popup was blocked. Please allow popups and try again.");
        } else {
          setError(err.message || "Failed to sign in. Please try again.");
        }
      } else {
        setError("Failed to sign in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-blue-600 mb-4">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Paraswift Rider
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Insurance that moves with you
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-6">
            Sign in to your account
          </h2>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            </div>
          )}

          {/* Google Sign-In Button */}
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                Signing in...
              </>
            ) : (
              <>
                <svg 
                  className="w-5 h-5" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6M9 12h6" />
                </svg>
                Sign in with Google
              </>
            )}
          </button>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                or
              </span>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-slate-600 dark:text-slate-400 mb-6">
            Don't have an account?{" "}
            <Link
              href="/rider/register"
              className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
            >
              Sign up here
            </Link>
          </p>

          {/* Information Box */}
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-xs text-blue-700 dark:text-blue-300">
              <span className="font-semibold">🔒 Secure:</span> We use Firebase authentication. Your account data is encrypted and secure.
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition"
            >
              ← Back to home
            </Link>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl mb-2">⚡</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Instant Access
            </p>
          </div>
          <div>
            <div className="text-2xl mb-2">🔒</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Secure Login
            </p>
          </div>
          <div>
            <div className="text-2xl mb-2">📱</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Mobile Ready
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
