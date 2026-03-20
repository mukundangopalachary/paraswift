import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-slate-50 dark:bg-black selection:bg-brand-200">
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-brand-100/60 dark:bg-brand-900/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[700px] h-[700px] bg-amber-50/70 dark:bg-amber-900/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-24 md:py-32">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 dark:bg-brand-900/30 border border-brand-100/50 dark:border-brand-800/50 text-brand-700 dark:text-brand-300 text-xs font-semibold tracking-wide mb-8 shadow-sm">
            About Paraswift
          </div>
          <h1 className="text-5xl md:text-6xl font-semibold text-slate-900 dark:text-white tracking-tight leading-tight mb-6">
            Instant Coverage for the <br/><span className="text-brand-600 dark:text-brand-400">Gig Economy.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed font-light">
            We are replacing slow, traditional insurance with automated parametric algorithms. Zero claims forms, absolute transparency, and instant payouts precisely when you need them.
          </p>
        </div>

        <div className="glass-panel p-8 md:p-12 space-y-12 dark:bg-zinc-900/50">
          <section className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-900/30 text-amber-500 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-100 dark:border-amber-800/50">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">1. AI-Driven Automation</h2>
              <p className="text-slate-600 dark:text-zinc-400 leading-relaxed">
                Paraswift continuously monitors live municipal and meteorological data streams across your designated work zones. When severe rain, heatwaves, or unexpected government curfews hit, the policy is triggered autonomously.
              </p>
            </div>
          </section>

          <section className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-16 h-16 rounded-2xl bg-brand-50 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 flex items-center justify-center shrink-0 border border-brand-100 dark:border-brand-800/50">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">2. Seamless Parametric Payouts</h2>
              <p className="text-slate-600 dark:text-zinc-400 leading-relaxed">
                Unlike traditional insurance which forces workers through grueling weeks of "loss adjustment", parametric policies operate purely on logic functions. If Event occurs &gt; Send Payment. Funds deposit directly to your configured dashboard instantly.
              </p>
            </div>
          </section>

          <section className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-900/30 text-emerald-500 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-100 dark:border-emerald-800/50">
               <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">3. Transparent & Affordable</h2>
              <p className="text-slate-600 dark:text-zinc-400 leading-relaxed">
                Premiums are calculated precisely dynamically using an AI oracle measuring historical probabilities. You only ever pay for exact quantified risk. No hidden overhead, zero middle-men.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-16 text-center">
          <Link href="/purchase" className="px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black font-bold hover:bg-slate-800 dark:hover:opacity-90 transition-all shadow-xl active:scale-95 text-lg inline-block">
            Start Your Coverage Today
          </Link>
        </div>

      </div>
    </main>
  );
}
